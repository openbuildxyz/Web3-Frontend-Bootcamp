const fs = require("fs");

module.exports = {
  sourcesPath: "./src",
  nodeModulesPath: "./lib",
  remappings: fs
    .readFileSync("remappings.txt", "utf-8")
    .split("\n")
    .filter(Boolean),
};
