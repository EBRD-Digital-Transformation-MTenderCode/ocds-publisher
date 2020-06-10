import type { RequirementResponse } from 'ts4ocds/extensions/requirements';

import type { Value } from './value';
import type { Item } from './item';
import type { OrganizationReference } from './organization-reference';
import type { Document } from './document';

export interface Award {
  id: string;
  internalId: string;
  date: string;
  title: string;
  description: string;
  status: string;
  statusDetails: string;
  value: Value;
  weightedValue?: Value;
  requirementResponses: RequirementResponse;
  relatedLots: string[];
  relatedBid: string;
  items: Item[];
  suppliers: OrganizationReference[];
  documents: Document[];
}
