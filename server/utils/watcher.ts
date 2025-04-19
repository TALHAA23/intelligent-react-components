import { resolve } from "path";
import { build } from "vite";
import CLI from "./chalk.js";
let TIMEOUT_ID: undefined | NodeJS.Timeout = undefined;
const BUILD_CONFIG_FILE = resolve(
  import.meta.dirname,
  "../../../vite.config.prod.ts"
);
function debounce<T extends (eventName: string, currentPath: string) => void>(
  func: T,
  delay: number
): T {
  return function (...args: Parameters<T>) {
    clearTimeout(TIMEOUT_ID);
    TIMEOUT_ID = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  } as T;
}

let initialRender = true;
export default function watcher(eventName: string, currentPath: string) {
  if (initialRender) {
    CLI.print(
      CLI.format(
        "Server is setted to listen for File creation, Change and Delete to keep your space up-to-date",
        "dim"
      )
    );
    initialRender = false;
    return;
  }
  debounce(
    (eventName, currentPath) => {
      CLI.print(
        CLI.format(`\n${eventName} event captured, rebuilding...`, "bgMagenta")
      );
      if (currentPath.includes("dynamic")) {
        build({
          configFile: BUILD_CONFIG_FILE,
        });
      }
    },
    eventName == "change" ? 10000 : 100
  )(eventName, currentPath);
}
