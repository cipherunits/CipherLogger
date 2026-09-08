# Cipher Logger

Cipher Logger is a lightweight, production-ready HTTP logging library for Node.js. It captures every request in Express, Next.js, React, Vue, and Nuxt applications. You decide exactly which fields appear in each log — required fields are always recorded, optional fields are opt-in.

## Table of Contents

- Features
- Installation
- Quick Start
- Configuration
- Express
- Next.js
- Fastify
- NestJS
- Hono
- Log Schema
- API Reference
- Architecture
- Local Development
- Contributing
- License

---

## Features

- **TypeScript-first** — full type coverage across the entire API
- **Configurable fields** — fine-grained control over optional log fields
- **Express middleware** — records real `status` and `duration` after the response finishes
- **Next.js middleware** — drop-in support for `middleware.ts`
- **React**, **Vue**, and **Nuxt** support — modern app stacks alongside the server frameworks
- **Zero heavy dependencies** — only framework peers are optional
- **Fastify middleware** — lightweight hook-compatible middleware for Fastify
- **NestJS middleware** — Express-compatible middleware for Nest apps
- **Hono middleware** — edge-friendly middleware for Hono apps
- **Node.js 18+** compatible

---

## Installation

```bash
npm install cipher-logger
# or
pnpm add cipher-logger
# or
yarn add cipher-logger
```

### Peer Dependencies

Install the framework you use:

```bash
# Express
npm install express

# Next.js
npm install next

# React
npm install react

# Vue
npm install vue

# Nuxt
npm install nuxt

# Fastify
npm install fastify

# NestJS (core packages)
npm install @nestjs/core @nestjs/common

# Hono
npm install hono
```

---

## Quick Start

```typescript
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

---

## Configuration

```typescript
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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fields` | `Partial<Record<OptionalRequestField, boolean>>` | all `false` | Optional log fields to include |
| `level` | `"debug" \| "info" \| "warn" \| "error"` | `"debug"` | Minimum log level |
| `prefix` | `string` | — | Prefix in console output |

---

## Express

```typescript
import express from "express";
import { createCipherLogger } from "cipher-logger";

const app = express();

const cipher = createCipherLogger({
  fields: {
    ip: true,
    userAgent: true,
    query: true,
    requestId: true,
  },
  level: "info",
  prefix: "express",
});

// Mount before your routes
app.use(cipher.express());

app.get("/users", (req, res) => {
  res.json({ users: [] });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

### Sample Output

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

> In Express, `status` and `duration` are recorded after `res.finish` and reflect the actual response.

---

## Next.js

Create `middleware.ts` at the project root (or `src/middleware.ts`):

```typescript
import { createCipherLogger } from "cipher-logger";
import type { NextRequest } from "next/server";

const cipher = createCipherLogger({
  fields: {
    ip: true,
    userAgent: true,
    host: true,
    query: true,
  },
  level: "info",
});

export function middleware(request: NextRequest) {
  return cipher.next()(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
```

Or more concisely:

```typescript
import { createCipherLogger } from "cipher-logger";

const cipher = createCipherLogger({
  fields: { ip: true, userAgent: true },
});

export default cipher.next();

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
```

> **Note:** Next.js middleware runs before the route handler, so `status` and `duration` reflect the middleware execution, not the final route response. Route handler wrappers for more accurate logging are planned for future releases.

---

## Fastify

Register the Fastify-compatible middleware returned by `cipher.fastify()` using `addHook`:

```typescript
import fastify from "fastify";
import { createCipherLogger } from "cipher-logger";

const app = fastify();

const cipher = createCipherLogger({ fields: { ip: true, userAgent: true, query: true },
  level: "info",
});

// Register before your routes
app.addHook("onRequest", cipher.fastify());

app.get("/", async () => ({ hello: "world" }));

app.listen({ port: 3000 });
```

## NestJS

Use the Express-compatible middleware in Nest's runtime (works when Nest is using the Express platform):

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { createCipherLogger } from "cipher-logger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cipher = createCipherLogger({ fields: { ip: true, userAgent: true } });

  // Mount as global middleware
  app.use(cipher.nest());

  await app.listen(3000);
}

bootstrap();
```

## Hono

Mount the Hono middleware using `app.use` (works on edge and Node runtimes):

```typescript
import { Hono } from "hono";
import { createCipherLogger } from "cipher-logger";

const app = new Hono();

const cipher = createCipherLogger({ fields: { ip: true, userAgent: true } });

// Mount for all routes
app.use("*", cipher.hono());

app.get("/", (c) => c.text("ok"));

app.listen({ port: 3000 });
```

---

## Log Schema

### Required Fields

Always included in every HTTP log:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (UUID) |
| `type` | `"http"` | Log type |
| `timestamp` | `string` | ISO 8601 timestamp |
| `method` | `string` | HTTP method |
| `path` | `string` | Request path |
| `status` | `number` | HTTP status code |
| `duration` | `number` | Duration in milliseconds |

### Optional Fields

Enabled via the `fields` config:

| Field | Type | Description |
|-------|------|-------------|
| `ip` | `string` | Client IP address |
| `userAgent` | `string` | User-Agent header |
| `referer` | `string` | Referer header |
| `protocol` | `string` | Protocol (`http` / `https`) |
| `host` | `string` | Host header |
| `query` | `Record<string, string>` | Query string parameters |
| `requestId` | `string` | From `x-request-id` header |
| `metadata` | `Record<string, unknown>` | Custom metadata |

---

## API Reference

### `createCipherLogger(config?)`

Creates a Cipher Logger instance.

```typescript
const cipher = createCipherLogger(config);
```

**Methods:**

| Method | Description |
|--------|-------------|
| `cipher.logRequest(input)` | Manually log an HTTP request |
| `cipher.express()` | Returns Express middleware |
| `cipher.next()` | Returns Next.js middleware |

### `Logger`

Base logging class (independent of HTTP):

```typescript
import { Logger } from "cipher-logger";

const logger = new Logger({ level: "info", prefix: "app" });

logger.info("Server started");
logger.warn("Deprecated API used", { route: "/old" });
logger.error("Unhandled error", { err: "..." });
logger.debug("Debug info");
```

---

## Architecture

```
cipher-logger/
├── src/
│   ├── core/           # Core — field config & log building
│   │   ├── logger.ts
│   │   ├── types.ts
│   │   ├── build-request-log.ts
│   │   └── create-cipher-logger.ts
│   ├── express/        # Express adapter
│   │   └── middleware.ts
│   ├── next/           # Next.js adapter
│   │   └── middleware.ts
│   └── index.ts        # Public entry point
```

---

## Local Development

```bash
git clone https://github.com/cipherunits/CipherLogger.git
cd CipherLogger
pnpm install
pnpm run build
```

---

## Contributing

Contributions are welcome and appreciated.

### Report a Bug or Request a Feature

1. Check [Issues](https://github.com/cipherunits/CipherLogger/issues) first
2. If no existing issue matches, open a new one with a clear description

### Submit a Pull Request

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add something useful"`
4. Push the branch: `git push origin feature/my-feature`
5. Open a Pull Request

### Guidelines

- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
- Run `pnpm run build` before submitting a PR
- Keep changes focused and scoped
- Update the README for any API changes

### Contact

- **GitHub Issues:** https://github.com/cipherunits/CipherLogger/issues
- **Organization:** https://github.com/cipherunits

---

## License

MIT © Cipher Unit
