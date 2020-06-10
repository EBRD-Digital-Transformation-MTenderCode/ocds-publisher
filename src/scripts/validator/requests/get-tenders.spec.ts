import axios from 'axios';
import RequestError from '../../../libs/request-error';
import { tendersUrl } from '../config';

import { getTenders } from './get-tenders';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('[validator] getTenders', () => {
  it('Should request for a list of tenders', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { data: {} },
    });

    await getTenders().next();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(tendersUrl);
  });

  describe('Non-empty data', () => {
    it('Should make another request with offset', async () => {
      (axios.get as jest.Mock)
        .mockResolvedValueOnce({
          data: {
            data: [1],
            offset: 'o',
          },
        })
        .mockResolvedValueOnce({
          data: {},
        });

      const call = await getTenders();
      await call.next();
      await call.next();

      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenLastCalledWith(`${tendersUrl}?offset=o`);
    });
  });

  describe('Empty data', () => {
    it('Should return undefined', async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        data: {
          data: [],
        },
      });

      const result = (await getTenders().next()).value;

      expect(result).toBe(undefined);
    });
  });

  it('Should throw on request rejection', async () => {
    (axios.get as jest.Mock).mockRejectedValue({
      response: {
        code: 404,
      },
      message: 'e',
    });

    await expect(getTenders().next()).rejects.toThrowError(new RequestError(404, 'e'));
  });
});
