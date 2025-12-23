#!/usr/bin/env node

/**
 * A11y Report Generator
 *
 * Reads individual axe-core test results and generates the compliance.json
 * file used by the A11ySignalBadge component.
 *
 * SCOPING: Tests are scoped to component examples only (data-testid="component-example").
 * Docs UI (sidebar, headers, guidance text) is NOT included in the scan.
 *
 * MODE SUPPORT: Tests run in both light and dark modes. Results are stored
 * separately for each mode in the compliance.json.
 * 
 * PER-EXAMPLE RESULTS: Each example/variant is tested individually. Results
 * include which specific examples passed/failed in each mode.
 *
 * THRESHOLD RULES (documented here for consistency):
 * - pass: 0 violations
 * - partial: 1-3 non-critical violations (no critical/serious)
 * - fail: any critical/serious violations OR 4+ total violations
 * - no_examples: page had no example containers (configuration error)
 *
 * LEVEL MAPPING (signal only, not certification):
 * - pass → "AA" (we tested with wcag2aa rules)
 * - partial → "A"
 * - fail → undefined
 * - no_examples → undefined
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const resultsDir = path.join(__dirname, "..", "test-results", "a11y-components");
const outputPath = path.join(__dirname, "..", "src", "docs", "registry", "compliance.json");

/**
 * Pattern to identify auto-generated/junk example IDs
 * Matches: example-_r_1_, example-0, example-abc123def456
 */
const JUNK_EXAMPLE_ID_PATTERN = /^example-(_r_|\d+|[a-z0-9]{8,})/i;

/**
 * Filter out junk example IDs from results
 */
function filterJunkExamples(examples) {
  if (!examples || typeof examples !== "object") {
    return {};
  }
  
  const filtered = {};
  for (const [id, result] of Object.entries(examples)) {
    // Only keep semantic (meaningful) example IDs
    if (!JUNK_EXAMPLE_ID_PATTERN.test(id)) {
      filtered[id] = result;
    }
  }
  return filtered;
}

/**
 * Filter junk IDs from an array of example IDs
 */
function filterJunkExampleIds(ids) {
  if (!Array.isArray(ids)) return [];
  return ids.filter(id => !JUNK_EXAMPLE_ID_PATTERN.test(id));
}

/**
 * Determine status based on violation counts
 */
function determineStatus(modeResult) {
  if (!modeResult) return "pending";
  
  // Check for no_examples status from test runner
  if (modeResult.status === "no_examples" || modeResult.examplesFound === 0) {
    return "no_examples";
  }
  
  const { violations, criticalViolations, seriousViolations } = modeResult;
  
  // Fail: any critical/serious violations OR 4+ total
  if (criticalViolations > 0 || seriousViolations > 0 || violations >= 4) {
    return "fail";
  }
  // Pass: 0 violations
  if (violations === 0) {
    return "pass";
  }
  // Partial: 1-3 non-critical violations
  return "partial";
}

/**
 * Determine level achieved (signal only)
 */
function determineLevelAchieved(status) {
  switch (status) {
    case "pass":
      return "AA";
    case "partial":
      return "A";
    case "fail":
    case "no_examples":
    default:
      return undefined;
  }
}

/**
 * Get combined status from both modes
 * 
 * Logic:
 * - Both pass → pass
 * - Both fail → fail
 * - One passes, one fails → partial (mixed results)
 * - Either has no_examples → takes the other's status (or no_examples if both)
 * - Either pending → takes the other's status
 */
function getCombinedStatus(lightStatus, darkStatus) {
  // Handle no_examples and pending edge cases
  if (lightStatus === "no_examples" && darkStatus === "no_examples") return "no_examples";
  if (lightStatus === "pending" && darkStatus === "pending") return "pending";
  if (lightStatus === "no_examples" || lightStatus === "pending") return darkStatus;
  if (darkStatus === "no_examples" || darkStatus === "pending") return lightStatus;
  
  // Both have valid test results
  if (lightStatus === "pass" && darkStatus === "pass") return "pass";
  if (lightStatus === "fail" && darkStatus === "fail") return "fail";
  
  // Mixed results: one passes/partial, one fails → partial
  // Or: one pass, one partial → partial
  return "partial";
}

/**
 * Count passing/failing examples from per-example results
 */
function countExampleResults(examples) {
  if (!examples || typeof examples !== "object") {
    return { passed: 0, failed: 0, total: 0 };
  }
  
  const entries = Object.values(examples);
  const passed = entries.filter(e => e.status === "pass").length;
  const failed = entries.filter(e => e.status === "fail").length;
  
  return { passed, failed, total: entries.length };
}

function main() {
  console.log("Generating A11y compliance report...\n");
  console.log("Scope: component-examples-only (docs UI excluded)");
  console.log("Modes: light + dark");
  console.log("Granularity: per-example results\n");

  // Check if results directory exists
  if (!fs.existsSync(resultsDir)) {
    console.error(`Error: Results directory not found at ${resultsDir}`);
    console.error("Run 'npx playwright test' first to generate test results.");
    process.exit(1);
  }

  // Read all individual result files
  const resultFiles = fs.readdirSync(resultsDir).filter(f => f.endsWith('.json'));
  console.log(`Found ${resultFiles.length} component results...\n`);

  if (resultFiles.length === 0) {
    console.error("No result files found. Run tests first.");
    process.exit(1);
  }

  // Build compliance report
  const compliance = {
    _meta: {
      description: "A11y test results - generated by npm run test:a11y",
      scope: "component-examples-only",
      scopeDescription: "Scanned only [data-testid='component-example'] containers, excluding docs UI",
      rulesetCoverage: "automated (wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa)",
      modes: ["light", "dark"],
      granularity: "per-example",
      lastUpdated: new Date().toISOString(),
      totalComponents: resultFiles.length,
    }
  };

  let passCount = 0;
  let partialCount = 0;
  let failCount = 0;
  let noExamplesCount = 0;

  for (const file of resultFiles) {
    const filePath = path.join(resultsDir, file);
    const result = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Check if result has mode-specific data (new format)
    const hasModesData = result.modes && (result.modes.light || result.modes.dark);
    
    let lightResult, darkResult;
    let lightStatus, darkStatus;
    
    if (hasModesData) {
      // New format with modes
      lightResult = result.modes.light;
      darkResult = result.modes.dark;
      lightStatus = determineStatus(lightResult);
      darkStatus = determineStatus(darkResult);
    } else {
      // Legacy format - treat as light mode only
      lightResult = {
        violations: result.violations || 0,
        criticalViolations: result.criticalViolations || 0,
        seriousViolations: result.seriousViolations || 0,
        issues: result.issues || [],
        examplesTested: result.examplesTested || [],
        examplesFound: result.examplesFound || 0,
        examples: {},
        status: result.status,
      };
      darkResult = null;
      lightStatus = determineStatus(lightResult);
      darkStatus = "pending";
    }
    
    const combinedStatus = getCombinedStatus(lightStatus, darkStatus);
    const lightLevel = determineLevelAchieved(lightStatus);
    const darkLevel = determineLevelAchieved(darkStatus);
    const combinedLevel = determineLevelAchieved(combinedStatus);
    
    // Filter out junk example IDs from results (defensive - test should already filter)
    const filteredLightExamples = filterJunkExamples(lightResult?.examples);
    const filteredDarkExamples = filterJunkExamples(darkResult?.examples);
    const filteredScenarios = filterJunkExampleIds(
      lightResult?.examplesTested || darkResult?.examplesTested || []
    );
    
    // Count per-example results (using filtered examples)
    const lightExampleCounts = countExampleResults(filteredLightExamples);
    const darkExampleCounts = countExampleResults(filteredDarkExamples);

    compliance[result.key] = {
      // Combined/summary fields (for backwards compatibility)
      status: combinedStatus,
      levelAchieved: combinedLevel,
      violations: (lightResult?.violations || 0) + (darkResult?.violations || 0),
      issues: [...new Set([...(lightResult?.issues || []), ...(darkResult?.issues || [])])],
      testedAt: result.testedAt,
      scope: result.scope || "component-examples-only",
      examplesFound: filteredScenarios.length,
      scenariosTested: filteredScenarios,
      subject: `Component examples for ${result.name}`,
      
      // Mode-specific results with per-example breakdown (filtered)
      modes: {
        light: lightResult ? {
          status: lightStatus,
          levelAchieved: lightLevel,
          violations: lightResult.violations,
          issues: lightResult.issues || [],
          examplesFound: lightExampleCounts.total,
          examplesPassed: lightExampleCounts.passed,
          examplesFailed: lightExampleCounts.failed,
          // Per-example results (filtered, no junk IDs)
          examples: filteredLightExamples,
        } : null,
        dark: darkResult ? {
          status: darkStatus,
          levelAchieved: darkLevel,
          violations: darkResult.violations,
          issues: darkResult.issues || [],
          examplesFound: darkExampleCounts.total,
          examplesPassed: darkExampleCounts.passed,
          examplesFailed: darkExampleCounts.failed,
          // Per-example results (filtered, no junk IDs)
          examples: filteredDarkExamples,
        } : null,
      },
    };

    // Count and log status
    if (combinedStatus === "pass") passCount++;
    else if (combinedStatus === "partial") partialCount++;
    else if (combinedStatus === "no_examples") noExamplesCount++;
    else failCount++;

    // Determine icons and log with per-example counts
    const lightIcon = lightStatus === "pass" ? "✅" : lightStatus === "partial" ? "⚠️" : lightStatus === "no_examples" ? "🚫" : lightStatus === "fail" ? "❌" : "⏳";
    const darkIcon = darkStatus === "pass" ? "✅" : darkStatus === "partial" ? "⚠️" : darkStatus === "no_examples" ? "🚫" : darkStatus === "fail" ? "❌" : "⏳";
    
    console.log(`${result.name}:`);
    console.log(`  Light ${lightIcon}: ${lightStatus} - ${lightExampleCounts.passed}/${lightExampleCounts.total} passed`);
    console.log(`  Dark  ${darkIcon}: ${darkStatus} - ${darkExampleCounts.passed}/${darkExampleCounts.total} passed`);
  }

  // Write compliance.json
  fs.writeFileSync(outputPath, JSON.stringify(compliance, null, 2));
  console.log(`\n✅ Compliance report written to: ${outputPath}`);

  // Summary
  console.log("\n--- Summary (Combined Status) ---");
  console.log(`Pass: ${passCount}`);
  console.log(`Partial: ${partialCount}`);
  console.log(`Fail: ${failCount}`);
  if (noExamplesCount > 0) {
    console.log(`No Examples: ${noExamplesCount} ⚠️`);
  }
  console.log(`Total: ${resultFiles.length}`);
  console.log("\nScope: component-examples-only (docs UI excluded)");
  console.log("Modes: light + dark");
  console.log("Granularity: per-example");
}

main();
