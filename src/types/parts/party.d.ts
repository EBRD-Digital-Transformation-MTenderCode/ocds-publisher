import type { Classification } from './classification';
import type { BankAccount } from './bank-account';
import type { OrganizationReference } from './organization-reference';
import type { Identifier } from './identifier';
import type { Address } from './address';
import type { ContactPoint } from './contact-point';
import type { Persone } from './persone';
import type { MemberOf } from './member-of';

interface Details {
  classifications?: Classification[];
  typeOfBuyer?: string;
  gpaProfile?: {
    gpaAnnex: {
      scheme: string;
      id: string;
    };
  };
  legalForm?: Classification;
  bankAccounts?: BankAccount[];
  mainGeneralActivity?: string;
  mainSectoralActivity?: string;
  isACentralPurchasingBody?: boolean;
  typeOfSupplier?: Classification;
  scale?: string;
  mainEconomicActivities?: Classification;
}

interface Party extends OrganizationReference {
  identifier: Identifier;
  additionalIdentifiers?: Identifier[];
  address: Address;
  contactPoint: ContactPoint;
  additionalContactPoints?: ContactPoint[];
  details?: Details;
  roles: string[];
  persons?: Persone[];
  memberOf?: MemberOf[];
}
