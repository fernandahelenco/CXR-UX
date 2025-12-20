/**
 * Generate Unit Test Report
 * 
 * Processes the raw Vitest JSON output into a dashboard-friendly format.
 * This script runs after vitest outputs its JSON report.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

const inputPath = join(rootDir, "src/docs/registry/unit-tests.json");
const outputPath = join(rootDir, "src/docs/registry/unit-test-summary.json");

try {
  const rawData = JSON.parse(readFileSync(inputPath, "utf-8"));
  
  // Process test results into summary format
  const summary = {
    _meta: {
      generatedAt: new Date().toISOString(),
      testRunner: "vitest",
      totalDuration: rawData.testResults?.reduce((acc, r) => acc + (r.endTime - r.startTime), 0) || 0,
    },
    totals: {
      suites: rawData.numTotalTestSuites || 0,
      tests: rawData.numTotalTests || 0,
      passed: rawData.numPassedTests || 0,
      failed: rawData.numFailedTests || 0,
      pending: rawData.numPendingTests || 0,
      passRate: rawData.numTotalTests 
        ? Math.round((rawData.numPassedTests / rawData.numTotalTests) * 100) 
        : 0,
    },
    categories: {
      components: { passed: 0, failed: 0, total: 0, files: [] },
      utils: { passed: 0, failed: 0, total: 0, files: [] },
      hooks: { passed: 0, failed: 0, total: 0, files: [] },
    },
    failures: [],
  };

  // Process each test file
  for (const result of rawData.testResults || []) {
    const fileName = result.name.split("/").pop();
    const filePath = result.name.replace(rootDir + "/", "");
    
    // Determine category
    let category = "components";
    if (filePath.includes("/utils/")) {
      category = "utils";
    } else if (filePath.includes("/hooks/")) {
      category = "hooks";
    }
    
    const passed = result.assertionResults?.filter(a => a.status === "passed").length || 0;
    const failed = result.assertionResults?.filter(a => a.status === "failed").length || 0;
    
    summary.categories[category].passed += passed;
    summary.categories[category].failed += failed;
    summary.categories[category].total += passed + failed;
    summary.categories[category].files.push({
      name: fileName,
      path: filePath,
      status: result.status,
      passed,
      failed,
      duration: result.endTime - result.startTime,
    });
    
    // Collect failures
    if (result.status === "failed") {
      for (const assertion of result.assertionResults || []) {
        if (assertion.status === "failed") {
          summary.failures.push({
            file: fileName,
            test: assertion.fullName,
            message: assertion.failureMessages?.[0]?.slice(0, 200) || "Unknown error",
          });
        }
      }
    }
  }

  writeFileSync(outputPath, JSON.stringify(summary, null, 2));
  console.log(`✓ Unit test summary written to ${outputPath}`);
  console.log(`  Total: ${summary.totals.tests} tests, ${summary.totals.passed} passed, ${summary.totals.failed} failed (${summary.totals.passRate}%)`);

} catch (error) {
  console.error("Failed to generate unit test report:", error.message);
  process.exit(1);
}

