---
name: cipher-logger
description: >
  Guidance for correct usage of the `cipher-logger` package (npm: cipher-logger,
  organization: cipherunits) — an HTTP logging library for Node.js used with Express
  and Next.js. Activate this skill whenever a user wants request logging, error
  logging, middleware logs, or basic observability added to an Express or Next.js
  project (especially cipherunits projects like rayyan-backend, Mananegar, Setad
  Mahalle, Fusion GUI), or when imports of "cipher-logger" or `createCipherLogger`
  are detected in code. Also use this skill to review/debug code that uses
  cipher-logger (for example, incorrect status/duration in Next.js middleware or
  optional fields not being logged) — even if the user simply asks "set up a
  logger" or "add request logging" without naming the package.
---

# Cipher Logger — Agent Skill

This skill is the official reference for installing, configuring, and correctly
using **cipher-logger** — a lightweight, production-ready HTTP logging library
for Node.js (organization: `cipherunits`, repository: `github.com/cipherunits/CipherLogger`).
Important: do not assume the API based on similarity to winston/pino/morgan — use
the exact API documented here.

## Golden Rule

cipher-logger has three distinct parts that must not be mixed:

1. **`Logger`** — the base application logger class (independent of HTTP). Use for
  `logger.info/warn/error/debug`.
2. **`createCipherLogger(config)`** — factory that creates the main instance,
  configures optional fields and level, and exposes `.express()`, `.next()`, and
  `.logRequest()`.
3. **Framework adapters** (`cipher.express()` and `cipher.next()`) — ready-made
  middleware; mount them rather than writing manual request logging.

If the user only asks to "log requests", they usually need steps 2 and 3, not 1.

## Installation

```bash
pnpm add cipher-logger
# Framework packages are peer dependencies:
pnpm add express   # if using Express
pnpm add next      # if using Next.js
```

Node.js 18+ is required. Install only the peer dependency actually used by the
project (e.g., `express` or `next`).

## Quick Decision Map

| Project type | What to mount/call |
|---|---|
| Express API (e.g. rayyan-backend if the backend is Node) | `cipher.express()` mounted before routes |
| Next.js (e.g. Setad Mahalle, Mananegar) | `middleware.ts` using `cipher.next()` |
| Manual non-HTTP event logging | `new Logger({...})` and `.info/.warn/.error/.debug` |
| Manual request logging (e.g. inside a job/cron) | `cipher.logRequest(input)` |

## Usage Steps (Summary)

1. Create a logger with `createCipherLogger({ fields: {...}, level: "info", prefix: "..." })` —
  enable only the fields the user actually needs; all optional fields default to `false`.
2. For Express: mount `app.use(cipher.express())` **before** route definitions, otherwise
  status/duration will be incorrect because the middleware must observe the request.
3. For Next.js: use `cipher.next()` in `middleware.ts` (or `src/middleware.ts`) and
  always restrict `config.matcher` to exclude static/image routes to avoid noisy logs.
4. For more detailed guidance, read the related skill files below — only open the
  section relevant to the user's request:
  - `skills/fusion-references/SKILL.md` — configuration options and optional fields
  - `skills/fusion-express-integration/SKILL.md` — Express integration and sample output
  - `skills/fusion-nextjs-integration/SKILL.md` — Next.js middleware and the important
    status/duration limitation
  - `skills/fusion-log-schema/SKILL.md` — full log schema (required/optional fields)
  - `skills/fusion-api-reference/SKILL.md` — function/class signatures and TypeScript exports
  - `skills/fusion-architecture/SKILL.md` — internal package structure (for debugging/contrib)

## Common Pitfalls (Follow these)

- **Check peer dependencies**: If the project is Express but `express` is not installed
  (or vice versa), a runtime error will occur. Check `package.json` before suggesting code.
- **Default `level` is `"debug"`**, not `"info"` — in production `"info"` is usually
  more appropriate; set it explicitly in config instead of relying on the package default.
- **In Next.js middleware, `status` and `duration` reflect the middleware's execution, not
  the final route response** (because middleware runs before route handlers). Remind the
  user of this when they expect the actual response status — route-handler wrappers are
  planned for future versions but are not available now.
- **In Express the opposite is true**: `status` and `duration` are recorded after `res.finish`
  and therefore reflect the real response — explain this difference when comparing adapters.
- **Optional fields are off by default**; the user must explicitly enable `ip`, `userAgent`,
  `query`, etc.
- **This package is lightweight** — don't recommend adding heavy log frameworks like
  winston/pino unless the user specifically asks; the package is intended to be minimal.
- **Exclude static routes in Next.js matcher** (example: `/((?!_next/static|_next/image|favicon.ico).*)`) to
  avoid excessive noisy logs.

## Before Suggesting Code

1. Check whether the project is Express or Next.js (via `package.json` or folder structure).
2. If `middleware.ts` already exists, merge the new code instead of replacing it (it may
  contain other middleware like auth or i18n).
3. If the project is a monorepo (e.g. Mananegar), determine which workspace/app the
  package should be installed into, not necessarily the monorepo root.

