class BankAccount {
    constructor(accountNumber, ownerName, initialBalance = 0) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = initialBalance;
    }
  
    deposit(amount) {
        if (amount < 0) {
            throw new Error("Deposit amount must be positive");
        }
        this.balance += amount;
    }
  
    withdraw(amount) {
        if (amount < 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        if (this.balance < amount) {
            throw new Error("Insufficient funds");
        }
        this.balance -= amount;
    }
  
    transfer(targetAccount, amount) {
        try {
            this.withdraw(amount);
            targetAccount.deposit(amount);
        } catch (error) {
            console.error(`Transfer failed: ${error.message}`);
            // Optionally re-throw the error if you need to notify the caller
            throw new Error("Transfer operation failed");
        }
    }
  }
  
  function handleTransactions() {
    let bobAccount = new BankAccount(101, "Bob", 500);
    let aliceAccount = new BankAccount(102, "Alice", 300);
  
    try {
        bobAccount.deposit(200);
        bobAccount.transfer(aliceAccount, 1500);  // This should fail
    } catch (error) {
        console.error(`Operation failed: ${error.message}`);
    }
  
    console.log(`Account Balance (Bob): $${bobAccount.balance}`);
    console.log(`Account Balance (Alice): $${aliceAccount.balance}`);
  }
  
  handleTransactions();