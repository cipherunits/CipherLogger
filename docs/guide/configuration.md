# Configuration

`createCipherLogger(config?)` accepts a single optional `CipherLoggerConfig` object. Nothing is required — every option has a safe default.

```ts
import { createCipherLogger } from "cipher-logger";

const cipher = createCipherLogger({
  // Optional fields — default: false (disabled)
  fields: {
    ip: true,
    userAgent: true,
    referer: false,
    protocol: true,
    host: true,
    query: true,
    requestId: true,
    metadata: false,
  },

  // Log level: debug | info | warn | error
  level: "info",

  // Optional prefix in console output
  prefix: "api",
});
```

## Top-level options

| Option   | Type                                              | Default     | Description                     |
| -------- | -------------------------------------------------- | ----------- | -------------------------------- |
| `fields` | `Partial<Record<OptionalRequestField, boolean>>`   | all `false` | Optional log fields to include   |
| `level`  | `"debug" \| "info" \| "warn" \| "error"`           | `"debug"`   | Minimum log level that gets emitted |
| `prefix` | `string`                                           | —           | Prefix shown in every console line |

!!! tip "Log level filtering"
    Setting `level: "info"` silences `logger.debug(...)` calls but still emits `info`, `warn`, and `error`. Use `"debug"` in development and `"info"` or `"warn"` in production to cut noise.

## `fields` — optional field flags

Every key defaults to `false`. Turn on only what you actually consume downstream — each enabled field adds a small amount of per-request overhead (reading a header, parsing a query string, etc.).

| Field       | Type                       | What it captures            |
| ----------- | --------------------------- | ---------------------------- |
| `ip`        | `boolean`                   | Client IP address            |
| `userAgent` | `boolean`                   | `User-Agent` header          |
| `referer`   | `boolean`                   | `Referer` header              |
| `protocol`  | `boolean`                   | Protocol (`http` / `https`)  |
| `host`      | `boolean`                   | `Host` header                |
| `query`     | `boolean`                   | Query string parameters      |
| `requestId` | `boolean`                   | Value of `x-request-id`      |
| `metadata`  | `boolean`                   | Custom metadata you pass in  |

See [Log Schema](../reference/log-schema.md) for the exact runtime type of each field once enabled.

## Choosing a `prefix` per environment

A common pattern is one logger per subsystem, so log lines are easy to `grep`:

```ts
const apiLogger = createCipherLogger({ prefix: "api", level: "info" });
const workerLogger = createCipherLogger({ prefix: "worker", level: "warn" });
```

## Passing `metadata`

`metadata` is the escape hatch for anything CipherLogger doesn't capture automatically — user IDs, tenant IDs, feature flags, trace IDs from an APM tool, etc. Enable it in `fields`, then supply it manually via [`logRequest`](../reference/api.md#createcipherloggerconfig):

```ts
cipher.logRequest({
  method: "POST",
  path: "/orders",
  status: 201,
  duration: 42,
  metadata: { userId: "usr_123", tenant: "acme" },
});
```

## Next steps

- [Express](express.md) — mount as middleware, get accurate timing for free
- [Next.js](nextjs.md) — `middleware.ts` setup and its current timing limitation
- [API Reference](../reference/api.md) — full type signatures
