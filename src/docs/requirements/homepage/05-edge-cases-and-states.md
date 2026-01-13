# Edge cases & states: Homepage

## Status

- **Owner**:
- **Last updated**:
- **Status**: draft | review | approved
- **Applies to**: module/homepage

## State inventory (MVP)

| Area | State | Trigger | UI behavior | Recovery |
|---|---|---|---|---|
| Page load | Loading | initial visit | skeletons/placeholders | auto |
| Page load | Error | network/5xx | error message + retry | retry |
| Content | Empty | no data returned | friendly empty state | change filters / CTA |
| Search | No results | query yields none | “no results” copy | clear query |
| Auth | Not signed in | 401 | route guard / redirect | sign in |
| Auth | Permission denied | 403 | explain + next step | request access |

## Loading states

- **Initial load**:
- **Inline refresh**:
- **Background refresh**:

## Empty states

- **No data**: (what message and what action?)
- **No results**: (what message and what action?)

## Error handling

### Network / offline / timeout

- What we show:
- Retry strategy:

### Validation / bad input (if applicable)

- What we show:
- Field-level guidance:

### Server errors (5xx)

- What we show:
- Logging/telemetry needed:

## Latency and partial data

- **Slow endpoints**: what is the threshold before showing a loader?
- **Partial data**: can we render “best effort” and flag missing sections?

## Edge case checklist

- [ ] Very long text (names/titles)
- [ ] Very small/large viewport
- [ ] Empty arrays and missing optional fields
- [ ] Rate limiting (429)
- [ ] Duplicate submissions (double click)


