import axios from 'axios';

import merge from 'lodash.mergewith';

import { getRecordsPackageConfig } from 'api';
import RequestError from 'libs/request-error';

import { multiStageConverter } from './multi-stage-converter';
import { planningNoticeConverter } from './planning-notice-converter';
import { contactNoticeConverter } from './contract-notice-converter';
import { awardedContractsConverter } from './awarded-contracts-converter';

import { patterns } from 'utils';

import { publicPoint } from 'config';

import type { RequestHandler } from 'fastify';
import type { RecordsPackage } from 'types';

export const getRecordsPackage: RequestHandler<unknown, unknown, unknown, { ocid: string }> = async ({
  params: { ocid },
}) => {
  try {
    const { data } = await axios.request<RecordsPackage>(getRecordsPackageConfig('tenders', ocid));

    if (!data || !data.records || !data.records.length) {
      throw new RequestError(404, 'Not found tender process');
    }

    const { records } = data;

    const multiStage = records.find((record) => patterns.multiSageOcid.test(record.ocid));

    if (!multiStage) {
      throw new RequestError(404, `Records package hasn't multi stage record`);
    }

    const planningNotice = records.find((record) => patterns.planningNoticeOcid.test(record.ocid));
    const contractNotice = records.find((record) => patterns.contractNoticeOcid.test(record.ocid));
    const awardedContracts = records.filter((record) => patterns.awardedContractOcid.test(record.ocid));

    return {
      uri: `${publicPoint.baseUrl}/ocds/tenders/${multiStage.ocid}`,
      version: '1.1',
      extensions: [
        'https://raw.githubusercontent.com/open-contracting/ocds_bid_extension/v1.1.1/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_enquiry_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_finance_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_process_title_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_procedure_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_tenderClassification_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_contractTerms_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_legalBasis_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_techniques_extension/master/extension.json',
        'https://raw.githubusercontent.com/eOCDS-Extensions/eOCDS-addressDetails/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_additionalContactPoints_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_organizationClassification_extension/master/extension.json',
        'https://gitlab.com/dncp-opendata/ocds_statusdetails_extension/-/raw/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_lots_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_options_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_recurrence_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_renewal_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_submissionTerms_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_enquiry_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_secondStageDescription_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_requirements_extension/master/extension.json',
        'https://raw.githubusercontent.com/open-contracting-extensions/ocds_otherRequirements_extension/master/extension.json',
        'https://raw.githubusercontent.com/eOCDS-Extensions/eOCDS-conversions/master/extension.json',
      ],
      publishedDate: data.publishedDate,
      releases: [
        merge(
          await multiStageConverter(multiStage),
          planningNoticeConverter(planningNotice),
          contactNoticeConverter(contractNotice),
          awardedContractsConverter(awardedContracts),
          (objValue, srcValue, key) => {
            if (key === 'parties') {
              return objValue.concat(srcValue);
            }
          }
        ),
      ],
      publisher: {
        name: 'M-Tender',
        uri: 'https://www.mtender.gov.md/',
      },
      license: 'http://opendefinition.org/licenses/',
      publicationPolicy: 'http://opendefinition.org/licenses/',
    };
  } catch (e) {
    console.log(e);
    return e.isAxiosError ? e.toJSON() : e;
  }
};
