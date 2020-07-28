import {
  Address,
  Amendment,
  Award,
  Auction,
  Bid,
  Classification,
  Criterion,
  Document,
  Enquiry,
  Invitation,
  Item,
  Lot,
  OrganizationReference,
  OtherRequirement,
  Party,
  Period,
  PreQualification,
  ReviewProceeding,
  SecondStage,
  Submission,
  Qualification,
  Value,
  Contract,
} from './parts';
import type { Conversion } from 'ts4ocds/extensions/conversions';
import { Transaction } from './converted-awarded-contracts';
import { Period as OCDSPeriod } from 'ts4ocds/standard/definitions/period';

interface Tender {
  id: string;
  title: string;
  description: string;
  status: string;
  statusDetails: string;
  value: Value;
  procurementMethod: string;
  procurementMethodDetails: string;
  mainProcurementCategory: 'goods' | 'works' | 'services';
  hasEnquiries: boolean;
  eligibilityCriteria: string;
  contractPeriod?: Period;
  tenderPeriod?: Period;
  enquiryPeriod?: Period;
  awardPeriod?: Period;
  auctionPeriod?: Period;
  submissionMethod?: string[];
  submissionMethodDetails?: string;
  submissionMethodRationale?: string[];
  secondStage?: SecondStage;
  preQualification?: PreQualification;
  enquiries?: Enquiry[];
  procuringEntity: OrganizationReference;
  acceleratedProcedure: {
    isAcceleratedProcedure: boolean;
    acceleratedProcedureJustification?: string;
  };
  classification: Classification;
  additionalClassifications?: Classification[];
  designContest: {
    serviceContractAward: boolean;
  };
  electronicWorkflows: {
    useOrdering: boolean;
    usePayment: boolean;
    acceptInvoicing: boolean;
  };
  jointProcurement: {
    isJointProcurement: boolean;
  };
  legalBasis: string;
  procedureOutsourcing: {
    procedureOutsourced: boolean;
  };
  dynamicPurchasingSystem: {
    hasDynamicPurchasingSystem: boolean;
  };
  framework: {
    isAFramework: boolean;
  };
  lots: (Lot & {
    options: [{ hasOptions: boolean }];
    recurrentProcurement: [{ isRecurrent: boolean }];
    renewals: [{ hasRenewals: boolean }];
    variants: [{ hasVariants: boolean }];
    requiresElectronicCatalogue: string;
    placeOfPerformance: {
      address: Address;
      description?: string;
    };
  })[];
  items: Item[];
  amendments?: Amendment[];
  documents: Document[];
  criteria?: Criterion[];
  otherRequirements?: OtherRequirement;
  awardCriteria: string;
  awardCriteriaDetails: string;
  conversions?: Conversion[];
  electronicAuctions?: Auction;
}

interface BudgetBreakdown {
  id: string;
  amount: Value;
  period: Period;
  sourceParty: OrganizationReference;
}

interface BudgetAllocation {
  budgetBreakdownID: string;
  amount: number;
  period: Period;
  relatedItem: string;
  budgetSource: ({
    budgetBreakdownID: string;
  } & Value)[];
}

interface Transaction {
  id: string;
  type: string;
  value: Value;
  executionPeriod: Pick<OCDSPeriod, 'durationInDays'>;
  relatedContractMilestone: string;
}

interface Budget {
  amount: Value;
  isEuropeanUnionFunded: boolean;
  budgetBreakdown: BudgetBreakdown[];
  budgetAllocation?: BudgetAllocation[];
  budgetSource?: { budgetBreakdownID: string; amount: number; currency: string }[];
}

interface Planning {
  budget: Budget;
  implementation?: {
    transactions: Transaction[];
  };
}

interface RelatedProcess {
  id: string;
  relationship: ('parent' | 'planning' | 'x_fundingSource' | 'x_expenditureItem' | 'x_evaluation' | 'x_contracting')[];
  scheme: string;
  identifier: string;
  uri: string;
}

export interface Release {
  ocid: string;
  id: string;
  date: string;
  tag: string[];
  initiationType: string;
  planning: Planning;
  tender: Tender;
  parties: Party[];
  relatedProcesses: RelatedProcess[];
  hasPreviousNotice: boolean;
  purposeOfNotice: {
    isACallForCompetition: boolean;
  };
  reviewProceedings?: ReviewProceeding[];
  submissions?: Submission[];
  qualifications?: Qualification[];
  invitations?: Invitation[];
  awards?: Award[];
  bids?: Bid[];
  contracts: Contract[];
}
