# A11y & quality bar: Homepage

## Status

- **Owner**:
- **Last updated**:
- **Status**: draft | review | approved
- **Applies to**: module/homepage

## Accessibility requirements (MVP)

### Navigation and structure

- Landmarks used appropriately (`main`, `nav`, etc.)
- One clear `h1` and logical heading structure

### Interactive elements

- All CTAs are keyboard accessible
- Focus is visible and consistent
- No hover-only affordances without keyboard equivalent

### Forms (if applicable)

- Labels/assistive text present and associated
- Errors are announced and tied to fields

### Motion and reduced motion

- Animations respect reduced motion preference

## Quality bar (MVP)

### Performance

- Skeletons prevent layout shift
- Images/assets are sized to avoid jumps

### Reliability

- Clear empty/error states
- Safe retries (no duplicate actions)

## Definition of done (MVP)

- [ ] Top flows meet acceptance criteria in `04-requirements.md`
- [ ] Edge cases covered per `05-edge-cases-and-states.md`
- [ ] Key copy reviewed per `06-content-and-copy.md`
- [ ] A11y checks completed (automated + spot-check)


