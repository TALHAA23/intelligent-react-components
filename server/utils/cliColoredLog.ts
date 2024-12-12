const reset = "\x1b[0m";
const log = (...args: string[]) => ({
  warning: () => {
    console.log("\n", "\x1b[33m", `${args.join(" ")}`, reset);
  },
  error: () => {
    console.log("\n", "\x1b[31m", `${args.join(" ")}`, reset);
  },
  sucess: () => {
    console.log("\n", "\x1b[32m", `${args.join(" ")}`, reset);
  },
  info: () => {
    console.log("\n", "\x1b[34m", `${args.join(" ")}`, reset);
  },
});
export default log;
