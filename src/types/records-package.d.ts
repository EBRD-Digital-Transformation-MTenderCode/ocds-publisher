import type { Release } from './release';

export interface Record {
  ocid: string;
  compiledRelease: Release;
}

export interface RecordsPackage {
  publishedDate: string;
  records: Record[];
}
