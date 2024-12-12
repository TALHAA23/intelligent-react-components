import express from "express";
import cors from "cors";
import chokidar from "chokidar";
import catchAll from "./routesHandler/catchall.js";
import processPromptAndCreateFile from "./routesHandler/processPromptCreateFile.js";
import watcher from "./utils/watcher.js";
import log from "./utils/cliColoredLog.js";
import createFile from "./utils/createFile.js";
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.post("/prompt-to-code", processPromptAndCreateFile);
app.post("/create-file", () => {
  createFile(() => {
    console.log("hello world");
  }, "somefile");
});
app.get("*", catchAll);

app.listen(5173, () => {
  log("Running on: ", `http://localhost:5173/`, "\n").info();
  chokidar.watch("D:/nextjs-genkit/dynamic").on("all", watcher);
});
