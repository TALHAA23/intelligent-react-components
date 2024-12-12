# Project setup spec

[//]: # "Title: Prompt Engineering"
[//]: # "Author: Talha Sifat"
[//]: # "Type: Spec"
[//]: # "Date: 2024-09-20"
[//]: # "From Sprint Number: 1"
[//]: # "Task title: Project setup"

This document includes details about the environment in which the project will be developed. It covers everything needed to get started, including information on each external library and configuration required.

## Tools and libraries

Here's a table outlining the tools and libraries used in the project, along with their respective versions:

| **Tool/Library**          | **Version** |
| ------------------------- | ----------- |
| VS Code                   | null        |
| Node.js                   | 22.1.0      |
| pnpm                      | 9.9.0       |
| @eslint/eslintrc          | 3.1.0       |
| @eslint/js                | 9.10.0      |
| @testing-library/jest-dom | 6.5.0       |
| @testing-library/react    | 16.0.1      |
| @types/react              | 18.3.5      |
| eslint                    | 9.10.0      |
| eslint-plugin-react       | 7.35.2      |
| React                     | 18.3.1      |
| globals                   | 15.9.0      |
| jsdom                     | 25.0.0      |
| TypeScript                | 5.5.4       |
| typescript-eslint         | 8.4.0       |
| Vite                      | 5.4.3       |
| vite-plugin-dts           | 4.1.1       |
| vite-plugin-eslint        | 1.8.1       |
| Vitest                    | 2.0.5       |
| @google/generative-ai     | 0.19.0      |
| @types/chokidar           | 2.1.3       |
| @types/cors               | 2.8.17      |
| @types/express            | 4.17.21     |
| @types/node               | 22.5.4      |
| chokidar                  | 3.6.0       |
| cors                      | 2.8.5       |
| dotenv                    | 16.4.5      |
| express                   | 4.19.2      |

This table provides a comprehensive overview of the development environment and dependencies for the project.

## Setting environment for component library

<aside>
💡

Create a directory and open it in an editor such as VS Code. Then, open a terminal in the editor (PowerShell, for instance).

</aside>

Begin by initializing both the Git repository and the npm project:

```powershell
git init
npm init -y
```

This snippet initializes two important aspects of the project:

- **git init:** Initializes a new Git repository in the current directory, enabling version control for the project.
- **npm init -y:** Creates a new Node.js project by generating a package.json file with default values. The -y flag automatically answers 'yes' to all prompts, creating a basic configuration.

## About dependencies and installation

Install all the dependencies in one go, The first snippet installs dev dependencies while the second one installs dependencies

```powershell
pnpm add -D \
  "@eslint/eslintrc@3.1.0" \
  "@eslint/js@9.10.0" \
  "@testing-library/jest-dom@6.5.0" \
  "@testing-library/react@16.0.1" \
  "@types/react@18.3.5" \
  "eslint@9.10.0" \
  "eslint-plugin-react@7.35.2" \
  "globals@15.9.0" \
  "jsdom@25.0.0" \
  "typescript@5.5.4" \
  "typescript-eslint@8.4.0" \
  "vite@5.4.3" \
  "vite-plugin-dts@4.1.1" \
  "vite-plugin-eslint@1.8.1" \
  "vitest@2.0.5"
```

```powershell
pnpm add \
  "@google/generative-ai@0.19.0" \
  "@types/chokidar@2.1.3" \
  "@types/cors@2.8.17" \
  "@types/express@4.17.21" \
  "@types/node@22.5.4" \
  "chokidar@3.6.0" \
  "cors@2.8.5" \
  "dotenv@16.4.5" \
  "express@4.19.2"
```

**Development Dependencies:**

- **@eslint/eslintrc:** This package provides configuration for ESLint, a popular linter for JavaScript code. It helps enforce consistent coding styles and identify potential errors or issues.
- **@eslint/js:** This package contains core ESLint rules for JavaScript syntax and best practices. It works in conjunction with other ESLint plugins to provide comprehensive linting capabilities.
- **@testing-library/jest-dom:** This package extends Jest's DOM testing library with custom assertions for common DOM interactions and elements. It makes writing tests for React components easier and more expressive.
- **@testing-library/react:** This package provides a set of React-specific testing utilities that focus on querying DOM elements and simulating user interactions. It helps write more reliable and maintainable tests for React applications.
- **@types/react:** This package provides TypeScript type definitions for React, allowing you to use TypeScript with React projects and benefit from its type safety features.
- **eslint:** This is the main ESLint package that provides the linting engine and core functionality. It integrates with various plugins and configuration files to enforce coding standards.
- **eslint-plugin-react:** This ESLint plugin provides rules specific to React, helping ensure that your React code adheres to best practices and avoids common pitfalls.
- **globals:** This package provides a way to define global variables in your TypeScript projects, making it easier to work with libraries or frameworks that rely on global variables.
- **jsdom:** This package creates a simulated DOM environment in Node.js, allowing you to run browser-based tests without a real browser. It's essential for testing JavaScript code that interacts with the DOM.
- **typescript:** This is a statically typed superset of JavaScript that adds optional types to your code. It helps catch errors earlier in the development process and improves code maintainability.
- **typescript-eslint:** This package integrates ESLint with TypeScript, providing linting rules and support for TypeScript-specific syntax and features.
- **vite:** This is a modern frontend build tool that offers fast development server performance and efficient bundling. It's a popular choice for building React and other frontend applications.
- **vite-plugin-dts:** This Vite plugin generates TypeScript declaration files (d.ts) for your project, making it easier to use your code with TypeScript in other projects.
- **vite-plugin-eslint:** This Vite plugin integrates ESLint with your Vite development setup, allowing you to automatically lint your code as you save changes.
- **vitest:** This is a testing framework for JavaScript that uses Vite's bundling and performance features. It's a good alternative to Jest for projects using Vite.

**Normal Dependencies:**

- **@google/generative-ai:** This package provides access to Google's generative AI models and APIs, allowing you to leverage their capabilities in your applications.
- **@types/chokidar:** This package provides TypeScript type definitions for the Chokidar library, which is used for watching file system changes.
- **@types/cors:** This package provides TypeScript type definitions for the CORS library, which is used for handling Cross-Origin Resource Sharing (CORS) requests.
- **@types/express:** This package provides TypeScript type definitions for the Express.js web framework, making it easier to write type-safe Express applications.
- **@types/node:** This package provides TypeScript type definitions for the Node.js runtime environment, allowing you to use TypeScript with Node.js projects.
- **Chokidar:** This library monitors file system changes in Node.js, which is useful for tasks like rebuilding assets or reloading the development server when files are modified.
- **cors:** This library handles CORS requests in Node.js applications, allowing you to control which domains can access your API.
- **dotenv:** This library is used for loading environment variables from a `.env` file into your Node.js application, making it easier to manage configuration and secrets.
- **express:** This is a popular web framework for Node.js that provides a robust and flexible way to build web applications and APIs.

## Manual configuration

To format the project, add the following script in `package.json` :

```json
{
  ...
  "scripts": {
     "format": "prettier --write --parser typescript '**/*.{ts,tsx}'"
  },
  ...
}

```

Create a `.gitignore` file in the root directory and add the following:

```jsx
node_modules;
dist;
```

Create a file named `tsconfig.json` and config it

```json
{
  "compilerOptions": {
    "target": "ES5", // Specifies the JavaScript version to target when transpiling code.
    "useDefineForClassFields": true, // Enables the use of 'define' for class fields.
    "lib": ["ES2020", "DOM", "DOM.Iterable"], // Specifies the libraries available for the code.
    "module": "ESNext", // Defines the module system to use for code generation.
    "skipLibCheck": true, // Skips type checking of declaration files.
    "allowJs": true,
    "types": ["vite/client"],
    /* Bundler mode */
    "moduleResolution": "bundler", // Specifies how modules are resolved when bundling.
    "allowImportingTsExtensions": true, // Allows importing TypeScript files with extensions.
    "resolveJsonModule": true, // Enables importing JSON modules.
    "isolatedModules": true, // Ensures each file is treated as a separate module.
    "noEmit": true, // Prevents TypeScript from emitting output files.
    "jsx": "react-jsx", // Configures JSX support for React.

    /* Linting */
    "strict": true, // Enables strict type checking.
    "noUnusedLocals": true, // Flags unused local variables.
    "noUnusedParameters": true, // Flags unused function parameters.
    "noFallthroughCasesInSwitch": true, // Requires handling all cases in a switch statement.
    "declaration": true, // Generates declaration files for TypeScript.
    "noImplicitThis": false
  },
  "include": [// Specifies the directory to include when searching for TypeScript files
    "src",
    "lib",
    "utils",
    "types",
    "../../../../nextjs-genkit/dynamic" //dynamic files on user directory
  "exclude": ["src/**/__docs__", "src/**/__test__"]
}

```

Create a file named `vite.config.ts` in the root directory and configure it

```tsx
/// <reference types="vitest" />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import eslint from "vite-plugin-eslint";
import generateFilesPlugin from "./lib/vite-plugin-generate-files";
export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts", // Specifies the entry point for building the library.
      name: "intelligent-react-components", // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)], // Defines external dependencies for Rollup bundling.
    },
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
    watch: {
      // trigger build of file change
      include: ["src/**/*"], // files which trigger build on change
      buildDelay: 500,
    },
  },
  plugins: [dts(), eslint(), generateFilesPlugin()],
  // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
  // eslint for vite linting
  // generateFilesPlugin a custom plugin
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
  },
});
```

The line `/// <reference types="vitest" />` at the top of the file is used to **include type definitions for the Vitest testing framework**. This enables TypeScript's type checking and autocompletion features to work correctly when using Vitest in your project.

Once again Add this configuration to `package.json` as it defines the entry points and types definitions with the build script.

```json
{
  ...
  "type": "module",
  "main": "dist/index.cjs.js",
  "module": "dist/index.es.js",
  "types": "dist/index.d.ts",
  "files": [
    "/dist"
  ],
  "scripts":{
   ...
   "build": "tsc && vite build",
  }
}
```

Here, `"main"` and `"module"` are used to specify the entry points for different module systems in JavaScript.

1. The `"main"` field is used to specify the entry point for CommonJS modules. It typically points to a file with the extension `.cjs.js` or `.js`. When a package is required using `require()` in Node.js or bundled with tools like Webpack or Vite, the `"main"` entry point is used.
2. The `"module"` field is used to specify the entry point for ES modules. It typically points to a file with the extension `.es.js` or `.mjs`. When a package is imported using `import` in modern JavaScript environments that support ES modules, the `"module"` entry point is used.

By specifying both `"main"` and `"module"` fields in the package.json, we can provide compatibility for both CommonJS and ES module systems.

## NPM scripts

```powershell
npm run dev
```

```powershell
npm run build
```

```powershell
npm run test
```

---

This document serves as a blueprint for future contributors to understand the project's setup and ensure consistency throughout development.
