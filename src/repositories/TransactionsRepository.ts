/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  
  public getBalance(): Balance {
    let outcome = 0;
    let income = 0;

    this.transactions.forEach( transaction => {
      if(transaction.type === 'income')
      {
        income += transaction.value;
      } else {
        outcome += transaction.value;
      }
    });

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

   return balance;
    
  }
  

  public create({title, value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
