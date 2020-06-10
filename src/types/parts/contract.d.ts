import type { Metric } from 'ts4ocds/extensions/metrics';

import type { Period } from './period';
import type { Value } from './value';
import type { Document } from './document';
import type { Milestone } from './milestone';
import type { ConfirmationRequest } from './confirmation-request';
import type { ConfirmationResponse } from './confirmation-response';
import type { Period as OCDSPeriod } from 'ts4ocds/standard/definitions/period';
import { OrganizationReference } from './organization-reference';

interface Transaction {
  id: string;
  type?: string;
  value: Value;
  executionPeriod?: Pick<OCDSPeriod, 'durationInDays'>;
  relatedContractMilestone?: string;
  relatedImplementationMilestone?: string;
}

export interface Contract {
  id: string;
  internalId: string;
  date: string;
  awardId: string;
  title: string;
  description: string;
  status: string;
  statusDetails: string;
  agreedMetrics: Metric[];
  period: Period;
  value: Value & { amountNet: number; valueAddedTaxIncluded: boolean };
  documents: Document[];
  milestones?: Milestone[];
  confirmationRequests?: ConfirmationRequest[];
  confirmationResponses?: ConfirmationResponse[]; // Not implement
  finance?: { id: string; amount: number; currency: string }[];
  implementation?: {
    transactions?: Transaction[];
  };
  suppliers?: OrganizationReference[];
}
