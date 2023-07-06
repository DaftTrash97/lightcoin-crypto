let balance = 500.00;

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  
  get value() {
    return -this.amount;
 }
 
 isAllowed() {
  return (this.account.balance - this.amount >= 0);
 }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }

    return balance;

  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('snow-patrol');

console.log('Starting balance:', myAccount.balance);

const t1 = new Deposit(100.00, myAccount);
t1.commit();

const t3 = new Withdrawal(150.00, myAccount);
t3.commit();

console.log('Final balance:', myAccount.balance);