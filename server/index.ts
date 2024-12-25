import * as config from "../irc.config.json"
console.log(config.port)
import express from "express";
import cors from "cors";
import chokidar from "chokidar";
import catchAll from "./routesHandler/catchall.js";
import processPromptAndCreateFile from "./routesHandler/processPromptCreateFile.js";
import watcher from "./utils/watcher.js";
import log from "./utils/cliColoredLog.js";
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.post("/prompt-to-code", processPromptAndCreateFile);

app.get("*", catchAll);

app.listen(5173, () => {
  log("Running on: ", `http://localhost:5173/`, "\n").info();
  // ? For development
  // chokidar.watch("D:/nextjs-genkit/dynamic").on("all", watcher);
  // ! For Production
  chokidar.watch("../../../../dynamic").on("all", watcher);
});
