# API Reference

## `createCipherLogger(config?)`

Creates a Cipher Logger instance.

```ts
const cipher = createCipherLogger(config);
```

**Parameter:** `config?: CipherLoggerConfig` — see [Configuration](../guide/configuration.md) for every option.

**Returns:** `CipherLogger`

### Methods

| Method                     | Description                              |
| --------------------------- | ----------------------------------------- |
| `cipher.logRequest(input)`  | Manually log an HTTP request              |
| `cipher.express()`          | Returns an Express middleware             |
| `cipher.next()`             | Returns a Next.js middleware              |

#### `cipher.logRequest(input: RequestLogInput): void`

Logs a single HTTP request. Useful when you're not going through a supported framework adapter, or when you want to log a request from inside a route handler with final, accurate values.

```ts
cipher.logRequest({
  method: "POST",
  path: "/orders",
  status: 201,
  duration: 42,
});
```

`RequestLogInput` accepts the [required fields](log-schema.md#required-fields) plus any [optional fields](log-schema.md#optional-fields) you've enabled in `fields`.

#### `cipher.express(): ExpressMiddleware`

Returns middleware compatible with `app.use()`. Records `status` and `duration` on `res.finish`. See the [Express guide](../guide/express.md).

#### `cipher.next(): NextMiddleware`

Returns a function compatible with a Next.js `middleware.ts` default export. See the [Next.js guide](../guide/nextjs.md) — including the current [timing caveat](../guide/nextjs.md#timing-caveat).

---

## `Logger`

The base logging class, independent of HTTP. Use it for anything that isn't a request — startup messages, background jobs, warnings, caught errors.

```ts
import { Logger } from "cipher-logger";

const logger = new Logger({ level: "info", prefix: "app" });

logger.info("Server started");
logger.warn("Deprecated API used", { route: "/old" });
logger.error("Unhandled error", { err: "..." });
logger.debug("Debug info");
```

### Constructor

```ts
new Logger(options?: LoggerOptions)
```

| Option   | Type                                    | Default   |
| -------- | ---------------------------------------- | --------- |
| `level`  | `"debug" \| "info" \| "warn" \| "error"` | `"debug"` |
| `prefix` | `string`                                 | —         |

### Methods

| Method                              | Description                    |
| ------------------------------------ | -------------------------------- |
| `logger.debug(message, meta?)`       | Log at `debug` level             |
| `logger.info(message, meta?)`        | Log at `info` level              |
| `logger.warn(message, meta?)`        | Log at `warn` level              |
| `logger.error(message, meta?)`       | Log at `error` level             |

Each method accepts a `message: string` and an optional `meta: Record<string, unknown>` object that's merged into the log output.

---

## TypeScript exports

Every public shape is exported so you can type your own wrappers, tests, or downstream consumers:

```ts
import type {
  CipherLogger,
  CipherLoggerConfig,
  RequestLog,
  RequestLogInput,
  OptionalRequestField,
  LogLevel,
  LoggerOptions,
  ExpressMiddleware,
  NextMiddleware,
} from "cipher-logger";
```

| Type                     | Description                                              |
| ------------------------- | ---------------------------------------------------------- |
| `CipherLogger`            | The instance type returned by `createCipherLogger`       |
| `CipherLoggerConfig`      | Input config for `createCipherLogger`                     |
| `RequestLog`              | The full, resolved shape of a logged request               |
| `RequestLogInput`         | The shape you pass to `logRequest`                        |
| `OptionalRequestField`    | Union of all keys valid inside `fields`                    |
| `LogLevel`                | `"debug" \| "info" \| "warn" \| "error"`                   |
| `LoggerOptions`           | Constructor options for `Logger`                            |
| `ExpressMiddleware`       | Return type of `cipher.express()`                           |
| `NextMiddleware`          | Return type of `cipher.next()`                               |

See [Log Schema](log-schema.md) for the field-by-field breakdown of `RequestLog`.
