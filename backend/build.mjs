import { build } from "esbuild";
import { rm } from "fs/promises";

await rm("dist", { recursive: true, force: true });

await build({
  entryPoints: ["src/index.ts"],
  platform: "node",
  bundle: true,
  format: "cjs",
  outfile: "dist/index.cjs",
  define: { "process.env.NODE_ENV": '"production"' },
  minify: true,
  external: ["pg-native"],
  logLevel: "info",
});

console.log("Build complete!");
