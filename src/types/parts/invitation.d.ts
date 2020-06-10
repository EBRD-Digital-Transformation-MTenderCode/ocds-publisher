import type { Document } from './document';

export interface Invitation {
  id: string;
  date: string;
  status: string;
  relatedQualification: string;
  documents: Document[];
}
