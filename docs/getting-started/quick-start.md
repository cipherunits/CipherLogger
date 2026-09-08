# Quick Start

This page gets you from zero to a logged HTTP request in under two minutes.

## 1. Install

```bash
npm install cipher-logger
```

## 2. Create a logger instance

```ts
import { createCipherLogger } from "cipher-logger";

const cipher = createCipherLogger({
  fields: {
    ip: true,
    userAgent: true,
    query: true,
  },
  level: "info",
});
```

`createCipherLogger` takes an optional [`CipherLoggerConfig`](../reference/api.md#createcipherloggerconfig) object. Every field you leave out simply falls back to its default — see [Configuration](../guide/configuration.md) for the full list.

## 3. Wire it into your framework

=== "Express"

    ```ts
    import express from "express";

    const app = express();

    app.use(cipher.express());

    app.get("/users", (req, res) => res.json({ users: [] }));

    app.listen(3000);
    ```

=== "Next.js"

    ```ts
    // middleware.ts
    import { createCipherLogger } from "cipher-logger";

    const cipher = createCipherLogger({ fields: { ip: true } });

    export default cipher.next();

    export const config = {
      matcher: ["/api/:path*", "/dashboard/:path*"],
    };
    ```

Full walkthroughs, including the Next.js timing caveat, live in the [Guide](../guide/express.md).

## 4. Read the output

```text
[2026-09-01T20:00:00.000Z] [INFO] [express] HTTP Request {
  id: 'a1b2c3d4-...',
  type: 'http',
  timestamp: '2026-09-01T20:00:00.000Z',
  method: 'GET',
  path: '/users?page=1',
  status: 200,
  duration: 12,
  ip: '::1',
  userAgent: 'Mozilla/5.0 ...',
  query: { page: '1' }
}
```

`id`, `type`, `timestamp`, `method`, `path`, `status`, and `duration` are always present. Everything else is opt-in through `fields` — see the [Log Schema](../reference/log-schema.md) for the complete list and types.

## 5. Log outside of HTTP

Need general-purpose logging (startup messages, background jobs, warnings)? Use the framework-agnostic [`Logger`](../reference/api.md#logger) class directly:

```ts
import { Logger } from "cipher-logger";

const logger = new Logger({ level: "info", prefix: "app" });

logger.info("Server started");
logger.warn("Deprecated API used", { route: "/old" });
logger.error("Unhandled error", { err: "..." });
```

## Next steps

- [Configuration](../guide/configuration.md) — every option, in detail
- [Express](../guide/express.md) — accurate `status`/`duration` after the response finishes
- [Next.js](../guide/nextjs.md) — `middleware.ts` setup and its current limitations
- [API Reference](../reference/api.md) — full method and type signatures
