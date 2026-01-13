# Analytics & events: Homepage

## Status

- **Owner**:
- **Last updated**:
- **Status**: draft | review | approved
- **Applies to**: module/homepage

## Goals to measure (MVP)

| Goal | Metric | Primary event(s) | Notes |
|---|---|---|---|
|  |  |  |  |

## Events (MVP)

### `homepage_viewed`

- **When**:
- **Required properties**:
  - `route`
  - `entry_point`
- **Optional properties**:
  - `referrer`
- **PII**: no

### `homepage_primary_cta_clicked`

- **When**:
- **Required properties**:
  - `cta_id`
  - `route`
- **PII**: no

### `homepage_error_seen`

- **When**: an error state is rendered
- **Required properties**:
  - `error_type` (network | auth | permission | server | validation)
  - `route`
- **PII**: no

## Dashboards / reporting (optional)

- 


