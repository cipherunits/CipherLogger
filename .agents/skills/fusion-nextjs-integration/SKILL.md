# Next.js Integration Reference

## Full approach — `middleware.ts` at project root (or `src/middleware.ts`)

```ts
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
    // all paths except static and image files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
```

## Short approach (when no other middleware exists in the project)

```ts
import { createCipherLogger } from "cipher-logger";

const cipher = createCipherLogger({
  fields: { ip: true, userAgent: true },
});

export default cipher.next();

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
```

⚠️ If the project already has `middleware.ts` (for example auth or i18n — like
Mananegar/Setad Mahalle which are multilingual), do not use the short approach; instead
merge the export function with the existing logic using the full method above, because
only one default middleware export is allowed per Next.js project.

## ⚠️ Important limitation — read before explaining status/duration to the user

Next.js middleware runs **before** the route handler. Therefore:

- `status` and `duration` recorded in the logs refer to the **middleware's execution**,
  not the final response returned by the route handler.
- If the user expects the actual API route status code (e.g. 404 or 500 from inside a
  handler) to appear in this log, **that is not possible** with the current package.
- According to the official package docs, a "route handler wrapper for more accurate
  logging" is planned for future versions but is not available now — do not claim
  such an API exists at present.
- If the user needs accurate status/duration for a route, the current solution is to
  manually call `cipher.logRequest(input)` inside the route handler or use the `Logger`
  class (see `skills/fusion-api-reference/SKILL.md`), not the middleware.

## Always restrict the matcher

Without a restricted `matcher`, static requests (`_next/static`, `_next/image`,
`favicon.ico`) will also be logged and produce a lot of noise. Official suggested
pattern:

```ts
matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"];
```

Or restrict to specific paths:

```ts
matcher: ["/api/:path*", "/dashboard/:path*"];
```
