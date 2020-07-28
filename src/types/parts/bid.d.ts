import type { RequirementResponse } from 'ts4ocds/extensions/requirements';

import type { OrganizationReference } from './organization-reference';
import type { Value } from './value';
import type { Item } from './item';
import type { Document } from './document';

export interface Bid {
  id: string;
  date: string;
  status: string;
  tenderers: OrganizationReference[];
  value: Value;
  items: Item[];
  relatedLots: string[];
  documents: Document[];
  requirementResponses: RequirementResponse[];
}
