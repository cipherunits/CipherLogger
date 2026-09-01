import { defineConfig } from "tsup";
export default defineConfig({
  format: ["cjs", "esm"],
  entry: { index: "./src/index.ts" },
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  tsconfig: "./tsconfig.json",
});