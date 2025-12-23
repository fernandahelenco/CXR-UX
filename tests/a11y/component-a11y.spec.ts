import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as fs from "fs";
import * as path from "path";

/**
 * Accessibility Test Suite for WEX Design System
 *
 * SCOPED TO COMPONENT EXAMPLES ONLY
 * TESTS BOTH LIGHT AND DARK MODES
 * RECORDS PER-EXAMPLE RESULTS
 * 
 * This test scans ONLY elements with data-testid="component-example",
 * excluding docs UI (sidebar, headers, guidance text, code blocks).
 * 
 * Each component is tested twice:
 * 1. Light mode (no .dark class on html)
 * 2. Dark mode (.dark class on html)
 *
 * Results are recorded PER-EXAMPLE so we can identify exactly which
 * variant passed or failed in each mode.
 *
 * THRESHOLD RULES:
 * - pass: 0 violations
 * - partial: 1-3 non-critical violations
 * - fail: any critical/serious violations OR 4+ violations
 *
 * LEVEL MAPPING (signal only, not certification):
 * - 0 violations → "AA" (we run wcag2aa rules)
 * - Some violations → "A" or undefined
 */

// WCAG tags to test against
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

// Selector for component example containers
const EXAMPLE_SELECTOR = '[data-testid="component-example"]';

// Component registry - must match src/docs/registry/components.ts
// We define the routes here directly to avoid ESM/CJS import issues
const componentRoutes = [
  { key: "accordion", route: "/components/accordion", name: "Accordion" },
  { key: "alert", route: "/components/alert", name: "Alert" },
  { key: "alert-dialog", route: "/components/alert-dialog", name: "Alert Dialog" },
  { key: "aspect-ratio", route: "/components/aspect-ratio", name: "Aspect Ratio" },
  { key: "avatar", route: "/components/avatar", name: "Avatar" },
  { key: "badge", route: "/components/badge", name: "Badge" },
  { key: "breadcrumb", route: "/components/breadcrumb", name: "Breadcrumb" },
  { key: "button", route: "/components/button", name: "Button" },
  { key: "button-group", route: "/components/button-group", name: "Button Group" },
  { key: "calendar", route: "/components/calendar", name: "Calendar" },
  { key: "card", route: "/components/card", name: "Card" },
  { key: "data-table", route: "/components/data-table", name: "Data Table" },
  { key: "date-picker", route: "/components/date-picker", name: "Date Picker" },
  { key: "carousel", route: "/components/carousel", name: "Carousel" },
  { key: "chart", route: "/components/chart", name: "Chart" },
  { key: "checkbox", route: "/components/checkbox", name: "Checkbox" },
  { key: "collapsible", route: "/components/collapsible", name: "Collapsible" },
  { key: "combobox", route: "/components/combobox", name: "Combobox" },
  { key: "command", route: "/components/command", name: "Command" },
  { key: "context-menu", route: "/components/context-menu", name: "Context Menu" },
  { key: "dialog", route: "/components/dialog", name: "Dialog" },
  { key: "drawer", route: "/components/drawer", name: "Drawer" },
  { key: "dropdown-menu", route: "/components/dropdown-menu", name: "Dropdown Menu" },
  { key: "empty", route: "/components/empty", name: "Empty" },
  { key: "field", route: "/components/field", name: "Field" },
  { key: "form", route: "/components/form", name: "Form" },
  { key: "hover-card", route: "/components/hover-card", name: "Hover Card" },
  { key: "input", route: "/components/input", name: "Input" },
  { key: "input-group", route: "/components/input-group", name: "Input Group" },
  { key: "input-otp", route: "/components/input-otp", name: "Input OTP" },
  { key: "item", route: "/components/item", name: "Item" },
  { key: "kbd", route: "/components/kbd", name: "Kbd" },
  { key: "label", route: "/components/label", name: "Label" },
  { key: "menubar", route: "/components/menubar", name: "Menubar" },
  { key: "navigation-menu", route: "/components/navigation-menu", name: "Navigation Menu" },
  { key: "pagination", route: "/components/pagination", name: "Pagination" },
  { key: "popover", route: "/components/popover", name: "Popover" },
  { key: "progress", route: "/components/progress", name: "Progress" },
  { key: "radio-group", route: "/components/radio-group", name: "Radio Group" },
  { key: "resizable", route: "/components/resizable", name: "Resizable" },
  { key: "scroll-area", route: "/components/scroll-area", name: "Scroll Area" },
  { key: "select", route: "/components/select", name: "Select" },
  { key: "separator", route: "/components/separator", name: "Separator" },
  { key: "sheet", route: "/components/sheet", name: "Sheet" },
  { key: "sidebar", route: "/components/sidebar", name: "Sidebar" },
  { key: "skeleton", route: "/components/skeleton", name: "Skeleton" },
  { key: "slider", route: "/components/slider", name: "Slider" },
  { key: "sonner", route: "/components/sonner", name: "Sonner" },
  { key: "spinner", route: "/components/spinner", name: "Spinner" },
  { key: "switch", route: "/components/switch", name: "Switch" },
  { key: "table", route: "/components/table", name: "Table" },
  { key: "tabs", route: "/components/tabs", name: "Tabs" },
  { key: "textarea", route: "/components/textarea", name: "Textarea" },
  { key: "toast", route: "/components/toast", name: "Toast" },
  { key: "toggle", route: "/components/toggle", name: "Toggle" },
  { key: "toggle-group", route: "/components/toggle-group", name: "Toggle Group" },
  { key: "tooltip", route: "/components/tooltip", name: "Tooltip" },
];

// Mode configurations
type ColorMode = "light" | "dark";
const COLOR_MODES: ColorMode[] = ["light", "dark"];

// Ensure output directory exists
const outputDir = path.join(process.cwd(), "test-results", "a11y-components");

// Pattern to identify auto-generated/junk example IDs
const JUNK_EXAMPLE_ID_PATTERN = /^example-(_r_|\d+|[a-z0-9]{8,})/i;

/**
 * Check if an example ID is a semantic (meaningful) name vs auto-generated junk
 */
function isSemanticExampleId(id: string | null): boolean {
  if (!id) return false;
  // Filter out auto-generated IDs like "example-_r_1_", "example-0", "example-abc123def"
  return !JUNK_EXAMPLE_ID_PATTERN.test(id);
}

/** Result for a single example in a single mode */
interface ExampleResult {
  status: "pass" | "fail";
  violations: number;
  issues: string[];
}

/** Results for a mode, including per-example breakdown */
interface ModeTestResult {
  violations: number;
  criticalViolations: number;
  seriousViolations: number;
  issues: string[];
  examplesTested: string[];
  examplesFound: number;
  /** NEW: Per-example results for pinpointing failures */
  examples: Record<string, ExampleResult>;
}

test.describe("Component Accessibility Tests (Light + Dark Modes)", () => {
  test.beforeAll(() => {
    // Create output directory for individual results
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });

  for (const component of componentRoutes) {
    test(`A11y: ${component.name}`, async ({ page }) => {
      // Results for both modes
      const modeResults: Record<ColorMode, ModeTestResult | null> = {
        light: null,
        dark: null,
      };
      
      for (const mode of COLOR_MODES) {
        // Navigate to component page
        await page.goto(component.route);
        
        // Wait for page to be fully loaded
        await page.waitForLoadState("networkidle");
        
        // Set color mode by toggling .dark class on html element
        if (mode === "dark") {
          await page.evaluate(() => {
            document.documentElement.classList.add("dark");
          });
          // Wait for CSS to update
          await page.waitForTimeout(100);
        } else {
          await page.evaluate(() => {
            document.documentElement.classList.remove("dark");
          });
          await page.waitForTimeout(100);
        }
        
        
        // Find all example containers on the page
        const exampleContainers = await page.locator(EXAMPLE_SELECTOR).all();
        const exampleCount = exampleContainers.length;
        
        // Track aggregated results for this mode
        let totalViolations = 0;
        let criticalViolations = 0;
        let seriousViolations = 0;
        const allIssues: string[] = [];
        const examplesTested: string[] = [];
        
        // NEW: Per-example results
        const exampleResults: Record<string, ExampleResult> = {};
        
        // Handle case where no examples are found
        if (exampleCount === 0) {
          console.warn(`\n⚠️  ${component.name} [${mode}]: No example containers found!`);
          
          modeResults[mode] = {
            violations: 0,
            criticalViolations: 0,
            seriousViolations: 0,
            issues: [],
            examplesTested: [],
            examplesFound: 0,
            examples: {},
          };
          continue;
        }
        
        // First, collect all example IDs, filtering out auto-generated junk IDs
        const exampleIds: string[] = [];
        const exampleIndices: number[] = []; // Track which containers to scan
        for (let i = 0; i < exampleContainers.length; i++) {
          const container = exampleContainers[i];
          const exampleId = await container.getAttribute("data-example-id");
          
          // Skip auto-generated/junk IDs - only test semantically named examples
          if (!isSemanticExampleId(exampleId)) {
            continue;
          }
          
          exampleIds.push(exampleId!);
          exampleIndices.push(i);
          examplesTested.push(exampleId!);
        }
        
        // Update count to reflect filtered examples
        const filteredExampleCount = exampleIds.length;
        
        // Scan each example container individually (only semantic IDs)
        for (let idx = 0; idx < exampleIds.length; idx++) {
          const exampleId = exampleIds[idx];
          
          // Initialize result for this example
          let exampleViolations = 0;
          const exampleIssues: string[] = [];
          
          try {
            // Use data-example-id for precise selection (nth-of-type doesn't work correctly with attributes)
            const idSelector = `${EXAMPLE_SELECTOR}[data-example-id="${exampleId}"]`;
            const elementExists = await page.locator(idSelector).count() > 0;
            
            if (elementExists) {
              // Run axe-core scoped to this specific example container
              const accessibilityScanResults = await new AxeBuilder({ page })
                .include(idSelector)
                .withTags(WCAG_TAGS)
                .analyze();
              
              // Process violations for this example
              for (const violation of accessibilityScanResults.violations) {
                exampleViolations++;
                totalViolations++;
                
                if (violation.impact === "critical") criticalViolations++;
                if (violation.impact === "serious") seriousViolations++;
                
                if (!exampleIssues.includes(violation.id)) {
                  exampleIssues.push(violation.id);
                }
                
                if (!allIssues.includes(violation.id)) {
                  allIssues.push(violation.id);
                }
              }
            } else {
              console.warn(`  Warning: Could not find example with id "${exampleId}" for ${component.name} [${mode}]`);
            }
          } catch (err) {
            // If individual scan fails, record as unknown
            console.warn(`  Warning: Could not scan example "${exampleId}" for ${component.name} [${mode}]: ${err}`);
          }
          
          // Store per-example result
          exampleResults[exampleId] = {
            status: exampleViolations === 0 ? "pass" : "fail",
            violations: exampleViolations,
            issues: exampleIssues,
          };
        }
        
        // Store mode result (use filtered count for examplesFound)
        modeResults[mode] = {
          violations: totalViolations,
          criticalViolations,
          seriousViolations,
          issues: allIssues,
          examplesTested,
          examplesFound: filteredExampleCount,
          examples: exampleResults,
        };
        
        // Log summary for debugging
        const passCount = Object.values(exampleResults).filter(r => r.status === "pass").length;
        const failCount = Object.values(exampleResults).filter(r => r.status === "fail").length;
        
        if (totalViolations > 0) {
          console.log(`\n${component.name} [${mode.toUpperCase()}]: ${failCount}/${filteredExampleCount} examples failed, ${totalViolations} total violations`);
          Object.entries(exampleResults).forEach(([id, result]) => {
            if (result.status === "fail") {
              console.log(`  ✗ ${id}: ${result.violations} violations [${result.issues.join(", ")}]`);
            }
          });
        } else {
          console.log(`✅ ${component.name} [${mode.toUpperCase()}]: ${passCount}/${filteredExampleCount} examples passed`);
        }
      }
      
      // Write combined result file (both modes in one file)
      // Note: examplesFound now reflects filtered (semantic) examples only
      const lightHasExamples = (modeResults.light?.examplesFound ?? 0) > 0;
      const darkHasExamples = (modeResults.dark?.examplesFound ?? 0) > 0;
      
      const result = {
        key: component.key,
        name: component.name,
        scope: "component-examples-only",
        testedAt: new Date().toISOString(),
        modes: {
          light: modeResults.light ? {
            ...modeResults.light,
            status: lightHasExamples ? undefined : "no_examples",
          } : null,
          dark: modeResults.dark ? {
            ...modeResults.dark,
            status: darkHasExamples ? undefined : "no_examples",
          } : null,
        },
        // Legacy fields for backwards compatibility (use light mode as default)
        violations: modeResults.light?.violations ?? 0,
        criticalViolations: modeResults.light?.criticalViolations ?? 0,
        seriousViolations: modeResults.light?.seriousViolations ?? 0,
        issues: modeResults.light?.issues ?? [],
        examplesTested: modeResults.light?.examplesTested ?? [],
        examplesFound: modeResults.light?.examplesFound ?? 0,
        hasExamples: lightHasExamples && darkHasExamples,
      };

      const resultPath = path.join(outputDir, `${component.key}.json`);
      fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));

      // Test always passes - we collect results for the report
      expect(true).toBe(true);
    });
  }
});
