import type { RequirementResponse } from 'ts4ocds/extensions/requirements';

import type { OrganizationReference } from './organization-reference';
import type { Document } from './document';

interface SubmissionDetail {
  id: string;
  date: string;
  status: string;
  candidates: OrganizationReference[];
  documents: Document[];
  requirementResponses: RequirementResponse[];
}

export interface Submission {
  details: SubmissionDetail[];
}
