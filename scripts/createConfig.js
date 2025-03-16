import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configFileName = 'irc.config.cjs';
const configTemplatePath = path.join(__dirname, '../irc.config.cjs');

let projectRoot = process.env.INIT_CWD; // Use INIT_CWD as the primary method

if (projectRoot) {
  const projectConfigPath = path.join(projectRoot, configFileName);

  if (!fs.existsSync(projectConfigPath)) {
    fs.copyFileSync(configTemplatePath, projectConfigPath);
    console.log(`Created ${configFileName} in your project root. Please configure it as needed.`);
  } else {
    console.log(`${configFileName} already exists. Skipping creation.`);
  }
} else {
  console.log('Could not automatically create the config file. Please run "npm run create-config" in your project root after installation.');
}