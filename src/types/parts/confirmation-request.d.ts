import type { OrganizationReference } from './organization-reference';

interface Request {
  id: string;
  title: string;
  description: string;
  relatedPerson: OrganizationReference;
}

interface RequestGroup {
  id: string;
  requests: Request[];
}

export interface ConfirmationRequest {
  id: string;
  type: string;
  title: string;
  description: string;
  relatesTo: string;
  relatedItem: string;
  source: string;
  requestGroups: RequestGroup[];
}
