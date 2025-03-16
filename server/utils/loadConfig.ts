import path from "path";
import { pathToFileURL } from "url";

export default async function loadConfig() {
  const configPath = path.join(process.cwd(), "irc.config.cjs");
  try {
    const fileUrl = pathToFileURL(configPath).toString();
    const config = await import(fileUrl);
    return config.default || config;
  } catch (error) {
    console.error("Error loading config:", error);
    return {};
  }
}
