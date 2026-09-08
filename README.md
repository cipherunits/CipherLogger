<p align="center">
  <img
    src="./assets/cipherlogger_logo_mono.png"
    alt="Fusion Snippet"
    width="120"
    style="border-radius: 18px;"
  />
</p>

<h1 align="center">Cipher Logger</h1>


<p align="center">
  <strong>See every request. Capture every error. Understand your application.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/cipher-logger"><img src="https://img.shields.io/npm/v/cipher-logger.svg" alt="npm version"></a>
  <a href="https://github.com/cipherunits/CipherLogger/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-BSD--3--Clause-blue.svg" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg" alt="node version"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-ready-3178C6.svg" alt="typescript"></a>
</p>

---

**Cipher Logger** is a lightweight, production-ready HTTP request logging library for Node.js. It captures every request in your app — **Express**, **Next.js**, and more frameworks on the way — with full control over which fields get logged.

## Highlights

- **TypeScript-first**, fully typed API
- **Configurable fields** — required fields always logged, optional fields opt-in
- **Framework adapters** for Express and Next.js, with more in progress
- **Zero heavy dependencies** — only your framework as an optional peer dependency
- **Node.js 18+**

## Installation

```bash
npm install cipher-logger
# or
pnpm add cipher-logger
# or
yarn add cipher-logger
```

## Quick Start

```ts
import { createCipherLogger } from "cipher-logger";

const cipher = createCipherLogger({
  fields: { ip: true, userAgent: true, query: true },
  level: "info",
});

app.use(cipher.express());
```

## Documentation

Full documentation — configuration reference, framework guides (Express, Next.js, and upcoming adapters), log schema, API reference, and architecture — lives on the docs site:

**[docs.cipherunit.xyz](https://cipherunits.github.io/CipherLogger/)**

## Contributing

Contributions are welcome.

1. Check [open issues](https://github.com/cipherunits/CipherLogger/issues) before opening a new one
2. Fork the repo and create a branch: `git checkout -b feature/my-feature`
3. Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
4. Run `pnpm run build` before submitting
5. Open a Pull Request

See the [full contributing guide](https://docs.cipherunit.xyz/contributing) on the docs site for details.

## License

[BSD-3-Clause](./LICENSE) © [Cipher Unit](https://cipherunit.xyz)

<p align="center" style="margin-top: 100px;">
  <b><i>Made with ❤️  for developers by CipherUnits</i></b>
</p>