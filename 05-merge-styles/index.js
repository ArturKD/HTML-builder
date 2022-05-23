/*---------------------------exports--------------------------*/
const fs = require('fs');
const path = require('path');

/*---------------------------variables--------------------------*/
const bundleFromPath = path.join(__dirname, 'styles');
const destinationPath = path.join(__dirname, 'project-dist', 'bundle.css');
const bundleArray = [];

/*---------------------------functions--------------------------*/
(async () => {
  const filesArray = await fs.promises.readdir(bundleFromPath, { withFileTypes: true });
  for (let singleFile of filesArray) {
    const singleFileName = singleFile.name;
    const singleFilePath = path.resolve(bundleFromPath, singleFileName);
    const singleFileType = path.extname(singleFilePath);
    if (singleFileType === '.css') {
      const singleFileContent = await fs.promises.readFile(singleFilePath, 'utf8');
      bundleArray.push(singleFileContent);
    }
  }
  await fs.promises.writeFile(destinationPath, bundleArray);
})();