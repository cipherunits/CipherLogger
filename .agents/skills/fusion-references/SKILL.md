# Configuration Reference

## `createCipherLogger(config?)`

```ts
import { createCipherLogger } from "cipher-logger";

const cipher = createCipherLogger({
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
  level: "info",
  prefix: "api",
});
```

## Options Table

| Option   | Type                                              | Default      | Description                          |
| -------- | -------------------------------------------------- | ------------ | ------------------------------------ |
| `fields` | `Partial<Record<OptionalRequestField, boolean>>`   | all `false`  | Which optional fields to include in logs |
| `level`  | `"debug" \| "info" \| "warn" \| "error"`  | `"debug"`   | Minimum log level                    |
| `prefix` | `string`                                           | —            | Prefix used in console output        |
> **Note:** The package default `level` is `"debug"`, which is often too verbose for
production. If the user doesn't specify a level, explicitly set `"info"` in the
config and document the reason rather than relying on the package default.

## Optional fields (`fields`) — all default to `false`

| Field       | Type                       | Description                    |
| ----------- | -------------------------- | ------------------------------ |
| `ip`        | `string`                   | Client IP address              |
| `userAgent` | `string`                   | User-Agent header              |
| `referer`   | `string`                   | Referer header                 |
| `protocol`  | `string`                   | `http` or `https`             |
| `host`      | `string`                   | Host header                    |
| `query`     | `Record<string, string>`   | Query string parameters        |
| `requestId` | `string`                   | From the `x-request-id` header |
| `metadata`  | `Record<string, unknown>`  | Arbitrary metadata             |

Enable only the fields the user truly needs; turning on everything can produce
large logs and risk leaking sensitive data (for example IPs or query params that
contain tokens). If query params may contain secrets (passwords, tokens), warn the
user before enabling `query: true`.
