import type { Item as OCDSItem } from 'ts4ocds';

import type { RequiredFields } from '../utils';

export type Item = RequiredFields<OCDSItem, 'description' | 'classification' | 'quantity' | 'unit'> & {
  internalId: string | number;
  relatedLot: string;
};
