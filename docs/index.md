---
title: Node.js HTTP Request Logger
description: CipherLogger is a lightweight, TypeScript-first HTTP request logging library for Node.js, with adapters for Express and Next.js.
---

# CipherLogger — See every request. Capture every error.

**CipherLogger** is a lightweight, production-ready HTTP request logging library for Node.js. It captures every request in your app and gives you fine-grained control over exactly which fields end up in each log line.

```bash
npm install cipher-logger
```

- :material-language-typescript:{ .lg .middle } **TypeScript-first** — full type coverage across the entire public API

- :material-tune:{ .lg .middle } **Configurable fields** — required fields are always recorded, optional fields are opt-in

- :material-view-grid-plus:{ .lg .middle } **Framework adapters** — Express and Next.js today, Fastify/Hono/NestJS/Nuxt on the way

- :material-weight-lifter:{ .lg .middle } **Zero heavy dependencies** — only your framework as an optional peer dependency

- :material-nodejs:{ .lg .middle } **Node.js 18+** — modern runtime, ESM & CJS output

---

## Quick Example

```ts
import express from "express";
import { createCipherLogger } from "cipher-logger";

const app = express();

const cipher = createCipherLogger({
  fields: { ip: true, userAgent: true, query: true },
  level: "info",
  prefix: "api",
});

app.use(cipher.express());

app.get("/users", (req, res) => res.json({ users: [] }));

app.listen(3000);
```

```text
[2026-09-01T20:00:00.000Z] [INFO] [api] HTTP Request {
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

Ready for more? Follow the [Quick Start guide](getting-started/quick-start.md).

---

## Why CipherLogger?

|                     | Ad-hoc `console.log`   | Generic loggers (pino, morgan) | CipherLogger                              |
| ------------------- | ----------------------- | ------------------------------- | ------------------------------------------ |
| **Schema**           | None — every call differs | Format-defined, not HTTP-aware  | Fixed `RequestLog` shape, HTTP-first        |
| **Field control**    | Manual, per call         | Global formatter                | Per-field opt-in (`fields` config)          |
| **Framework wiring** | Manual                   | Separate middleware packages    | Built-in `express()` / `next()` adapters    |
| **TypeScript**       | N/A                      | Varies                          | Fully typed, exported types for every shape |
| **Accurate timing**  | Manual                   | Manual                          | Built-in, per-adapter (see [caveats](guide/nextjs.md#timing-caveat)) |

## Get Started

- [Installation](getting-started/installation.md) — npm, pnpm, yarn, peer dependencies
- [Quick Start](getting-started/quick-start.md) — your first logged request in under 2 minutes
- [Guide → Express](guide/express.md) — real `status`/`duration` after `res.finish`
- [Guide → Next.js](guide/nextjs.md) — `middleware.ts` integration and its current limitations
- [API Reference](reference/api.md) — every exported function, class, and type
- [Architecture](advanced/architecture.md) — how core and adapters fit together

---

Copyright © 2026 [Cipher-Unit](https://cipherunit.xyz) · Made with [Zensical](https://zensical.org)
