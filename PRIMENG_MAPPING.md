# PrimeNG to WEX Component Mapping

This document maps PrimeNG component names to their WEX Design System equivalents.

## Purpose

PrimeNG is referenced as a style guide for component richness and variant support. However, WEX maintains its own naming conventions aligned with shadcn/ui patterns.

## Name Differences

| PrimeNG Component | WEX Equivalent | Notes |
|-------------------|----------------|-------|
| Tag | Badge | WEX uses "Badge" for small status descriptors |
| Message | Alert | WEX uses "Alert" for inline messages |
| Panel | Card | WEX uses "Card" for contained content |
| Sidebar | Sheet | WEX uses "Sheet" for slide-out panels |
| OverlayPanel | Popover | WEX uses "Popover" for floating content |
| ConfirmPopup | AlertDialog | WEX uses "AlertDialog" for confirmations |
| ConfirmDialog | AlertDialog | Same as above |
| InputText | Input | WEX uses "Input" |
| InputTextarea | Textarea | WEX uses "Textarea" |
| InputNumber | Input (type="number") | WEX uses Input with type prop |
| InputMask | InputOTP | WEX has specific InputOTP component |
| Dropdown | Select | WEX uses "Select" |
| MultiSelect | Combobox | WEX uses "Combobox" for multi-select |
| Listbox | Command | WEX uses "Command" for searchable lists |
| DataTable | DataTable | Same name |
| TreeTable | (not implemented) | Future consideration |
| TabView | Tabs | WEX uses "Tabs" |
| Stepper | (not implemented) | Future consideration |
| Chip | Badge | WEX uses Badge with outline variant |
| SplitButton | ButtonGroup | WEX uses ButtonGroup composition |
| SpeedDial | (not implemented) | Future consideration |
| MegaMenu | NavigationMenu | WEX uses NavigationMenu |
| TieredMenu | DropdownMenu | WEX uses DropdownMenu |
| Galleria | Carousel | WEX uses Carousel |
| Image | AspectRatio + img | WEX uses composition |
| ProgressBar | Progress | WEX uses "Progress" |
| ProgressSpinner | Spinner | WEX uses "Spinner" |
| BlockUI | (not implemented) | Future consideration |
| DeferredContent | (not implemented) | Use React.lazy |
| Terminal | (not implemented) | Future consideration |

## Token Mapping Strategy

When referencing PrimeNG's design tokens for styling:

1. **DO** reference PrimeNG's visual patterns (spacing, states, animations)
2. **DO** adopt PrimeNG's token granularity where beneficial
3. **DO NOT** use PrimeNG class names or token names directly
4. **DO NOT** rename WEX components to match PrimeNG

## Phase 4 Considerations

The following PrimeNG components may be considered for future implementation:

- TreeTable (hierarchical data)
- Stepper (multi-step forms)
- SpeedDial (floating action button)
- BlockUI (loading overlay)
- Terminal (CLI-style interface)
- VirtualScroller (performance optimization)
- DragDrop utilities

## References

- [PrimeNG Documentation](https://primeng.org/)
- [PrimeNG GitHub](https://github.com/primefaces/primeng)
- [WEX Token Architecture](src/docs/pages/foundations/TokenArchitecturePage.tsx)

