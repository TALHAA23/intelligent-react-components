import express from "express";
import cors from "cors";
import catchAll from "./routesHandler/catchall.js";
import processPromptAndCreateFile from "./routesHandler/processPromptCreateFile.js";
import loadConfig from "./utils/loadConfig.js";
import CLI from "./utils/chalk.js";
// import chokidar from "chokidar";
// import path from "path";
// import watcher from "./utils/watcher.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.post("/prompt-to-code", processPromptAndCreateFile);
app.get("*", catchAll);

app.listen(async () => {
  try {
    const configs = await loadConfig();
    const port = configs.PORT || 7070; // Use the config's PORT or default
    // await instructionHandler({
    //   prompt: "supabase auth insert",
    //   filename: "",
    //   listener: "onSubmit",
    //   element: "form",
    // });
    // return;
    app.listen(port, () => {
      // Listen on the determined port
      CLI.print(CLI.bold(`Listening on: http://localhost:${port}/`, "green"));
      // const rootDir = process.cwd();
      // chokidar.watch(path.resolve(rootDir, "dynamic")).on("all", watcher);
    });
  } catch (error) {
    console.error("Error loading configuration:", error);
    const port = 5173; //use default port
    app.listen(port, () => {
      CLI.print(CLI.bold(`Listening on: http://localhost:${port}/`, "green"));
      // const rootDir = process.cwd();
      // chokidar.watch(path.resolve(rootDir, "dynamic")).on("all", watcher);
    });
  }
});
