# Analytics & events (global)

## Status

- **Owner**:
- **Last updated**:
- **Status**: draft | review | approved
- **Applies to**: global

## Purpose

Define the minimal analytics/events needed to measure success and debug UX issues without collecting unnecessary sensitive data.

## Measurement principles

- **MVP-first**: measure the top flows and key failure points.
- **Minimize PII**: avoid logging user-entered free text, full names, emails, addresses, etc.
- **Consistent naming**: `snake_case` event names, stable property keys.
- **Traceability**: include a request/session identifier where possible.

## Global properties (if used)

| Property | Type | Example | Notes |
|---|---|---|---|
| `session_id` | string | `"abc123"` | non-PII |
| `user_id` | string | `"u_123"` | if allowed |
| `module` | string | `"homepage"` | |
| `environment` | string | `"dev"` | |

## KPI map (metrics -> events)

| Goal / KPI | Primary event(s) | Supporting events | Notes |
|---|---|---|---|
|  |  |  |  |

## Event dictionary (MVP)

### `page_viewed`

- **When**: a route is viewed (after route change)
- **Required properties**: `route`, `module`
- **Optional properties**: `referrer`, `entry_point`
- **PII**: no

### `cta_clicked`

- **When**: a primary CTA is clicked
- **Required properties**: `cta_id`, `route`, `module`
- **PII**: no

## Open questions

- 


