import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const DIRNAME = import.meta.dirname;
const PATHS = {
  base: resolve(DIRNAME, "../../../"),
  src: "./src/index.ts",
  outputDir: "./dist",
  tsconfigPath: resolve(DIRNAME, "./tsconfig.json"),
};
export default defineConfig({
  base: PATHS.base,
  build: {
    lib: {
      entry: resolve(DIRNAME, PATHS.src),
      name: "irc", // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
    },
    outDir: resolve(DIRNAME, PATHS.outputDir),
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: ["react"],
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
      root: DIRNAME,
      insertTypesEntry: true,
      compilerOptions: {
        baseUrl: DIRNAME,
        paths: {
          "@types/*": [resolve(DIRNAME, "./types/*")],
        },
      },
    }),
    tsconfigPaths({
      root: DIRNAME,
    }),
    cssInjectedByJsPlugin()
    // libInjectCss(),
  ], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
});

// ! Version 2 - DO NOT DELETE
// import { defineConfig } from "vite";
// import dts from "vite-plugin-dts";
// import { resolve } from "path";
// import tsconfigPaths from "vite-tsconfig-paths";
// import { libInjectCss } from "vite-plugin-lib-inject-css";

// // const DIRNAME = import.meta.dirname;
// const DIRNAME = resolve(
//   process.cwd(),
//   "./node_modules/intelligent-react-components"
// );
// const PATHS = {
//   base: DIRNAME,
//   src: resolve(DIRNAME, "./src/index.ts"),
//   outputDir: resolve(DIRNAME, "./dist"),
//   tsconfigPath: resolve(DIRNAME, "./tsconfig.json"),
// };
// console.log(PATHS);

// export default defineConfig({
//   base: PATHS.base,
//   publicDir: "public",
//   build: {
//     lib: {
//       entry: PATHS.src,
//       name: "irc", // Sets the name of the generated library.
//       fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
//       formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
//     },
//     outDir: PATHS.outputDir,
//     sourcemap: true,
//     emptyOutDir: true,
//     rollupOptions: {
//       external: ["react"],
//     },
//   },
//   plugins: [
//     dts({
//       rollupTypes: true,
//       root: PATHS.base,
//       insertTypesEntry: true,
//       compilerOptions: {
//         baseUrl: PATHS.base,
//         paths: {
//           "@types/*": [resolve(PATHS.base, "./types/*")],
//         },
//       },
//     }),
//     tsconfigPaths({
//       root: PATHS.base,
//     }),
//     libInjectCss(),
//   ], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
// });
// ! -------------------------------------------------------------------------------
