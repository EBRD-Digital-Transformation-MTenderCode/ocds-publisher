import axios from 'axios';
import { serviceConfig } from 'config';
import RequestError from '../../../libs/request-error';

export const getTenderStatus = async (id: string): Promise<void> => {
  try {
    await axios.get(`http://localhost:${serviceConfig.port}/ocds/tenders/${id}`);
  } catch (rejection) {
    if (rejection?.response) {
      const { response } = rejection;

      throw new RequestError(response.status, `${id}: ${response.data.message}`);
    } else {
      throw new RequestError(rejection.code, rejection.message);
    }
  }
};
