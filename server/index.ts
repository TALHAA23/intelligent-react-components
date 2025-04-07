import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import chokidar from "chokidar";
import catchAll from "./routesHandler/catchall.js";
import processPromptAndCreateFile from "./routesHandler/processPromptCreateFile.js";
import watcher from "./utils/watcher.js";
import log from "./utils/cliColoredLog.js";
import path from "path";
import loadConfig from "./utils/loadConfig.js";
// import instructionHandler from "./lib/instructionSelector.js";

const setCookies = (req: Request, res: Response, next: NextFunction) => {
  res.cookie("port", "3000", { httpOnly: true });
  next();
};

const app = express();
app.use(setCookies);
app.use(cors({ origin: "*" }));
app.use(express.json());
app.post("/prompt-to-code", setCookies, processPromptAndCreateFile);
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
      log("Running on: ", `http://localhost:${port}/`, "\n").info();
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
