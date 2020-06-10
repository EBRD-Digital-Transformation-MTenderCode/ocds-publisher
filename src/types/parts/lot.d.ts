import type { Lot as OCDSLot } from 'ts4ocds/extensions/lots';

import type { Period } from './period';

import type { RequiredFields } from '../utils';

export type Lot = RequiredFields<OCDSLot, 'title' | 'description' | 'value' | 'status'> & {
  internalId: string | number;
  contractPeriod: Period;
  statusDetails: string;
};
