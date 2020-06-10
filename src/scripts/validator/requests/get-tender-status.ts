import axios from 'axios';
import { serviceConfig } from 'config';
import RequestError from '../../../libs/request-error';

export const getTenderStatus = async (id: string): Promise<{ statusCode: number; message?: string }> => {
  try {
    const { status } = await axios.get(`http://localhost:${serviceConfig.port}/ocds/tenders/${id}`);

    return {
      statusCode: status,
    };
  } catch (rejection) {
    if ('response' in rejection && rejection.response) {
      const { response } = rejection;

      return {
        statusCode: response.status,
        message: `${id}: ${response.data.message}`,
      };
    } else {
      throw new RequestError(rejection.code, rejection.message);
    }
  }
};
