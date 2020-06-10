import { AxiosRequestConfig } from 'axios';

import { publicPoint } from 'config';

export const getRecordsPackageConfig = (entity: 'budgets' | 'tenders', ocid: string): AxiosRequestConfig => {
  return {
    method: 'get',
    url: `${publicPoint.baseUrl}/${entity}/${ocid}`,
  };
};
