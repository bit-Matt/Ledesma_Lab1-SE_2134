import * as fs from 'fs';
import readlineSync from 'readline-sync';

// Async/Await functions

const filename: string = 'debts3.txt';

function isNumber(x: Number): boolean {
  return !Number.isNaN(x);
}

function addDebts() {  
  return new Promise((resolve: Function, reject: Function) => {    
    while (true) {
      const error = false;
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

      if (!error) {
        resolve();
      } else {
        reject("Error: Something went wrong");
      }
    }
  })
}

function displayDebts(): void {
  console.log('-'.repeat(50));
  console.log('Here are the debts:');
  console.log('-'.repeat(50));
  const debts = fs.readFileSync(filename).toString();
  console.log(debts);
}

async function addThenDisplayDebts() {
  await addDebts();

  displayDebts();
}

addThenDisplayDebts();
