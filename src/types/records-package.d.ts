import { Period, Value, OrganizationReference } from './parts';
import { Classification } from 'ts4ocds';

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
  contractPeriod: Period;
  procuringEntity: OrganizationReference;
  acceleratedProcedure: {
    isAcceleratedProcedure: boolean;
    acceleratedProcedureJustification?: string;
  };
  classification: Required<Classification>;
  additionalClassifications: Required<Classification>[];
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
}

interface BudgetBreakdown {
  id: string;
  amount: Value;
  period: Period;
  sourceParty: OrganizationReference;
}

interface Budget {
  amount: Value;
  isEuropeanUnionFunded: boolean;
  budgetBreakdown: BudgetBreakdown[];
}

interface Planning {
  budget: Budget;
}

interface CompiledRelease {
  ocid: string;
  id: string;
  date: string;
  tag: string[];
  initiationType: string;
  planning: Planning;
  tender: Tender;
}

export interface Record {
  ocid: string;
  compiledRelease: CompiledRelease;
}

export interface RecordsPackage {
  records: Record[];
}
