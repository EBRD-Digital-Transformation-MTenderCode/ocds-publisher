import axios from 'axios';

import { getRecordsPackageConfig } from 'api';
import RequestError from 'libs/request-error';

import { multiStageConverter } from './multi-stage-converter';

import { patterns } from 'utils';

import type { RequestHandler } from 'fastify';
import type { RecordsPackage } from 'types';

export const getRecordsPackage: RequestHandler<unknown, unknown, unknown, { ocid: string }> = async ({
  params: { ocid },
}) => {
  try {
    const { data } = await axios.request<RecordsPackage>(getRecordsPackageConfig(ocid));

    if (!data || !data.records || !data.records.length) {
      throw new RequestError(404, 'Not found', { 'some test': 123 });
    }

    const { records } = data;

    const multiStage = records.find((record) => patterns.multiSageOcid.test(record.ocid));

    if (!multiStage) {
      throw new RequestError(404, `Records package hasn't multi stage record`);
    }

    const planningNotices = records.filter((record) => patterns.planningNoticeOcid.test(record.ocid));
    const contractNotices = records.filter((record) => patterns.contractNoticeOcid.test(record.ocid));
    const awardedContracts = records.filter((record) => patterns.awardedContractOcid.test(record.ocid));

    return {
      ...multiStageConverter(multiStage),
    };
  } catch (e) {
    console.log(e);
    return Object.create(e, {});
  }
};
