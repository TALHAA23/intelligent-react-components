import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
// import eslint from "vite-plugin-eslint";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { libInjectCss } from "vite-plugin-lib-inject-css";
export default defineConfig({
  // publicDir: resolve(import.meta.dirname, "public"),
  build: {
    lib: {
      // entry: "./src/index.ts", // Specifies the entry point for building the library.
      entry: resolve(__dirname, "./src/index.ts"),
      name: "irc", // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)], // Defines external dependencies for Rollup bundling.
    },
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
    watch: {
      // include: ["src/**/*"],
      include: ["**/*"],
    },
  },

  plugins: [
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.json",
      insertTypesEntry: true,
      compilerOptions: {
        baseUrl: import.meta.dirname,
        paths: {
          "@types/*": ["types/*"],
          "@utils/*": ["utils/*"],
          "@public/*": ["public/*"],
          "@hooks/*": ["src/hooks/*"],
        },
      },
    }),
    tsconfigPaths(),
    libInjectCss(),
  ], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
});
