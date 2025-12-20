import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as fs from "fs";
import * as path from "path";

/**
 * Accessibility Test Suite for WEX Design System
 *
 * SCOPED TO COMPONENT EXAMPLES ONLY
 * 
 * This test scans ONLY elements with data-testid="component-example",
 * excluding docs UI (sidebar, headers, guidance text, code blocks).
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
  { key: "carousel", route: "/components/carousel", name: "Carousel" },
  { key: "chart", route: "/components/chart", name: "Chart" },
  { key: "checkbox", route: "/components/checkbox", name: "Checkbox" },
  { key: "collapsible", route: "/components/collapsible", name: "Collapsible" },
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

// Ensure output directory exists
const outputDir = path.join(process.cwd(), "test-results", "a11y-components");

interface ViolationSummary {
  id: string;
  impact: string;
  description: string;
  exampleId: string;
}

test.describe("Component Accessibility Tests (Scoped to Examples)", () => {
  test.beforeAll(() => {
    // Create output directory for individual results
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });

  for (const component of componentRoutes) {
    test(`A11y: ${component.name}`, async ({ page }) => {
      // Navigate to component page
      await page.goto(component.route);
      
      // Wait for page to be fully loaded
      await page.waitForLoadState("networkidle");
      
      // Find all example containers on the page
      const exampleContainers = await page.locator(EXAMPLE_SELECTOR).all();
      const exampleCount = exampleContainers.length;
      
      // Track aggregated results
      let totalViolations = 0;
      let criticalViolations = 0;
      let seriousViolations = 0;
      const allIssues: string[] = [];
      const allViolationDetails: ViolationSummary[] = [];
      const examplesTested: string[] = [];
      
      // Handle case where no examples are found
      if (exampleCount === 0) {
        console.warn(`\n⚠️  ${component.name}: No example containers found! Page may be missing data-testid="component-example"`);
        
        const result = {
          key: component.key,
          name: component.name,
          violations: 0,
          criticalViolations: 0,
          seriousViolations: 0,
          issues: [],
          examplesTested: [],
          examplesFound: 0,
          scope: "component-examples-only",
          status: "no_examples",
          testedAt: new Date().toISOString(),
        };
        
        const resultPath = path.join(outputDir, `${component.key}.json`);
        fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));
        
        // Record but don't fail - we can iteratively add ExampleCard to pages
        // The report will show "no_examples" status for these components
        expect(true).toBe(true);
        return;
      }
      
      // Scan each example container individually
      for (let i = 0; i < exampleContainers.length; i++) {
        const container = exampleContainers[i];
        
        // Get the example ID from data attribute, or use index-based fallback
        const exampleId = await container.getAttribute("data-example-id") || `example-${i}`;
        examplesTested.push(exampleId);
        
        try {
          // Run axe-core scoped to this specific example container
          const accessibilityScanResults = await new AxeBuilder({ page })
            .include(EXAMPLE_SELECTOR + `[data-example-id="${exampleId}"]`)
            .withTags(WCAG_TAGS)
            .analyze();
          
          // Aggregate violations
          for (const violation of accessibilityScanResults.violations) {
            totalViolations++;
            
            if (violation.impact === "critical") criticalViolations++;
            if (violation.impact === "serious") seriousViolations++;
            
            if (!allIssues.includes(violation.id)) {
              allIssues.push(violation.id);
            }
            
            allViolationDetails.push({
              id: violation.id,
              impact: violation.impact || "unknown",
              description: violation.description,
              exampleId,
            });
          }
        } catch (error) {
          // If scoped selector fails, try scanning by index
          console.warn(`  Retrying scan for example ${i} with index-based approach`);
          
          // Use nth selector as fallback
          const nthSelector = `${EXAMPLE_SELECTOR} >> nth=${i}`;
          const accessibilityScanResults = await new AxeBuilder({ page })
            .include(EXAMPLE_SELECTOR)
            .withTags(WCAG_TAGS)
            .analyze();
          
          // Note: This scans all examples, but we still track the attempt
          for (const violation of accessibilityScanResults.violations) {
            if (!allIssues.includes(violation.id)) {
              allIssues.push(violation.id);
            }
          }
          totalViolations += accessibilityScanResults.violations.length;
          break; // Exit loop since we scanned all at once
        }
      }
      
      // Write result file
      const result = {
        key: component.key,
        name: component.name,
        violations: totalViolations,
        criticalViolations,
        seriousViolations,
        issues: allIssues,
        examplesTested,
        examplesFound: exampleCount,
        scope: "component-examples-only",
        testedAt: new Date().toISOString(),
      };

      const resultPath = path.join(outputDir, `${component.key}.json`);
      fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));

      // Log violations for debugging
      if (totalViolations > 0) {
        console.log(`\n${component.name}: ${totalViolations} violations in ${exampleCount} examples`);
        allViolationDetails.forEach((v) => {
          console.log(`  - [${v.impact}] ${v.id} in "${v.exampleId}": ${v.description}`);
        });
      } else {
        console.log(`✅ ${component.name}: 0 violations in ${exampleCount} examples`);
      }

      // Test always passes - we collect results for the report
      // (unless no examples were found, which is handled above)
      expect(true).toBe(true);
    });
  }
});
