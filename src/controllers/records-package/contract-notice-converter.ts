import RequestError from 'libs/request-error';

import type { Record as OCDSRecord, ConvertedContractNotice } from 'types';

export const contactNoticeConverter = (
  contractNotice: OCDSRecord | undefined
): ConvertedContractNotice | Record<string, never> => {
  if (!contractNotice) return {};

  const { compiledRelease } = contractNotice;
  const {
    tag,
    date,
    id,
    tender,
    purposeOfNotice,
    hasPreviousNotice,
    reviewProceedings,
    submissions,
    qualifications,
    invitations,
    awards,
    bids,
    parties,
  } = compiledRelease;

  return {
    tag,
    date,
    id,
    purposeOfNotice: {
      isACallForCompetition: purposeOfNotice.isACallForCompetition,
    },
    hasPreviousNotice,
    tender: {
      statusDetails: tender.statusDetails,
      lots: tender.lots.map((lot) => {
        const relatedAuction = tender.electronicAuctions?.details.find(({ relatedLot }) => lot.id === relatedLot);

        return {
          id: lot.id,
          internalId: lot.internalId,
          title: lot.title,
          description: lot.description,
          status: lot.status,
          statusDetails: lot.statusDetails,
          value: {
            amount: lot.value.amount,
            currency: lot.value.currency,
          },
          hasOptions: lot.options[0].hasOptions,
          hasRecurrence: lot.recurrentProcurement[0].isRecurrent,
          hasRenewal: lot.renewals[0].hasRenewals,
          submissionTerms: {
            variantPolicy: lot.variants[0].hasVariants ? 'allowed' : 'notAllowed',
            electronicCataloguePolicy: lot.requiresElectronicCatalogue,
          },
          contractPeriod: {
            startDate: lot.contractPeriod.startDate,
            endDate: lot.contractPeriod.endDate,
          },
          techniques:
            relatedAuction && relatedAuction.electronicAuctionModalities
              ? {
                  electronicAuction: {
                    url: relatedAuction.electronicAuctionModalities[0].url,
                  },
                }
              : undefined,
        };
      }),
      items: tender.items.map((item) => {
        const relatedLot = tender.lots.find((lot) => lot.id === item.relatedLot);

        if (!relatedLot) {
          throw new RequestError(404, `Could not find the associated lot for item with id - ${item.id}`);
        }

        return {
          id: item.id,
          internalId: item.internalId,
          relatedLot: item.relatedLot,
          description: item.description,
          classification: {
            scheme: item.classification.scheme,
            id: item.classification.id,
            description: item.classification.description,
            uri: item.classification.uri || undefined,
          },
          quantity: item.quantity,
          unit: {
            scheme: item.unit.scheme,
            id: item.unit.id,
            name: item.unit.name,
            uri: item.unit.uri || undefined,
          },
          deliveryAddress: {
            streetAddress: relatedLot.placeOfPerformance.address.streetAddress,
            postalCode: relatedLot.placeOfPerformance.address.postalCode,
            addressDetails: {
              country: {
                scheme: relatedLot.placeOfPerformance.address.addressDetails.country.scheme,
                id: relatedLot.placeOfPerformance.address.addressDetails.country.id,
                description: relatedLot.placeOfPerformance.address.addressDetails.country.description,
                uri: relatedLot.placeOfPerformance.address.addressDetails.country.uri || undefined,
              },
              region: {
                scheme: relatedLot.placeOfPerformance.address.addressDetails.region.scheme,
                id: relatedLot.placeOfPerformance.address.addressDetails.region.id,
                description: relatedLot.placeOfPerformance.address.addressDetails.region.description,
                uri: relatedLot.placeOfPerformance.address.addressDetails.region.uri || undefined,
              },
              locality: {
                scheme: relatedLot.placeOfPerformance.address.addressDetails.locality.scheme,
                id: relatedLot.placeOfPerformance.address.addressDetails.locality.id,
                description: relatedLot.placeOfPerformance.address.addressDetails.locality.description,
                uri: relatedLot.placeOfPerformance.address.addressDetails.locality.uri || undefined,
              },
            },
            description: relatedLot.placeOfPerformance.description,
          },
        };
      }),
      tenderPeriod: {
        startDate: tender.tenderPeriod?.startDate as string,
        endDate: tender.tenderPeriod?.endDate as string,
      },
      enquiryPeriod: {
        startDate: tender.enquiryPeriod?.startDate as string,
        endDate: tender.enquiryPeriod?.endDate as string,
      },
      awardPeriod: tender.awardPeriod
        ? {
            startDate: tender.awardPeriod.startDate as string,
            endDate: tender.awardPeriod.endDate as string,
          }
        : undefined,
      auctionPeriod: tender.auctionPeriod
        ? {
            startDate: tender.auctionPeriod?.startDate as string,
            endDate: tender.auctionPeriod?.endDate as string,
          }
        : undefined,
      secondStage: tender.secondStage
        ? {
            minimumCandidates: tender.secondStage.minimumCandidates,
            maximumCandidates: tender.secondStage.maximumCandidates,
          }
        : undefined,
      preQualification: tender.preQualification
        ? {
            id: tender.preQualification.id,
            status: tender.preQualification.status,
            period: {
              startDate: tender.preQualification.period.startDate,
              endDate: tender.preQualification.period.endDate,
            },
            qualificationPeriod: {
              startDate: tender.preQualification.qualificationPeriod.startDate,
              endDate: tender.preQualification.qualificationPeriod.endDate,
            },
          }
        : undefined,
      hasEnquiries: tender.hasEnquiries,
      enquiries: tender.enquiries?.map((enquiry) => ({
        id: enquiry.id,
        date: enquiry.date,
        title: enquiry.title,
        description: enquiry.description,
        answer: enquiry.answer,
        dateAnswered: enquiry.dateAnswered,
        relatedLot: enquiry.relatedLot,
      })),
      amendments: tender.amendments?.map((amendment) => ({
        id: amendment.id,
        date: amendment.date,
        rationale: amendment.rationale,
        description: amendment.description,
        amendsReleaseID: amendment.amendsReleaseID,
        releaseID: amendment.releaseID,
      })),
      documents: tender.documents?.map((document) => ({
        id: document.id,
        documentType: document.documentType,
        title: document.title,
        description: document.description,
        url: document.url,
        datePublished: document.datePublished,
        relatedLots: document.relatedLots,
      })),
      criteria: tender.criteria?.map((criterion) => ({
        id: criterion.id,
        title: criterion.title,
        description: criterion.description,
        source: criterion.source,
        relatesTo: criterion.relatesTo,
        relatedItem: criterion.relatedItem,
        classification: criterion.classification
          ? {
              scheme: criterion.classification.scheme,
              id: criterion.classification.id,
              description: criterion.classification.description,
              uri: criterion.classification.uri || undefined,
            }
          : undefined,
        additionalClassifications: criterion.additionalClassifications?.map(({ scheme, id, description, uri }) => ({
          scheme,
          id,
          description,
          uri: uri || undefined,
        })),
        legislation: criterion.legislation?.map((legislation) => ({
          version: legislation.version,
          identifier: {
            scheme: legislation.identifier.scheme,
            id: legislation.identifier.id,
            legalName: legislation.identifier.legalName,
            uri: legislation.identifier.uri || undefined,
          },
          type: legislation.type,
          article: legislation.article,
        })),
        requirementGroups: criterion.requirementGroups.map(({ id, description, requirements }) => ({
          id,
          description,
          requirements: requirements.map((requirement) => ({
            id: requirement.id,
            title: requirement.title,
            description: requirement.description,
            dataType: requirement.dataType,
            expectedValue: requirement.expectedValue,
            minValue: requirement.minValue,
            maxValue: requirement.maxValue,
            period: requirement.period
              ? {
                  startDate: requirement.period.startDate,
                  endDate: requirement.period.endDate,
                  durationInDays: requirement.period.durationInDays,
                }
              : undefined,
            eligibleEvidences: requirement.eligibleEvidences?.map(({ id, title, description, type }) => ({
              id,
              title,
              description,
              type,
            })),
          })),
        })),
      })),
      otherRequirements: tender.otherRequirements
        ? {
            qualificationSystemMethods: tender.otherRequirements.qualificationSystemMethods,
            reductionCriteria: tender.otherRequirements.reductionCriteria,
          }
        : undefined,
      awardCriteria: tender.awardCriteria,
      awardCriteriaDetails: tender.awardCriteriaDetails,
      // @ts-ignore @TODO need fix ts4ocds, "period" field must be not required
      conversions: tender.conversions?.map(({ id, description, rationale, relatesTo, relatedItem, coefficients }) => ({
        id,
        description,
        rationale,
        relatesTo,
        relatedItem,
        coefficients: coefficients.map(({ id, coefficient, value }) => ({
          id,
          value,
          coefficient,
        })),
      })),
      auctions: tender.electronicAuctions
        ? {
            details: tender.electronicAuctions.details.map(
              ({ id, relatedLot, auctionPeriod, electronicAuctionModalities, electronicAuctionResult }) => ({
                id,
                relatedLot,
                auctionPeriod: auctionPeriod
                  ? {
                      startDate: auctionPeriod.startDate,
                      endDate: auctionPeriod.endDate,
                    }
                  : undefined,
                url: electronicAuctionModalities?.[0].url,
                electronicAuctionModalities: electronicAuctionModalities?.map(({ eligibleMinimumDifference }) => ({
                  eligibleMinimumDifference: {
                    amount: eligibleMinimumDifference.amount,
                    currency: eligibleMinimumDifference.currency,
                  },
                })),
                auctionResult: electronicAuctionResult?.map(({ relatedBid, value }) => ({
                  relatedBid,
                  value: {
                    amount: value.amount,
                    currency: value.currency,
                  },
                })),
              })
            ),
          }
        : undefined,
    },
    reviewProceedings: reviewProceedings?.map(({ complaints, reviews }) => ({
      complaints: complaints.map(({ id, date, status, complainer, addressedTo, classification }) => ({
        id,
        date,
        status,
        complainer: {
          name: complainer.name,
        },
        classification,
        addressedTo,
      })),
      reviews: reviews.map(({ id, classification, status, resolution, documents, complaint, date }) => ({
        id,
        date,
        status,
        resolution,
        classification,
        complaint,
        documents: documents.map(({ id, url }) => ({
          id,
          url,
        })),
      })),
    })),
    submissions,
    qualifications,
    invitations,
    awards,
    bids,
    parties: parties?.map((party) => {
      const classifications = [];

      if (party.details?.classifications?.length) {
        classifications.push(...party.details.classifications);
      }

      if (party.details?.typeOfSupplier) {
        classifications.push({
          scheme: party.details.typeOfSupplier.scheme,
          id: party.details.typeOfSupplier.id,
          description: party.details.typeOfSupplier.description,
          uri: party.details.typeOfSupplier.uri || undefined,
        });
      }

      if (party.details?.legalForm) {
        classifications.push({
          scheme: party.details.legalForm.scheme,
          id: party.details.legalForm.id,
          description: party.details.legalForm.description,
          uri: party.details.legalForm.uri || undefined,
        });
      }

      if (party.details?.mainEconomicActivities) {
        classifications.push({
          scheme: party.details.mainEconomicActivities.scheme,
          id: party.details.mainEconomicActivities.id,
          description: party.details.mainEconomicActivities.description,
          uri: party.details.mainEconomicActivities.uri || undefined,
        });
      }

      return {
        ...party,
        identifier: {
          ...party.identifier,
          uri: party.identifier.uri || undefined,
        },
        details: party.details
          ? {
              classifications: classifications.length ? classifications : undefined,
              scale: party.details?.scale,
              bankAccounts: party.details.bankAccounts,
            }
          : undefined,
      };
    }),
  };
};
