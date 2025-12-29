/**
 * WEX Design System - Public Component API
 *
 * This is the ONLY entry point for consuming WEX components.
 * Do NOT import directly from @/components/ui/* (vendor primitives).
 *
 * All components use the Wex* prefix and support:
 * - className prop for custom styling
 * - data-testid passthrough via props spread
 * - Ref forwarding where applicable
 *
 * Namespace pattern: Compound components use dot notation
 * e.g., WexDialog.Trigger, WexCard.Header
 */

// ===== VARIANT COMPONENTS (with WEX intent/size) =====
export { WexButton, wexButtonVariants, type WexButtonProps } from "./wex-button";
export { WexAlert, wexAlertVariants } from "./wex-alert";
export { WexBadge, wexBadgeVariants, type WexBadgeProps } from "./wex-badge";

// ===== FORM COMPONENTS =====
export { WexInput } from "./wex-input";
export { WexFloatLabel, type WexFloatLabelProps } from "./wex-float-label";
export { WexTextarea } from "./wex-textarea";
export { WexCheckbox } from "./wex-checkbox";
export { WexSwitch } from "./wex-switch";
export { WexSlider } from "./wex-slider";
export { WexRadioGroup } from "./wex-radio-group";
export { WexSelect } from "./wex-select";
export { WexLabel } from "./wex-label";
export { WexForm, useWexFormField } from "./wex-form";
export { WexField } from "./wex-field";
export { WexInputGroup } from "./wex-input-group";
export { WexInputOTP } from "./wex-input-otp";
export { WexCalendar } from "./wex-calendar";
export { WexCombobox, type ComboboxProps, type ComboboxOption } from "./wex-combobox";
export { WexDatePicker, type DatePickerProps, type DatePickerWithInputProps } from "./wex-date-picker";

// ===== OVERLAY COMPONENTS =====
export { WexDialog } from "./wex-dialog";
export { WexAlertDialog } from "./wex-alert-dialog";
export { WexSheet } from "./wex-sheet";
export { WexDrawer } from "./wex-drawer";
export { WexPopover } from "./wex-popover";
export { WexTooltip } from "./wex-tooltip";
export { WexHoverCard } from "./wex-hover-card";

// ===== MENU COMPONENTS =====
export { WexDropdownMenu } from "./wex-dropdown-menu";
export { WexContextMenu } from "./wex-context-menu";
export { WexMenubar } from "./wex-menubar";
export { WexNavigationMenu, wexNavigationMenuTriggerStyle } from "./wex-navigation-menu";
export { WexCommand } from "./wex-command";

// ===== LAYOUT COMPONENTS =====
export { WexCard } from "./wex-card";
export { WexTable } from "./wex-table";
export { WexDataTable, WexDataTableColumnHeader, WexDataTableViewOptions, WexDataTablePagination, WexDataTableRowActions } from "./wex-data-table";
export { WexTabs } from "./wex-tabs";
export { WexAccordion } from "./wex-accordion";
export { WexSeparator } from "./wex-separator";
export { WexScrollArea } from "./wex-scroll-area";
export { WexResizable } from "./wex-resizable";
export { WexAspectRatio } from "./wex-aspect-ratio";
export { WexCollapsible } from "./wex-collapsible";
export { WexSidebar, useWexSidebar } from "./wex-sidebar";

// ===== NAVIGATION COMPONENTS =====
export { WexBreadcrumb } from "./wex-breadcrumb";
export { WexPagination } from "./wex-pagination";

// ===== DISPLAY COMPONENTS =====
export { WexAvatar } from "./wex-avatar";
export { WexProgress } from "./wex-progress";
export { WexSkeleton } from "./wex-skeleton";
export { WexSpinner } from "./wex-spinner";
export { WexCarousel } from "./wex-carousel";
export { WexEmpty } from "./wex-empty";
export { WexItem } from "./wex-item";
export { WexKbd } from "./wex-kbd";

// ===== ACTION COMPONENTS =====
export { WexToggle } from "./wex-toggle";
export { WexToggleGroup } from "./wex-toggle-group";
export { WexButtonGroup } from "./wex-button-group";

// ===== FEEDBACK COMPONENTS =====
export { WexToaster } from "./wex-sonner";
export { wexToast, type WexToastOptions } from "./wex-toast";

// ===== DATA VISUALIZATION =====
export { WexChart, type WexChartConfig } from "./wex-chart";

