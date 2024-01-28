const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = (exceptions = []) => {
  let dropdowns = [];
  const dropdownFiles = getAllFiles(path.join(__dirname, "..", "dropdowns"));

  for (const dropdownFile of dropdownFiles) {
    const dropdownObject = require(dropdownFile);

    if (exceptions.includes(dropdownObject.name)) continue;
    dropdowns.push(dropdownObject);
  }

  return dropdowns;
};
