# API Reference

## `createCipherLogger(config?)`

instance اصلی cipher-logger را می‌سازد.

```ts
const cipher = createCipherLogger(config);
```

### Instance methods

| Method                       | Description                              |
| ----------------------------- | ---------------------------------------- |
| `cipher.logRequest(input)`   | Manually log an HTTP request             |
| `cipher.express()`           | Returns Express middleware               |
| `cipher.next()`              | Returns Next.js middleware               |

Use `cipher.logRequest(input)` when the request cannot be captured by standard
middleware — for example inside a route handler when you need to log the actual
response status (not the middleware's status), subject to the limitation described
in `skills/fusion-nextjs-integration/SKILL.md`.

## `Logger` — base application logger (non-HTTP)

For regular application logs (server startup, non-HTTP errors, deprecation warnings)
use `Logger` directly rather than `createCipherLogger`:

```ts
import { Logger } from "cipher-logger";

const logger = new Logger({ level: "info", prefix: "app" });

logger.info("Server started");
logger.warn("Deprecated API used", { route: "/old" });
logger.error("Unhandled error", { err: "..." });
logger.debug("Debug info");
```

Each method (`info` / `warn` / `error` / `debug`) accepts a text message and an
optional metadata object.

## TypeScript Exports

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

If the user wants to write a type-safe wrapper or factory over this package
(for example for Fusion GUI or a shared package in the Mananegar monorepo), use
the provided types rather than redefining them manually.
