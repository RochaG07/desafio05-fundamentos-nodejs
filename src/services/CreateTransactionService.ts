/* eslint-disable prettier/prettier */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import CalculateBalanceService from './CalculateBalanceService';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    // Aqui vão regras de negócio
    if(type !== 'income' && type !== 'outcome')
    {
      throw Error('Invalid transaction type');
    }

    // não permite que uma transação do tipo outcome extrapole o valor total que o usuário tem em caixa
    if (type === 'outcome')
    {
      const calculateBalance = new CalculateBalanceService(this.transactionsRepository);

      const { total } = calculateBalance.execute();

      if(value > total)
      {
        throw Error('Should not be able to create outcome transaction without a valid balance');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value, 
      type
    });

    return transaction;
  }
}

export default CreateTransactionService;
