# API & data contracts: Homepage

## Status

- **Owner**:
- **Last updated**:
- **Status**: draft | review | approved
- **Applies to**: module/homepage

## Relationship to global contracts

Start with global assumptions in `../global/07-api-and-data-contracts.md` and override here only when necessary.

## Data needed by the homepage (MVP)

| UI section | Entity/source | Required fields | Optional fields | Notes |
|---|---|---|---|---|
|  |  |  |  |  |

## Entities (examples)

### <EntityName>

```json
{
  "id": "string",
  "requiredField": "string",
  "optionalField": null
}
```

## Endpoints (or mocked functions)

### GET /<endpoint>

- **Purpose**:
- **Auth**: (public | authenticated | role-restricted)
- **Query params**:
  - `page`:
  - `pageSize`:
  - `sort`:
  - `filter`:
- **Response**:

```json
{
  "items": [],
  "page": 1,
  "pageSize": 25,
  "total": 0
}
```

### POST /<endpoint>

- **Purpose**:
- **Auth**:
- **Body**:

```json
{
  "example": true
}
```

- **Response**:

## Error mapping (UI expectations)

| Error | Likely cause | UI message | User action |
|---|---|---|---|
| 401 | session expired | Please sign in again. | Sign in |
| 403 | missing permission | You don’t have access. | Request access |
| 429 | rate limited | Too many requests. Try again soon. | Wait + retry |
| 5xx | server issue | Something went wrong. | Retry |

## Open questions

- 


