import axios from 'axios';
import { serviceConfig } from '../../../config';
import RequestError from '../../../libs/request-error';

import { getTenderStatus } from './get-tender-status';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('[validator] getTenderStatus', () => {
  it('Should request a tender by given id', async () => {
    await getTenderStatus('t');

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`http://localhost:${serviceConfig.port}/ocds/tenders/t`);
  });

  it('Should not return for a correct tender', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 200 });

    expect(await getTenderStatus('t')).toBe(undefined);
  });

  it('Should throw for an incorrect tender', async () => {
    (axios.get as jest.Mock).mockRejectedValue({
      response: {
        status: 500,
        data: {
          message: 'error',
        },
      },
    });

    await expect(getTenderStatus('t')).rejects.toEqual(new RequestError(500, 't: error'));
  });

  it('Should throw on request error', async () => {
    (axios.get as jest.Mock).mockRejectedValue({
      code: 404,
      message: 'm',
    });

    await expect(getTenderStatus('t')).rejects.toEqual(new RequestError(404, 'm'));
  });
});
