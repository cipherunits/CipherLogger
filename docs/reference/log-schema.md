# Log Schema

Every HTTP log produced by CipherLogger conforms to the `RequestLog` type: a fixed set of required fields, plus whichever optional fields you've enabled via [`fields`](../guide/configuration.md#fields--optional-field-flags).

## Required fields

Always included in every HTTP log, regardless of configuration:

| Field       | Type     | Description                |
| ----------- | -------- | ---------------------------- |
| `id`        | `string` | Unique identifier (UUID)     |
| `type`      | `"http"` | Log type discriminator       |
| `timestamp` | `string` | ISO 8601 timestamp           |
| `method`    | `string` | HTTP method                  |
| `path`      | `string` | Request path (including query string as received) |
| `status`    | `number` | HTTP status code             |
| `duration`  | `number` | Duration in milliseconds     |

## Optional fields

Enabled individually via the `fields` config:

| Field       | Type                        | Description                  |
| ----------- | ----------------------------- | ------------------------------- |
| `ip`        | `string`                      | Client IP address               |
| `userAgent` | `string`                      | `User-Agent` header             |
| `referer`   | `string`                      | `Referer` header                 |
| `protocol`  | `string`                      | Protocol (`http` / `https`)     |
| `host`      | `string`                      | `Host` header                    |
| `query`     | `Record<string, string>`      | Query string parameters          |
| `requestId` | `string`                      | Value of the `x-request-id` header |
| `metadata`  | `Record<string, unknown>`     | Custom metadata you supply        |

## Full example

With every optional field enabled:

```json
{
  "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "type": "http",
  "timestamp": "2026-09-01T20:00:00.000Z",
  "method": "GET",
  "path": "/users?page=1",
  "status": 200,
  "duration": 12,
  "ip": "::1",
  "userAgent": "Mozilla/5.0 ...",
  "referer": "https://example.com/",
  "protocol": "https",
  "host": "api.example.com",
  "query": { "page": "1" },
  "requestId": "req_9f8e7d6c",
  "metadata": { "userId": "usr_123" }
}
```

## Working with the schema in TypeScript

```ts
import type { RequestLog } from "cipher-logger";

function shipToSink(log: RequestLog) {
  // log is fully typed — required fields always present,
  // optional fields present only if you enabled them
}
```

Because optional fields are only ever added when explicitly enabled, downstream consumers (log shippers, dashboards, alert rules) can rely on a stable, minimal shape by default and opt into richer payloads only where needed.
