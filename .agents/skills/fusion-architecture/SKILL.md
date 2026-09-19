# Architecture Reference

Only when the user needs to modify the CipherLogger package itself (not a project
that uses it) — for example, bug fixes, adding a new optional field, or writing an
adapter for another framework.

## Folder structure

```
cipher-logger/
├── src/
│   ├── core/              # field config, Logger, createCipherLogger
│   ├── adapters/
│   │   ├── express/
│   │   ├── next/
│   │   ├── nuxt/
│   │   ├── fastify/
│   │   ├── nest/
│   │   └── hono/
│   ├── index.ts           # core public entry
│   ├── express.ts         # cipher-logger/express
│   ├── next.ts            # cipher-logger/next
│   └── …                  # other subpath entries
```

## Data flow

Core (`buildRequestLog`) is shared. Each adapter only extracts framework-specific
request/response fields. Subpath entries keep peer frameworks out of the main
`cipher-logger` bundle until that adapter is imported or lazy-loaded.

## Local development

```bash
git clone https://github.com/cipherunits/CipherLogger.git
cd CipherLogger
pnpm install
pnpm run build
```

## Adding a new adapter

1. Add `src/adapters/<name>/middleware.ts` that calls `cipher.logRequest(...)`.
2. Add `src/<name>.ts` re-exporting the factory.
3. Register the entry in `tsup.config.ts` and `package.json` `exports`.
4. Wire a lazy method on `createCipherLogger` via `loadAdapter("<name>")`.

## Contribution rules (from README)

- Commits must follow [Conventional Commits](https://www.conventionalcommits.org/)
- Run `pnpm run build` before opening a PR
- Keep changes focused and small
- Update README/docs for any API changes
- License: BSD-3-Clause © Cipher Unit
