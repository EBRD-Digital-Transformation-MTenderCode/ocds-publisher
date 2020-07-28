import type { Classification } from './classification';
import type { Period } from './period';
import type { Document } from './document';

export interface Persone {
  title: string;
  name: string;
  email: string;
  telephone: string;
  url: string;
  identifier: Classification;
  businessFunctions: {
    type: string;
    jobTitle: string;
    period: Pick<Period, 'startDate'>;
    documents: Document[];
  }[];
}
