import { RouteHandler } from "../types/index.js";

const catchAll: RouteHandler = (req, res) => {
  console.log(req.url);
  res.status(404).send("Not Found");
};

export default catchAll;
