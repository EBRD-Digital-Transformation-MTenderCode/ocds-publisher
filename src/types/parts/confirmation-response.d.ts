import type { OrganizationReference } from './organization-reference';

interface Verification {
  type: string;
  value: number;
  rationale: string;
}

export interface ConfirmationResponse {
  id: string;
  value: {
    id: string;
    name: string;
    date: string;
    relatedPerson: OrganizationReference;
    verification: Verification[];
  };
  request: string;
}
