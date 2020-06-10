import { Address } from './address';
import { Classification } from './classification';

export interface BankAccount {
  description: string;
  bankName: string;
  address: Address;
  accountIdentification: Classification[];
}
