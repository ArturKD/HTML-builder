/*---------------------------exports--------------------------*/
const fs = require('fs');
const path = require('path');
const { stdout } = process;
const readline = require('readline');
const { stdin: input, stdout: output } = process;

/*---------------------------variables--------------------------*/
const rl = readline.createInterface({ input, output });
const text = 'text.txt';
const file = path.join(__dirname, text);
const outputFile = fs.createWriteStream(file);

/*---------------------------functions--------------------------*/
stdout.write('Type your text...\n');
rl.on('line', answer => {
  if (answer === 'exit') process.exit();
  outputFile.write(`${answer} \n`);
});
process.on('exit', () => stdout.write('Good Buy!'));