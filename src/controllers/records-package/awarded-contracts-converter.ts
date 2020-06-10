import { Record as OCDSRecord, ConvertedAwardedContracts } from 'types';

export const awardedContractsConverter = (
  awardedContracts: OCDSRecord[]
): ConvertedAwardedContracts | Record<string, never> => {
  if (!awardedContracts.length) return {};

  const latestAwardedContract = [...awardedContracts].sort((AC1, AC2) => {
    return +new Date(AC1.compiledRelease.date) - +new Date(AC2.compiledRelease.date);
  })[0];

  const { compiledRelease } = latestAwardedContract;
  const { tag, id, date, awards, planning } = compiledRelease;

  const contacts = awardedContracts.flatMap(({ compiledRelease }) => compiledRelease.contracts);

  return {
    tag,
    id,
    date,
    contracts: contacts.map(
      ({
        id,
        internalId,
        date,
        awardId,
        title,
        description,
        status,
        statusDetails,
        agreedMetrics,
        period,
        value,
        documents,
        milestones,
      }) => ({
        id,
        internalId,
        date,
        awardId,
        title,
        description,
        status,
        statusDetails,
        agreedMetrics,
        period,
        value,
        documents,
        milestones: milestones?.map(({ id, title, description, status, type, dueDate, dateMet, dateModified }) => ({
          id,
          title,
          description,
          status,
          type,
          dueDate,
          dateMet,
          dateModified,
        })),
        finance: awardedContracts
          .find(({ compiledRelease: { contracts } }) => {
            return contracts.find((contact) => contact.id === id);
          })
          ?.compiledRelease.planning?.budget.budgetSource?.map(({ budgetBreakdownID, amount, currency }) => ({
            id: budgetBreakdownID,
            amount,
            currency,
          })),
        implementation: {
          transactions: awardedContracts
            .find(({ compiledRelease: { contracts } }) => {
              return contracts.find((contact) => contact.id === id);
            })
            ?.compiledRelease.planning?.implementation?.transactions.map(({ id, value, relatedContractMilestone }) => ({
              id,
              value,
              relatedImplementationMilestone: relatedContractMilestone,
            })),
        },
        suppliers: awardedContracts
          .find(({ compiledRelease: { contracts } }) => {
            return contracts.find((contact) => contact.id === id);
          })
          ?.compiledRelease.parties.filter(({ roles }) => roles.includes('supplier'))
          .map(({ id, name }) => ({
            id,
            name,
          })),
      })
    ),
    awards,
    planning: {
      budget: {
        budgetBreakdown: planning?.budget.budgetAllocation?.map(
          ({ budgetBreakdownID, amount, period, relatedItem }) => ({
            id: budgetBreakdownID,
            amount,
            period,
            classifications: relatedItem,
          })
        ),
      },
    },
    parties: awardedContracts
      .flatMap(({ compiledRelease: { parties } }) => parties)
      .filter(({ roles }) => roles.includes('supplier')),
  };
};
