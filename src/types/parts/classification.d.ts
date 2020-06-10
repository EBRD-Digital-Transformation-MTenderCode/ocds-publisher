import type { Classification as OCDSClassification } from 'ts4ocds';

import { RequiredFields } from '../utils';

export type Classification = RequiredFields<OCDSClassification, 'scheme' | 'id'>;
