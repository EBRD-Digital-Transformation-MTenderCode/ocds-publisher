import { Classification } from './classification';

interface AddressDetails {
  country: Classification;
  region: Classification;
  locality: Classification;
}

export interface Address {
  addressDetails: AddressDetails;
  streetAddress: string;
  postalCode?: string;
}
