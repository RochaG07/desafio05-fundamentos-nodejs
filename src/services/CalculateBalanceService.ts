/* eslint-disable prettier/prettier */
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
    income: number;
    outcome: number;
    total: number;
  }
  
class CalculateBalanceService {
    private transactionsRepository: TransactionsRepository;

    constructor(transactionsRepository: TransactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    // Gambiarra safada V
    public execute(): Balance {
        const { income, outcome, total } = this.transactionsRepository.getBalance();

        const balance ={
            income,
            outcome,
            total,
        };

        return balance;
    }
}

export default CalculateBalanceService;
