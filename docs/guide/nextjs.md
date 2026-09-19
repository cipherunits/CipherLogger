# Next.js

CipherLogger integrates as `middleware.ts` at your project root (or `src/middleware.ts`), and as a route-handler wrapper for accurate status/duration.

## Full setup

```ts
// middleware.ts
import { createCipherLogger } from "cipher-logger";
import { createNextMiddleware } from "cipher-logger/next";
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

const cipherMiddleware = createNextMiddleware(cipher);

export function middleware(request: NextRequest) {
  return cipherMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all routes except static files and images
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
```

## Concise form

```ts
// middleware.ts
import { createCipherLogger } from "cipher-logger";

const cipher = createCipherLogger({
  fields: { ip: true, userAgent: true },
});

export default cipher.next();

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
```

## Accurate route-handler logging

For App Router route handlers, use `withCipherLogger` so `status` and `duration` match the real response:

```ts
// app/api/users/route.ts
import { withCipherLogger } from "cipher-logger/next";
import { createCipherLogger } from "cipher-logger";

const cipher = createCipherLogger({ fields: { ip: true } });

export const GET = withCipherLogger(cipher, async () => {
  return Response.json({ users: [] });
});
```

## Scoping with `matcher`

Use the `matcher` config to avoid logging static assets, prefetches, and other noise. A narrower matcher (e.g. `/api/:path*`) also reduces overhead on high-traffic routes you don't care about.

## Timing caveat

!!! warning "`createNextMiddleware` reflects middleware execution, not the final route response"
    Next.js middleware runs **before** the route handler. Because of this, the `status` and `duration` fields recorded by `createNextMiddleware` / `cipher.next()` describe the middleware's own execution — not what the route handler eventually returns to the client.

    Prefer [`withCipherLogger`](#accurate-route-handler-logging) on App Router handlers when you need accurate response-level logging.

## Next steps

- [Configuration](configuration.md) — every `fields` flag explained
- [Express](express.md) — the adapter with response-accurate `status`/`duration` today
- [Roadmap](../advanced/roadmap.md) — adapter status overview
