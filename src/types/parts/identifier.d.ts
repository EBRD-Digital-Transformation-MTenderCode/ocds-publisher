import type { Identifier as OCDSIdentifier } from 'ts4ocds';

import { RequiredFields } from '../utils';

export type Identifier = RequiredFields<OCDSIdentifier, 'scheme' | 'id' | 'legalName'>;
