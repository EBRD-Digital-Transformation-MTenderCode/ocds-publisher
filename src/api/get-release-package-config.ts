import { AxiosRequestConfig } from 'axios';

import { publicPoint } from 'config';

export const getReleasePackageConfig = (
  entity: 'budgets' | 'tenders',
  ocid: string,
  cpid: string
): AxiosRequestConfig => {
  return {
    method: 'get',
    url: `${publicPoint.baseUrl}/${entity}/${ocid}/${cpid}`,
  };
};
