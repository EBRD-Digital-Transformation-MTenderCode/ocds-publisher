import type { Record as OCDSRecord, ConvertedPlanningNotice } from 'types';

export const planningNoticeConverter = (
  planningNotice: OCDSRecord | undefined
): ConvertedPlanningNotice | Record<string, never> => {
  if (!planningNotice) return {};

  const { compiledRelease } = planningNotice;
  const { tender, tag, date, id, purposeOfNotice, hasPreviousNotice } = compiledRelease;

  return {
    tender: {
      tenderPeriod: {
        startDate: tender.tenderPeriod?.startDate as string,
      },
      statusDetails: tender.statusDetails,
      title: tender.title,
      description: tender.description,
      submissionMethod: tender.submissionMethod as string[],
      submissionMethodDetails: tender.submissionMethodDetails as string,
      submissionMethodRationale: tender.submissionMethodRationale as string[],
    },
    purposeOfNotice: {
      isACallForCompetition: purposeOfNotice.isACallForCompetition,
    },
    hasPreviousNotice: hasPreviousNotice,
    tag,
    date,
    id,
  };
};
