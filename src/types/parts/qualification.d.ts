import type { RequirementResponse } from 'ts4ocds/extensions/requirements';

import type { OrganizationReference } from './organization-reference';
import type { Document } from './document';

export interface Qualification {
  id: string;
  date: string;
  internalId: string;
  status: string;
  statusDetails: string;
  description: string;
  relatedSubmission: string;
  candidates: OrganizationReference[];
  documents: Document[];
  requirementResponses: RequirementResponse[];
}
