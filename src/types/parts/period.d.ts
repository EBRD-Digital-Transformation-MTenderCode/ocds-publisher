import { Period as OCDSPeriod } from 'ts4ocds/standard/definitions/period';

import { RequiredFields } from '../utils';

export type Period = RequiredFields<Pick<OCDSPeriod, 'startDate' | 'endDate'>, 'startDate' | 'endDate'>;
