/*---------------------------exports--------------------------*/
const fs = require('fs');
const path = require('path');

/*---------------------------variables--------------------------*/
const text = 'text.txt';
const file = path.join(__dirname, text);
const readableStream = fs.createReadStream(file, 'utf-8');
let data = '';

/*---------------------------functions--------------------------*/
readableStream.on('data', chunk => data += chunk);
readableStream.on('end', () => console.log(data));
readableStream.on('error',error => console.log('Произошла ошибка: ', error.message));
