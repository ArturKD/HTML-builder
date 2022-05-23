/*---------------------------exports--------------------------*/
const fs = require('fs');
const path = require('path');


/*---------------------------variables--------------------------*/
const copyFromPath = path.join(__dirname, 'files');
const copyToPath = path.join(__dirname, 'files-copy');


/*---------------------------functions--------------------------*/
fs.access(copyToPath, (err) => {
  if (err) fs.promises.mkdir(copyToPath);
  console.log('Copied');
});
async function copyDir(copyFromPath, copyToPath){
  await fs.promises.rm(copyToPath, { force: true, recursive: true });
  await fs.promises.mkdir(copyToPath, { recursive: true });
  const filesArray = await fs.promises.readdir(copyFromPath, { withFileTypes: true });
  for (let singleFile of filesArray) {
    const singleFileName = singleFile.name;
    const singleFileCurrentPath = path.resolve(copyFromPath, singleFileName);
    const singleFileDestinationPath = path.resolve(copyToPath, singleFileName);
    if (singleFile.isDirectory()) {
      await fs.promises.mkdir(singleFileDestinationPath, { recursive: true });
      await copyDir(singleFileCurrentPath, singleFileDestinationPath);
    } else {
      await fs.promises.copyFile(singleFileCurrentPath, singleFileDestinationPath);
    }
  }
}
copyDir(copyFromPath, copyToPath);
