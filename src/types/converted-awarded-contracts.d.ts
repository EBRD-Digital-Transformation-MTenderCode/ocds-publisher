import type { Award, Contract, Party, Period } from './parts';

interface BudgetBreakdown {
  id: string;
  amount: number;
  period: Period;
  classifications: string;
}

interface Budget {
  budgetBreakdown?: BudgetBreakdown[];
}

interface Planning {
  budget: Budget;
}

export interface ConvertedAwardedContracts {
  tag: string[];
  id: string;
  date: string;
  contracts: Contract[];
  awards?: Award[];
  planning: Planning;
  parties: Party[];
}
