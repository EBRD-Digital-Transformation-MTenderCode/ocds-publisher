import { Record } from 'types';

export const multiStageConverter = (multiStage: Record) => {
  const { ocid, compiledRelease } = multiStage;
  const { initiationType, planning, tender } = compiledRelease;

  return {
    ocid,
    initiationType,
    planning: {
      budget: {
        amount: {
          amount: planning.budget.amount.amount,
          currency: planning.budget.amount.currency,
        },
        finance: planning.budget.budgetBreakdown.map(({ id, amount, period, sourceParty }) => ({
          id,
          value: {
            amount: amount.amount,
            currency: amount.currency,
          },
          period: {
            startDate: period.startDate,
            endDate: period.endDate,
          },
          financingParty: {
            id: sourceParty.id,
            name: sourceParty.name,
          },
        })),
      },
    },
    title: tender.title,
    description: tender.description,
    tender: {
      value: {
        amount: tender.value.amount,
        currency: tender.value.currency,
      },
      status: tender.status,
      procurementMethod: tender.procurementMethod,
      procurementMethodDetails: tender.procurementMethodDetails,
      mainProcurementCategory: tender.mainProcurementCategory,
      eligibilityCriteria: tender.eligibilityCriteria,
      contractPeriod: {
        startDate: tender.contractPeriod.startDate,
        endDate: tender.contractPeriod.endDate,
      },
      procuringEntity: {
        id: tender.procuringEntity.id,
        name: tender.procuringEntity.name,
      },
      procedure: {
        isAccelerated: tender.acceleratedProcedure.isAcceleratedProcedure,
        acceleratedRationale: tender.acceleratedProcedure.acceleratedProcedureJustification,
      },
      classification: {
        id: tender.classification.id,
        scheme: tender.classification.scheme,
        description: tender.classification.description,
      },
      additionalClassifications: tender.additionalClassifications.map(({ id, scheme, description }) => ({
        id,
        scheme,
        description,
      })),
      contractTerms: {
        hasElectronicOrdering: tender.electronicWorkflows.useOrdering,
        hasElectronicPayment: tender.electronicWorkflows.usePayment,
      },
    },
  };
};
