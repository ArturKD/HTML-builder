/*---------------------------exports--------------------------*/
const path = require('path');
const fs = require('fs');

/*---------------------------functions--------------------------*/
(async () => {
  const filesPath = path.resolve(__dirname, 'secret-folder');
  const filesArray = await fs.promises.readdir(filesPath);
  for (let file of filesArray) {
    const singleFilePath = path.resolve(filesPath, file);
    const stats = await fs.promises.stat(singleFilePath);
    if (!stats.isDirectory()) {
      const fileName = file.split('.')[0];
      const fileType = path.extname(singleFilePath).substring(1);
      const fileSize = stats.size + ' bytes';
      const result = `${fileName} - ${fileType} - ${fileSize}`;
      console.log(result);
    }
  }
})();




