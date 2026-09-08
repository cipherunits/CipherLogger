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

**Cipher Logger** is a lightweight, production-ready HTTP logging library for Node.js. It captures every request in **Express**, **Next.js**, **React**, **Vue**, and **Nuxt** applications. You decide exactly which fields appear in each log — required fields are always recorded, optional fields are opt-in.

## Table of Contents
Cipher Logger is a lightweight, production-ready HTTP logging library for Node.js.

Documentation has moved to Zensical (English). Please see the official docs:

- https://zensical.app/cipherunits/CipherLogger

This README no longer contains the full documentation. For examples, API reference, and guides, visit the Zensical docs link above.

For issues or contributions, see the repository issues tab.

License: MIT
┌─────────────────────────────────────────┐
│                  Core                    │
│   fields config → buildRequestLog        │
└──────────────────┬──────────────────────┘
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
   ┌───────────┐       ┌───────────┐
   │  Express  │       │  Next.js  │
   │ middleware│       │ middleware│
   └───────────┘       └───────────┘
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

- **GitHub Issues:** [cipherunits/CipherLogger/issues](https://github.com/cipherunits/CipherLogger/issues)
- **Organization:** [CipherUnits](https://github.com/cipherunits)

---

## License

[MIT](./LICENSE) © Cipher Unit

<p align="center" style="margin-top: 100px;">
  <b><i>Made with ❤️  for developers by CipherUnit</i></b>
</p>