import express from "express";
import cors from "cors";
import chokidar from "chokidar";
import catchAll from "./routesHandler/catchall.js";
import processPromptAndCreateFile from "./routesHandler/processPromptCreateFile.js";
import watcher from "./utils/watcher.js";
import log from "./utils/cliColoredLog.js";
import path from "path";
import loadConfig from "./utils/loadConfig.js";
import instructionHandler from "./lib/instructionSelector.js";
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.post("/prompt-to-code", processPromptAndCreateFile);

app.get("*", catchAll);

// app.listen(5173, async () => {
//   const configs = await loadConfig();
//   const port = configs.PORT || 5173;
//   log("Running on: ", `http://localhost:${port}/`, "\n").info();
//   const rootDir = process.cwd();
//   chokidar.watch(path.resolve(rootDir, "dynamic")).on("all", watcher);
// });

app.listen(async () => {
  // Remove the explicit port here
  try {
    const configs = await loadConfig();
    const port = configs.PORT || 7070; // Use the config's PORT or default

    const i = await instructionHandler("input", [
      "supportingProps",
      "supportingProps.database",
      // "supportingProps.utils",
      "supportingProps.variables",
      "formDefinations",
      "mutation",
      // "callbacks",
      "callbacks.independent",
      // "callbacks.dependent",
      // "mutation",
    ]);
    console.log(i);

    app.listen(port, () => {
      // Listen on the determined port
      log("Running on: ", `http://localhost:${port}/`, "\n").info();
      return;
      const rootDir = process.cwd();
      chokidar.watch(path.resolve(rootDir, "dynamic")).on("all", watcher);
    });
  } catch (error) {
    console.error("Error loading configuration:", error);
    const port = 5173; //use default port
    app.listen(port, () => {
      log("Running on: ", `http://localhost:${port}/`, "\n").info();
      const rootDir = process.cwd();
      chokidar.watch(path.resolve(rootDir, "dynamic")).on("all", watcher);
    });
  }
});
