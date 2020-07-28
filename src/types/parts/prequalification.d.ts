import { Period } from './period';

export interface PreQualification {
  id: string;
  status: string;
  period: Period;
  qualificationPeriod: Period;
}
