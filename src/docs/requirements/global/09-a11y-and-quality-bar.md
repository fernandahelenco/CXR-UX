# A11y & quality bar (global)

## Status

- **Owner**:
- **Last updated**:
- **Status**: draft | review | approved
- **Applies to**: global

## Accessibility (MVP)

### Target

- **WCAG**: 2.2 AA (or specify)

### Keyboard and focus

- All interactive elements are reachable via **Tab/Shift+Tab**
- Visible focus indicator is always present and not obscured
- No keyboard traps
- Logical tab order matches visual layout and reading order

### Screen reader / semantics

- Headings are hierarchical (`h1` once per page, then `h2`, `h3`…)
- Form fields have accessible names (label or `aria-label`)
- Icons that convey meaning have accessible text; decorative icons are hidden

### Color and contrast

- Text contrast meets AA thresholds
- Color is not the only means of conveying information (errors, status, charts)

## Quality bar (MVP)

### Reliability expectations

- Clear “what happened” messaging on errors
- Safe retries (idempotent) where appropriate
- Graceful handling of partial/empty data

### Performance expectations (UI)

- Avoid layout shift for loading states (skeletons/placeholder sizing)
- Avoid blocking spinners for actions that can be optimistic

### Browser/device support

- **Desktop**: (list)
- **Mobile**: (list)

## Testing expectations

- Unit tests for key formatting/state helpers
- A11y smoke checks for top flows (automated + spot-checks)

## Open questions

- 


