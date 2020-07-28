import type { OrganizationReference } from './organization-reference';
import type { ConfirmationRequest } from './confirmation-request';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: string;
  type: string;
  relatedItems?: string[]; // Not implement
  dueDate: string;
  dateMet: string;
  dateModified: string;
  relatedParties?: OrganizationReference; // Not implement
  confirmationRequests?: ConfirmationRequest[]; // Not implement
}
