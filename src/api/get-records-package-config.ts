import { AxiosRequestConfig } from 'axios';

import { publicPoint } from 'config';

export const getRecordsPackageConfig: (ocid: string) => AxiosRequestConfig = (ocid) => {
  return {
    method: 'get',
    url: `${publicPoint.baseUrl}/tenders/${ocid}`,
  };
};
