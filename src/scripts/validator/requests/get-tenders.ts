import axios from 'axios';

import RequestError from 'libs/request-error';
import { tendersUrl } from '../config';

interface TenderShort {
  ocid: string;
  date: string;
}

interface TendersShortPackage {
  data: TenderShort[];
  offset: string;
}

export async function* getTenders(url: string = tendersUrl): AsyncGenerator<TendersShortPackage['data']> {
  try {
    const { data } = await axios.get<TendersShortPackage>(url);
    const { data: tendersShortPackage, offset } = data;

    if (tendersShortPackage?.length) {
      yield tendersShortPackage;

      yield* getTenders(`${tendersUrl}?offset=${offset}`);
    }

    return;
  } catch ({ message, response }) {
    throw new RequestError(response?.code, message);
  }
}
