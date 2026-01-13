# API & data contracts (global)

## Status

- **Owner**:
- **Last updated**:
- **Status**: draft | review | approved
- **Applies to**: global

## Purpose

Capture shared API/data assumptions early to avoid UI rewrites later. This can describe real APIs, mocked APIs, or future contracts.

## Global assumptions

- **Auth model**: (none | cookie | bearer token | other)
- **Authorization**: (RBAC/ABAC rules at a high level)
- **ID formats**: (uuid, snowflake, numeric, etc.)
- **Time zones**: (UTC? user locale?)
- **Pagination**: (cursor vs offset; default page size)
- **Sorting/filtering**: (allowed fields, server vs client)
- **Rate limits**: (expected behavior and headers)
- **Caching**: (ETags? cache-control?)

## Shared entities (examples)

### User

```json
{
  "id": "string",
  "displayName": "string",
  "email": "string",
  "roles": ["string"]
}
```

### Error response

```json
{
  "requestId": "string",
  "code": "string",
  "message": "string",
  "details": [
    {
      "field": "string",
      "issue": "string"
    }
  ]
}
```

## HTTP conventions

- **Success**: 200/201/204
- **Client errors**: 400/401/403/404/409/422
- **Server errors**: 500/503

## Error handling expectations (UI)

| Scenario | UI behavior | Retry? | Notes |
|---|---|---|---|
| Network offline / timeout | Show inline + page-level fallback | Yes |  |
| 401 unauthenticated | Redirect to login / prompt | After re-auth |  |
| 403 forbidden | Explain lack of permission | No |  |
| 404 not found | Not found state | No |  |
| 409 conflict | Explain conflict; allow refresh | Maybe |  |
| 429 rate limited | Tell user to try later | After delay |  |
| 5xx | Apology + retry | Yes |  |

## Open questions

- 


