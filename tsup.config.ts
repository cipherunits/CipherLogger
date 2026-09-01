import { defineConfig } from "tsup";
import { cpSync, mkdirSync } from "node:fs";
import { join } from "node:path";

function copyTemplates() {
  const from = join(__dirname, "src", "templates");
  const to = join(__dirname, "dist", "templates");
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

export default defineConfig([
  {
    format: ["cjs", "esm"],
    entry: { index: "./src/index.ts" },
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    tsconfig: "./tsconfig.json",
  },
  {
    format: ["cjs"],
    entry: { "bin/cli": "./src/bin/cli.ts" },
    shims: true,
    skipNodeModulesBundle: true,
    clean: false,
    banner: {
      js: "#!/usr/bin/env node",
    },
    tsconfig: "./tsconfig.json",
    onSuccess: async () => {
      copyTemplates();
    },
  },
]);