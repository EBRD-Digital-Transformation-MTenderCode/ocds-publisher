import { Period } from './parts';

interface Tender {
  tenderPeriod: Pick<Period, 'startDate'>;
  statusDetails: string;
  title: string;
  description: string;
  submissionMethod: string[];
  submissionMethodDetails: string;
  submissionMethodRationale: string[];
}

interface PurposeOfNotice {
  isACallForCompetition: boolean;
}

export interface ConvertedPlanningNotice {
  tender: Tender;
  purposeOfNotice: PurposeOfNotice;
  hasPreviousNotice: boolean;
  tag: string[];
  date: string;
  id: string;
}
