/*---------------------------exports--------------------------*/
const fs = require('fs');
const path = require('path');

/*---------------------------variables--------------------------*/
const htmlOriginPath = path.resolve(__dirname, 'template.html');
const htmlComponentsPath = path.resolve(__dirname, 'components');
const cssComponentsPath = path.resolve(__dirname, 'styles');
const assetsOriginPath = path.resolve(__dirname, 'assets');
const projectDistPath = path.resolve(__dirname, 'project-dist');
const htmlDistPath = path.resolve(projectDistPath, 'index.html');
const cssDistPath = path.resolve(projectDistPath, 'style.css');
const assetsDistPath = path.resolve(projectDistPath, 'assets');


/*---------------------------functions--------------------------*/
function createDir(path) {
  fs.access(projectDistPath, (error) => {
    if (error) fs.promises.mkdir(path);
  });
}

async function mergeStyles() {
  const bundleArray = [];
  const filesArray = await fs.promises.readdir(cssComponentsPath, { withFileTypes: true });
  for (let singleFile of filesArray) {
    const singleFileName = singleFile.name;
    const singleFilePath = path.resolve(cssComponentsPath, singleFileName);
    const singleFileType = path.extname(singleFilePath);
    if (singleFileType === '.css') {
      const singleFileContent = await fs.promises.readFile(singleFilePath, 'utf8');
      bundleArray.push(singleFileContent);
    }
  }
  await fs.promises.writeFile(cssDistPath, bundleArray);
}

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

async function mergeComponents() {
  let template = await fs.promises.readFile(htmlOriginPath, 'utf-8');
  const filesArray = await fs.promises.readdir(htmlComponentsPath, { withFileTypes: true });
  for (let singleFile of filesArray) {
    const singleFileFullName = singleFile.name;
    const singleFileName = singleFileFullName.split('.')[0];
    const componentContent = await fs.promises.readFile(path.resolve(htmlComponentsPath, singleFileFullName), 'utf-8');
    const singleFileInHtml = new RegExp(`{{${singleFileName}}}`, 'g');
    template = template.replace(singleFileInHtml, componentContent);
  }
  fs.promises.writeFile(htmlDistPath, template);
}

(async () => {
  await createDir(projectDistPath);
  await mergeComponents();
  await mergeStyles();
  await copyDir(assetsOriginPath, assetsDistPath);

})();