import type {
  Address,
  BankAccount,
  Classification,
  ContactPoint,
  OrganizationReference,
  Period,
  Persone,
  Value,
  Identifier,
} from './parts';

interface Finance {
  id: string;
  value: Value;
  period: Period;
  financingParty: OrganizationReference;
}

interface Budget {
  project: string;
  amount?: Value;
  finance?: Finance[];
}

interface Planning {
  budget: Budget;
}

interface Details {
  classifications?: Classification[];
  bankAccounts?: BankAccount[];
}

interface Party {
  id: string;
  name: string;
  identifier: Identifier;
  additionalIdentifiers?: Identifier[];
  address: Address;
  contactPoint: ContactPoint;
  additionalContactPoints?: ContactPoint[];
  details?: Details;
  roles: string[];
  persons?: Persone[];
}

export interface ConvertedMultiStage {
  ocid: string;
  initiationType: string;
  planning: Planning;
  title: string;
  description: string;
  tender: {
    value: Value;
    status: string;
    procurementMethod: string;
    procurementMethodDetails: string;
    mainProcurementCategory: string;
    eligibilityCriteria: string;
    contractPeriod?: Period;
    procuringEntity?: OrganizationReference;
    procedure: {
      isAccelerated: boolean;
      acceleratedRationale?: string;
    };
    classification: Classification;
    additionalClassifications?: Classification[];
    contractTerms: {
      hasElectronicOrdering: boolean;
      hasElectronicPayment: boolean;
      electronicInvoicingPolicy: boolean;
    };
    crossBorderLaw: string;
    techniques: {
      hasDynamicPurchasingSystem: boolean;
      hasFrameworkAgreement: boolean;
    };
  };
  parties: Party[];
}
