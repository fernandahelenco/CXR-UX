/**
 * @wex/components - WEX Design System React Components
 *
 * Theme-agnostic UI components built on Radix UI and shadcn/ui primitives.
 * These components consume CSS variables for styling but do not define their values.
 *
 * IMPORTANT: You must install and import a theme package (e.g., @wex/design-tokens)
 * for components to be styled correctly. Without a theme, components will render
 * with browser defaults.
 *
 * @example
 * // Import theme CSS first
 * import '@wex/design-tokens/css';
 *
 * // Then use components
 * import { WexButton, WexInput } from '@wex/components';
 */

// ===== UTILITY FUNCTION =====
export { cn } from "./lib/utils";

// ===== VARIANT COMPONENTS (with WEX intent/size) =====
export { WexButton, wexButtonVariants, type WexButtonProps } from "./components/wex/wex-button";
export { WexAlert, wexAlertVariants } from "./components/wex/wex-alert";
export { WexBadge, wexBadgeVariants, type WexBadgeProps } from "./components/wex/wex-badge";

// ===== FORM COMPONENTS =====
export { WexInput } from "./components/wex/wex-input";
export { WexFloatLabel, type WexFloatLabelProps } from "./components/wex/wex-float-label";
export { WexTextarea } from "./components/wex/wex-textarea";
export { WexCheckbox } from "./components/wex/wex-checkbox";
export { WexSwitch } from "./components/wex/wex-switch";
export { WexSlider } from "./components/wex/wex-slider";
export { WexRadioGroup } from "./components/wex/wex-radio-group";
export { WexSelect } from "./components/wex/wex-select";
export { WexLabel } from "./components/wex/wex-label";
export { WexForm, useWexFormField } from "./components/wex/wex-form";
export { WexField } from "./components/wex/wex-field";
export { WexInputGroup } from "./components/wex/wex-input-group";
export { WexInputOTP } from "./components/wex/wex-input-otp";
export { WexCalendar } from "./components/wex/wex-calendar";
export { WexCombobox, type ComboboxProps, type ComboboxOption } from "./components/wex/wex-combobox";
export { WexDatePicker, type DatePickerProps, type DatePickerWithInputProps } from "./components/wex/wex-date-picker";

// ===== OVERLAY COMPONENTS =====
export { WexDialog } from "./components/wex/wex-dialog";
export { WexAlertDialog } from "./components/wex/wex-alert-dialog";
export { WexSheet } from "./components/wex/wex-sheet";
export { WexDrawer } from "./components/wex/wex-drawer";
export { WexPopover } from "./components/wex/wex-popover";
export { WexTooltip } from "./components/wex/wex-tooltip";
export { WexHoverCard } from "./components/wex/wex-hover-card";

// ===== MENU COMPONENTS =====
export { WexDropdownMenu } from "./components/wex/wex-dropdown-menu";
export { WexContextMenu } from "./components/wex/wex-context-menu";
export { WexMenubar } from "./components/wex/wex-menubar";
export { WexNavigationMenu, wexNavigationMenuTriggerStyle } from "./components/wex/wex-navigation-menu";
export { WexCommand } from "./components/wex/wex-command";

// ===== LAYOUT COMPONENTS =====
export { WexCard } from "./components/wex/wex-card";
export { WexTable } from "./components/wex/wex-table";
export { WexDataTable, WexDataTableColumnHeader, WexDataTableViewOptions, WexDataTablePagination, WexDataTableRowActions } from "./components/wex/wex-data-table";
export { WexTabs } from "./components/wex/wex-tabs";
export { WexAccordion } from "./components/wex/wex-accordion";
export { WexSeparator } from "./components/wex/wex-separator";
export { WexScrollArea } from "./components/wex/wex-scroll-area";
export { WexResizable } from "./components/wex/wex-resizable";
export { WexAspectRatio } from "./components/wex/wex-aspect-ratio";
export { WexCollapsible } from "./components/wex/wex-collapsible";
export { WexSidebar, useWexSidebar } from "./components/wex/wex-sidebar";

// ===== NAVIGATION COMPONENTS =====
export { WexBreadcrumb } from "./components/wex/wex-breadcrumb";
export { WexPagination } from "./components/wex/wex-pagination";

// ===== DISPLAY COMPONENTS =====
export { WexAvatar } from "./components/wex/wex-avatar";
export { WexProgress } from "./components/wex/wex-progress";
export { WexSkeleton } from "./components/wex/wex-skeleton";
export { WexSpinner } from "./components/wex/wex-spinner";
export { WexCarousel } from "./components/wex/wex-carousel";
export { WexEmpty } from "./components/wex/wex-empty";
export { WexItem } from "./components/wex/wex-item";
export { WexKbd } from "./components/wex/wex-kbd";

// ===== ACTION COMPONENTS =====
export { WexToggle } from "./components/wex/wex-toggle";
export { WexToggleGroup } from "./components/wex/wex-toggle-group";
export { WexButtonGroup } from "./components/wex/wex-button-group";

// ===== FEEDBACK COMPONENTS =====
export { WexToaster } from "./components/wex/wex-sonner";
export { wexToast, type WexToastOptions } from "./components/wex/wex-toast";

// ===== DATA VISUALIZATION =====
export { WexChart, type WexChartConfig } from "./components/wex/wex-chart";

