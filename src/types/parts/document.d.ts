import type { Document as OCDSDocument } from 'ts4ocds';

import { RequiredFields } from '../utils';

export type Document = RequiredFields<OCDSDocument, 'documentType' | 'title' | 'url' | 'datePublished'> & {
  relatedLots?: string[];
};
