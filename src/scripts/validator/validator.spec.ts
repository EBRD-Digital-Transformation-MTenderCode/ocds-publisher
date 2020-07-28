import { resolve } from 'path';
import { writeFileSync } from 'fs';
import axios from 'axios';
import logger from '../../libs/logger';
import RequestError from '../../libs/request-error';
import { validator } from './validator';

jest.mock('path', () => ({
  resolve: jest.fn().mockImplementation(() => expect.any(String)),
}));

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
}));

jest.mock('axios', () => ({
  get: jest.fn(),
}));

jest.mock('../../libs/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('validator', () => {
  // @ts-ignore
  const processExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

  describe('Error found', () => {
    beforeEach(async () => {
      (axios.get as jest.Mock)
        .mockResolvedValueOnce({
          data: {
            data: [
              {
                ocid: 'ocid',
              },
            ],
          },
        })
        .mockRejectedValueOnce({
          response: {
            status: 500,
            data: {
              message: 'error',
            },
          },
        });

      await validator();
    });

    it('Should write error to a file', () => {
      expect(resolve).toHaveBeenCalledWith(__dirname, expect.any(String));
      expect(writeFileSync).toHaveBeenCalledWith(expect.any(String), new RequestError(500, 'ocid: error').toString());
      expect(logger.error).toHaveBeenCalledWith(expect.any(String));
    });

    it('Should exit process with exit code 0', () => {
      expect(processExit).toHaveBeenCalledWith(0);
    });
  });

  describe('Errors not found', () => {
    beforeEach(async () => {
      (axios.get as jest.Mock)
        .mockResolvedValueOnce({
          data: {
            data: [
              {
                ocid: 'ocid',
              },
            ],
          },
        })
        .mockResolvedValueOnce({
          status: 200,
        });

      await validator();
    });

    it('Should log total validated tenders count after each iteration', () => {
      expect(logger.info).toHaveBeenNthCalledWith(1, `Tenders validated: 1.`);
    });

    it('Should log success at the end', () => {
      expect(logger.info).toHaveBeenLastCalledWith('All tenders have successfully been validated.');
    });

    it('Should exit process with exit code 1', () => {
      expect(processExit).toHaveBeenCalledWith(1);
    });
  });
});
