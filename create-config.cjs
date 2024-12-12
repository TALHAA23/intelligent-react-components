const fs = require("fs");
const path = require("path");

const configContent = `
const ricConfig = {
  server:{
  port:5173
  }
};

module.exports = ricConfig;
`;
// ! Production code - Do not delete
// const configFilePath = path.join(process.cwd(), "ric.config.cjs");
// ! ----------------------------------------------------------------
// ? Only for development
// test env's
const paths = [
  path.resolve(process.cwd(), "../nextjs-genkit/ric.config.cjs"),
  path.resolve(process.cwd(), "../Projects/Quizzical/ric.config.cjs"),
  path.resolve(process.cwd(), "./ric.config.cjs"),
];
paths.map((p) => fs.writeFileSync(p, configContent));

// console.log("Configuration file created at:", configFilePath);
