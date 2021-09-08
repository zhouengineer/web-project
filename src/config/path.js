import { globbySync } from "globby";
const htmlArray = globby.sync([path.join(resolveApp("public"), "/*.html")]);

module.exports = {
  htmlArray,
};
