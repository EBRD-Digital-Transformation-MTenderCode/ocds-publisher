import axios from 'axios';

import { getReleasePackageConfig } from 'api';

import RequestError from 'libs/request-error';

import type { Record, ConvertedMultiStage, ReleasePackage } from 'types';
import type { Classification } from 'types/parts';

export const multiStageConverter = async (multiStage: Record): Promise<ConvertedMultiStage> => {
  const { ocid, compiledRelease } = multiStage;
  const { initiationType, planning, tender, parties, relatedProcesses } = compiledRelease;

  const expenditureItemOcid = relatedProcesses.find((relatedProcess) => {
    return relatedProcess.relationship.includes('x_expenditureItem');
  })?.identifier;

  if (!expenditureItemOcid) {
    throw new RequestError(404, 'Could not find the expenditure item associated with this tender process');
  }

  const { data: expenditureItemData } = await axios.request<ReleasePackage>(
    getReleasePackageConfig('budgets', expenditureItemOcid, expenditureItemOcid)
  );

  if (!expenditureItemData || !expenditureItemData.releases || !expenditureItemData.releases.length) {
    throw new RequestError(404, `Not found expenditure item release with ocid - ${expenditureItemOcid}`);
  }

  const expenditureItem = expenditureItemData.releases[0];

  return {
    ocid,
    initiationType,
    planning: {
      budget: {
        project: expenditureItem.tender.title,
        // check for crashed tenders
        amount: planning
          ? {
              amount: planning.budget.amount.amount,
              currency: planning.budget.amount.currency,
            }
          : undefined,
        // check for crashed tenders
        finance: planning?.budget.budgetBreakdown.map(({ id, amount, period, sourceParty }) => ({
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
      id: tender.id,
      value: {
        amount: tender.value.amount,
        currency: tender.value.currency,
      },
      status: tender.status,
      procurementMethod: tender.procurementMethod,
      procurementMethodDetails: tender.procurementMethodDetails,
      mainProcurementCategory: tender.mainProcurementCategory,
      eligibilityCriteria: tender.eligibilityCriteria,
      contractPeriod: tender.contractPeriod
        ? {
            startDate: tender.contractPeriod.startDate,
            endDate: tender.contractPeriod.endDate,
          }
        : undefined,
      // check for crashed tenders
      procuringEntity: tender.procuringEntity
        ? {
            id: tender.procuringEntity.id,
            name: tender.procuringEntity.name,
          }
        : undefined,
      procedure: {
        isAccelerated: tender.acceleratedProcedure.isAcceleratedProcedure,
        acceleratedRationale: tender.acceleratedProcedure.acceleratedProcedureJustification,
      },
      classification: {
        id: tender.classification.id,
        scheme: tender.classification.scheme,
        description: tender.classification.description,
      },
      additionalClassifications: tender.additionalClassifications?.map(({ id, scheme, description }) => ({
        id,
        scheme,
        description,
      })),
      contractTerms: {
        hasElectronicOrdering: tender.electronicWorkflows.useOrdering,
        hasElectronicPayment: tender.electronicWorkflows.usePayment,
        electronicInvoicingPolicy: tender.electronicWorkflows.acceptInvoicing,
      },
      crossBorderLaw: tender.legalBasis,
      techniques: {
        hasDynamicPurchasingSystem: tender.dynamicPurchasingSystem.hasDynamicPurchasingSystem,
        hasFrameworkAgreement: tender.framework.isAFramework,
      },
    },
    parties: parties
      .filter(({ roles }) => {
        return (
          roles.includes('buyer') || roles.includes('payer') || roles.includes('funder') || roles.includes('payee')
        );
      })
      .map((party) => {
        const classifications = [] as Classification[];

        if (party.details?.classifications) {
          party.details?.classifications?.forEach((classification) => {
            classifications.push({
              scheme: classification.scheme,
              id: classification.id,
              description: classification.description,
            });
          });
        }

        if (party.details?.typeOfBuyer) {
          classifications.push({
            scheme: 'TED_CA_TYPE',
            id: party.details?.typeOfBuyer,
          });
        }

        if (party.details?.gpaProfile) {
          classifications.push({
            scheme: party.details.gpaProfile.gpaAnnex.scheme,
            id: party.details.gpaProfile.gpaAnnex.id,
          });
        }

        if (party.details?.legalForm) {
          classifications.push({
            scheme: party.details.legalForm.scheme,
            id: party.details.legalForm.id,
            description: party.details.legalForm.description,
          });
        }

        if (party.details?.mainGeneralActivity) {
          classifications.push({
            scheme: 'COFOG',
            id: party.details.mainGeneralActivity,
          });
        }

        if (party.details?.mainSectoralActivity) {
          classifications.push({
            scheme: 'COFOG',
            id: party.details.mainSectoralActivity,
          });
        }

        return {
          id: party.id,
          name: party.name,
          identifier: {
            id: party.identifier.id,
            scheme: party.identifier.scheme,
            legalName: party.identifier.legalName,
          },
          additionalIdentifiers: party.additionalIdentifiers?.map((additionalIdentifier) => ({
            id: additionalIdentifier.id,
            scheme: additionalIdentifier.scheme,
            legalName: additionalIdentifier.legalName,
          })),
          address: {
            streetAddress: party.address.streetAddress,
            postalCode: party.address.postalCode,
            addressDetails: {
              country: {
                id: party.address.addressDetails.country.id,
                scheme: party.address.addressDetails.country.scheme,
                description: party.address.addressDetails.country.description,
                uri: party.address.addressDetails.country.uri,
              },
              region: {
                id: party.address.addressDetails.region.id,
                scheme: party.address.addressDetails.region.scheme,
                description: party.address.addressDetails.region.description,
                uri: party.address.addressDetails.region.uri,
              },
              locality: {
                id: party.address.addressDetails.locality.id,
                scheme: party.address.addressDetails.locality.scheme,
                description: party.address.addressDetails.locality.description,
                uri: party.address.addressDetails.locality.uri,
              },
            },
          },
          contactPoint: {
            name: party.contactPoint.name,
            email: party.contactPoint.email,
            telephone: party.contactPoint.telephone,
          },
          additionalContactPoints: party.additionalContactPoints?.map((additionalContactPoint) => ({
            name: additionalContactPoint.name,
            email: additionalContactPoint.email,
            telephone: additionalContactPoint.telephone,
          })),
          details: party.details
            ? {
                classifications: classifications.length ? classifications : undefined,
                bankAccounts: party.details.bankAccounts?.map((bankAccount) => ({
                  description: bankAccount.description,
                  bankName: bankAccount.bankName,
                  address: {
                    streetAddress: bankAccount.address.streetAddress,
                    postalCode: bankAccount.address.postalCode,
                    addressDetails: {
                      country: {
                        id: bankAccount.address.addressDetails.country.id,
                        scheme: bankAccount.address.addressDetails.country.scheme,
                        description: bankAccount.address.addressDetails.country.description,
                        uri: bankAccount.address.addressDetails.country.uri,
                      },
                      region: {
                        id: bankAccount.address.addressDetails.region.id,
                        scheme: bankAccount.address.addressDetails.region.scheme,
                        description: bankAccount.address.addressDetails.region.description,
                        uri: bankAccount.address.addressDetails.region.uri,
                      },
                      locality: {
                        id: bankAccount.address.addressDetails.locality.id,
                        scheme: bankAccount.address.addressDetails.locality.scheme,
                        description: bankAccount.address.addressDetails.locality.description,
                        uri: bankAccount.address.addressDetails.locality.uri,
                      },
                    },
                  },
                  accountIdentification: bankAccount.accountIdentification.map((accountIdentification) => ({
                    scheme: accountIdentification.scheme,
                    id: accountIdentification.id,
                    description: accountIdentification.description,
                    uri: accountIdentification.uri,
                  })),
                })),
              }
            : undefined,
          roles: party.roles,
          persons: party.persons?.map((persone) => ({
            title: persone.title,
            name: persone.name,
            email: persone.email,
            telephone: persone.telephone,
            url: persone.url,
            identifier: {
              scheme: persone.identifier.scheme,
              id: persone.identifier.id,
              description: persone.identifier.description,
            },
            businessFunctions: persone.businessFunctions.map((businessFunction) => ({
              type: businessFunction.type,
              jobTitle: businessFunction.jobTitle,
              period: {
                startDate: businessFunction.period.startDate,
              },
              documents: businessFunction.documents.map((document) => ({
                id: document.id,
                documentType: document.documentType,
                title: document.title,
                description: document.description,
                url: document.url,
                datePublished: document.datePublished,
              })),
            })),
          })),
        };
      }),
  };
};
