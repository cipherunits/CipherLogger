# Log Schema Reference

## Required fields (`required`) — always present in every HTTP log

| Field       | Type     | Description                |
| ----------- | -------- | --------------------------- |
| `id`        | `string` | Unique identifier (UUID)    |
| `type`      | `"http"` | Log type                   |
| `timestamp` | `string` | ISO 8601 timestamp         |
| `method`    | `string` | HTTP method                |
| `path`      | `string` | Request path               |
| `status`    | `number` | HTTP status code           |
| `duration`  | `number` | Duration in milliseconds   |

## Optional fields (`optional`) — enabled via `fields` in config

| Field       | Type                        | Description                  |
| ----------- | ---------------------------- | ---------------------------- |
| `ip`        | `string`                    | Client IP address            |
| `userAgent` | `string`                    | User-Agent header            |
| `referer`   | `string`                    | Referer header               |
| `protocol`  | `string`                    | `http` / `https`             |
| `host`      | `string`                    | Host header                  |
| `query`     | `Record<string, string>`    | Query string parameters      |
| `requestId` | `string`                    | From the `x-request-id` header |
| `metadata`  | `Record<string, unknown>`   | Arbitrary metadata           |

See `skills/fusion-references/SKILL.md` for the full configuration details of these fields.

## Note for log processing/ingestion (for example, when sending to a log pipeline)

Each HTTP log is a flat object with `type: "http"` — if you need to distinguish
between HTTP logs and manual logs (calls to `logger.info(...)` from the `Logger`
class), check the `type` field; manual logs do not include `type: "http"`.
