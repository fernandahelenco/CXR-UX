import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

// Component parity data
const componentParity = [
  // Form Components
  { category: "Form", wex: "Input", primeng: "InputText", status: "complete", notes: "Sizes, filled, icons, invalid" },
  { category: "Form", wex: "FloatLabel", primeng: "FloatLabel", status: "complete", notes: "In variant, sizes, icons" },
  { category: "Form", wex: "Textarea", primeng: "Textarea", status: "complete", notes: "Sizes, autoResize" },
  { category: "Form", wex: "Select", primeng: "Select", status: "complete", notes: "Standard dropdown" },
  { category: "Form", wex: "Combobox", primeng: "AutoComplete", status: "complete", notes: "Searchable select" },
  { category: "Form", wex: "Checkbox", primeng: "Checkbox", status: "complete", notes: "Sizes" },
  { category: "Form", wex: "RadioGroup", primeng: "RadioButton", status: "complete", notes: "Sizes" },
  { category: "Form", wex: "Switch", primeng: "ToggleSwitch", status: "complete", notes: "Sizes" },
  { category: "Form", wex: "Slider", primeng: "Slider", status: "complete", notes: "Range mode" },
  { category: "Form", wex: "InputOTP", primeng: "InputOtp", status: "complete", notes: "OTP input" },
  { category: "Form", wex: "InputGroup", primeng: "InputGroup", status: "complete", notes: "Addons, icons" },
  { category: "Form", wex: "Calendar", primeng: "Calendar", status: "complete", notes: "Month view" },
  { category: "Form", wex: "DatePicker", primeng: "DatePicker", status: "complete", notes: "Range, presets" },
  { category: "Form", wex: "Label", primeng: "-", status: "complete", notes: "Extra component" },
  { category: "Form", wex: "Form", primeng: "-", status: "complete", notes: "Form validation wrapper" },
  { category: "Form", wex: "Field", primeng: "-", status: "complete", notes: "Form field wrapper" },
  { category: "Form", wex: "-", primeng: "CascadeSelect", status: "missing", notes: "" },
  { category: "Form", wex: "-", primeng: "ColorPicker", status: "missing", notes: "" },
  { category: "Form", wex: "-", primeng: "Editor", status: "missing", notes: "" },
  { category: "Form", wex: "-", primeng: "InputMask", status: "missing", notes: "" },
  { category: "Form", wex: "-", primeng: "InputNumber", status: "missing", notes: "" },
  { category: "Form", wex: "-", primeng: "Knob", status: "missing", notes: "" },
  { category: "Form", wex: "-", primeng: "Listbox", status: "missing", notes: "" },
  { category: "Form", wex: "-", primeng: "MultiSelect", status: "missing", notes: "" },
  { category: "Form", wex: "-", primeng: "Rating", status: "missing", notes: "" },
  { category: "Form", wex: "-", primeng: "TreeSelect", status: "missing", notes: "" },
  
  // Button
  { category: "Button", wex: "Button", primeng: "Button", status: "complete", notes: "11 severities, rounded, loading" },
  { category: "Button", wex: "ButtonGroup", primeng: "ButtonGroup", status: "complete", notes: "Grouped buttons" },
  { category: "Button", wex: "-", primeng: "SpeedDial", status: "missing", notes: "" },
  { category: "Button", wex: "-", primeng: "SplitButton", status: "missing", notes: "" },
  
  // Data
  { category: "Data", wex: "Table", primeng: "Table", status: "complete", notes: "Striped, gridlines, sizes" },
  { category: "Data", wex: "DataTable", primeng: "Table", status: "complete", notes: "Sorting, filtering, pagination" },
  { category: "Data", wex: "Pagination", primeng: "Paginator", status: "complete", notes: "RowsPerPage, PageReport, JumpToPage" },
  { category: "Data", wex: "-", primeng: "DataView", status: "missing", notes: "" },
  { category: "Data", wex: "-", primeng: "OrderList", status: "missing", notes: "" },
  { category: "Data", wex: "-", primeng: "OrgChart", status: "missing", notes: "" },
  { category: "Data", wex: "-", primeng: "PickList", status: "missing", notes: "" },
  { category: "Data", wex: "-", primeng: "Timeline", status: "missing", notes: "" },
  { category: "Data", wex: "-", primeng: "Tree", status: "missing", notes: "" },
  { category: "Data", wex: "-", primeng: "TreeTable", status: "missing", notes: "" },
  { category: "Data", wex: "-", primeng: "VirtualScroller", status: "missing", notes: "" },
  
  // Panel
  { category: "Panel", wex: "Accordion", primeng: "Accordion", status: "complete", notes: "Standard accordion" },
  { category: "Panel", wex: "Card", primeng: "Card", status: "complete", notes: "4 variants" },
  { category: "Panel", wex: "Separator", primeng: "Divider", status: "complete", notes: "" },
  { category: "Panel", wex: "Tabs", primeng: "Tabs", status: "complete", notes: "Scrollable, closable" },
  { category: "Panel", wex: "Collapsible", primeng: "Panel", status: "complete", notes: "" },
  { category: "Panel", wex: "ScrollArea", primeng: "ScrollPanel", status: "complete", notes: "" },
  { category: "Panel", wex: "Resizable", primeng: "Splitter", status: "complete", notes: "" },
  { category: "Panel", wex: "Sidebar", primeng: "Sidebar", status: "complete", notes: "Collapsible, mobile" },
  { category: "Panel", wex: "-", primeng: "Fieldset", status: "missing", notes: "" },
  { category: "Panel", wex: "-", primeng: "Stepper", status: "missing", notes: "" },
  { category: "Panel", wex: "-", primeng: "Toolbar", status: "missing", notes: "" },
  
  // Overlay
  { category: "Overlay", wex: "Dialog", primeng: "Dialog", status: "complete", notes: "Sizes, positions, maximizable" },
  { category: "Overlay", wex: "Sheet", primeng: "Drawer", status: "complete", notes: "Sizes" },
  { category: "Overlay", wex: "Drawer", primeng: "Drawer", status: "complete", notes: "Bottom drawer" },
  { category: "Overlay", wex: "AlertDialog", primeng: "ConfirmDialog", status: "complete", notes: "" },
  { category: "Overlay", wex: "Popover", primeng: "Popover", status: "complete", notes: "" },
  { category: "Overlay", wex: "Tooltip", primeng: "Tooltip", status: "complete", notes: "delayDuration" },
  { category: "Overlay", wex: "HoverCard", primeng: "-", status: "complete", notes: "Extra component" },
  { category: "Overlay", wex: "-", primeng: "ConfirmPopup", status: "missing", notes: "" },
  { category: "Overlay", wex: "-", primeng: "DynamicDialog", status: "missing", notes: "" },
  
  // Menu
  { category: "Menu", wex: "Breadcrumb", primeng: "Breadcrumb", status: "complete", notes: "" },
  { category: "Menu", wex: "ContextMenu", primeng: "ContextMenu", status: "complete", notes: "" },
  { category: "Menu", wex: "DropdownMenu", primeng: "Menu", status: "complete", notes: "" },
  { category: "Menu", wex: "Menubar", primeng: "Menubar", status: "complete", notes: "" },
  { category: "Menu", wex: "NavigationMenu", primeng: "MegaMenu", status: "partial", notes: "Simpler than MegaMenu" },
  { category: "Menu", wex: "Command", primeng: "-", status: "complete", notes: "Command palette (extra)" },
  { category: "Menu", wex: "-", primeng: "Dock", status: "missing", notes: "" },
  { category: "Menu", wex: "-", primeng: "PanelMenu", status: "missing", notes: "" },
  { category: "Menu", wex: "-", primeng: "TieredMenu", status: "missing", notes: "" },
  
  // Messages
  { category: "Messages", wex: "Alert", primeng: "Message", status: "complete", notes: "4 severities" },
  { category: "Messages", wex: "Toast (Sonner)", primeng: "Toast", status: "complete", notes: "" },
  
  // Media
  { category: "Media", wex: "Carousel", primeng: "Carousel", status: "complete", notes: "" },
  { category: "Media", wex: "AspectRatio", primeng: "Image", status: "partial", notes: "Different purpose" },
  { category: "Media", wex: "-", primeng: "Galleria", status: "missing", notes: "" },
  { category: "Media", wex: "-", primeng: "ImageCompare", status: "missing", notes: "" },
  
  // Misc
  { category: "Misc", wex: "Avatar", primeng: "Avatar", status: "complete", notes: "Sizes, shapes, groups, badge" },
  { category: "Misc", wex: "Badge", primeng: "Badge", status: "complete", notes: "Sizes, pill" },
  { category: "Misc", wex: "Progress", primeng: "ProgressBar", status: "complete", notes: "Indeterminate, label" },
  { category: "Misc", wex: "Spinner", primeng: "ProgressSpinner", status: "complete", notes: "" },
  { category: "Misc", wex: "Skeleton", primeng: "Skeleton", status: "complete", notes: "Shapes, animations" },
  { category: "Misc", wex: "Toggle", primeng: "ToggleButton", status: "complete", notes: "" },
  { category: "Misc", wex: "ToggleGroup", primeng: "SelectButton", status: "complete", notes: "" },
  { category: "Misc", wex: "Chart", primeng: "Chart", status: "complete", notes: "Bar, line, pie, area" },
  { category: "Misc", wex: "Empty", primeng: "-", status: "complete", notes: "Empty state (extra)" },
  { category: "Misc", wex: "Item", primeng: "-", status: "complete", notes: "List item (extra)" },
  { category: "Misc", wex: "Kbd", primeng: "-", status: "complete", notes: "Keyboard shortcut (extra)" },
  { category: "Misc", wex: "-", primeng: "Chip", status: "missing", notes: "" },
  { category: "Misc", wex: "-", primeng: "Inplace", status: "missing", notes: "" },
  { category: "Misc", wex: "-", primeng: "MeterGroup", status: "missing", notes: "" },
  { category: "Misc", wex: "Tag", primeng: "Tag", status: "stable", notes: "Implemented as WexTag" },
  { category: "Misc", wex: "-", primeng: "Terminal", status: "missing", notes: "" },
];

// Calculate stats
const stats = {
  complete: componentParity.filter(c => c.status === "complete").length,
  partial: componentParity.filter(c => c.status === "partial").length,
  missing: componentParity.filter(c => c.status === "missing").length,
};

const categories = [...new Set(componentParity.map(c => c.category))];

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "complete":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "partial":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case "missing":
      return <Circle className="h-4 w-4 text-muted-foreground" />;
    default:
      return null;
  }
}

export default function PrimeNGParityPage() {
  return (
    <ComponentPage
      title="PrimeNG Parity"
      description="Component comparison tracking between WEX Design System and PrimeNG."
      status="stable"
      registryKey="primeng-parity"
    >
      <Section title="Overview">
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{stats.complete}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Complete</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{stats.partial}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Partial</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <Circle className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{stats.missing}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Missing</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          This page tracks component parity between the WEX Design System and PrimeNG (Angular).
          It helps identify which components have been implemented and which variants are supported.
        </p>
      </Section>

      {categories.map(category => (
        <Section key={category} title={category}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">WEX Component</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">PrimeNG</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                {componentParity
                  .filter(c => c.category === category)
                  .map((component, idx) => (
                    <tr key={idx} className="border-b border-border/50">
                      <td className="py-2 px-3">
                        <StatusIcon status={component.status} />
                      </td>
                      <td className="py-2 px-3 font-medium">
                        {component.wex === "-" ? (
                          <span className="text-muted-foreground">-</span>
                        ) : (
                          component.wex
                        )}
                      </td>
                      <td className="py-2 px-3 text-muted-foreground">{component.primeng}</td>
                      <td className="py-2 px-3 text-muted-foreground text-xs">{component.notes}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Section>
      ))}

      <Section title="Legend">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span><strong>Complete</strong> - Component exists with PrimeNG-equivalent variants</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <span><strong>Partial</strong> - Component exists but missing some variants or features</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-4 w-4 text-muted-foreground" />
            <span><strong>Missing</strong> - Component does not exist in WEX Design System</span>
          </div>
        </div>
      </Section>
    </ComponentPage>
  );
}

