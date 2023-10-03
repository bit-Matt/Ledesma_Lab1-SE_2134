import fs from 'fs';
import readlineSync from 'readline-sync';

// Callback functions

const filename: string = 'debts1.txt';

function isNumber(x: Number): boolean {
  return !Number.isNaN(x);
}

function addThenDisplayDebts(callback: Function){  
  while (true) {
    const input = readlineSync.question('Callback: Who has debt? How much? ');

    if (input === 'Done listing') {
      break;
    }

    if (!input.includes(' ')) {
      console.log('Invalid input format.');
      continue;
    }  

    const [_name, amountString]: string[] = input.split(' ');
    const amountNumber: number = Number(amountString);
    
    if (isNumber(amountNumber)) {
      fs.writeFileSync(filename, input + '\n', {flag: 'a+'});
    } else {
      console.log('Amount is not a number');
    } 
  }
  callback();
}

function displayDebts() {
  console.log('-'.repeat(50));
  console.log('Here are the debts:');
  console.log('-'.repeat(50));
  const debts = fs.readFileSync(filename).toString();
  console.log(debts);
}

addThenDisplayDebts(displayDebts);
