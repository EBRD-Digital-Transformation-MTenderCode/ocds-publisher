import { Period as OCDSPeriod } from 'ts4ocds/standard/definitions/period';

export type Period = OCDSPeriod & { startDate: string; endDate: string };
