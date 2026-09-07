# Architecture Reference

Only when the user needs to modify the CipherLogger package itself (not a project
that uses it) — for example, bug fixes, adding a new optional field, or writing an
adapter for another framework (like Fastify or Hono).

## Folder structure

```
cipher-logger/
├── src/
│   ├── core/           # core — field configuration and log construction
│   │   ├── logger.ts
│   │   ├── types.ts
│   │   ├── build-request-log.ts
│   │   └── create-cipher-logger.ts
│   ├── express/         # Express adapter
│   │   └── middleware.ts
│   ├── next/            # Next.js adapter
│   │   └── middleware.ts
│   └── index.ts          # public entry point
```

## Data flow

```
              Core
   fields config → buildRequestLog
              │
    ┌─────────┴─────────┐
    ▼                   ▼
 Express             Next.js
middleware           middleware
```

Both adapters (`express/middleware.ts` and `next/middleware.ts`) rely on the
same `buildRequestLog` core — only the extraction of request/response fields from
the framework differs. The difference in `status`/`duration` behavior between the
two adapters stems from how each adapter calls the core, not from `buildRequestLog`
itself.

## Local development

```bash
git clone https://github.com/cipherunits/CipherLogger.git
cd CipherLogger
pnpm install
pnpm run build
```

## Adding a new adapter (e.g. Fastify)

Create a new file such as `src/fastify/middleware.ts` that calls the same
`buildRequestLog` from `core/build-request-log.ts` and only differs in how fields
are extracted from the framework — do not reimplement the log-construction logic
inside the new adapter.

## Contribution rules (from README)

- Commits must follow [Conventional Commits](https://www.conventionalcommits.org/)
- Run `pnpm run build` before opening a PR
- Keep changes focused and small
- Update README for any API changes
- License: MIT © Cipher Unit
