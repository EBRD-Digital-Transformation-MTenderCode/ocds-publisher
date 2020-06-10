import { resolve } from 'path';
import { writeFileSync } from 'fs';
import logger from 'libs/logger';

import { getTenders, getTenderStatus } from './requests';

export const validator = async (): Promise<void> => {
  let tendersValidated = 0;

  for await (const tenders of getTenders()) {
    tenders.forEach((tender) => {
      tendersValidated += 1;

      getTenderStatus(tender.ocid).catch((error) => {
        const errorFilePath = resolve(__dirname, `../../../${+new Date()}.error.log`);

        writeFileSync(errorFilePath, `${error.toString()}`);

        logger.error(`Wrote encountered error to file ${errorFilePath}.`);

        process.exit(0);
      });
    });

    logger.info(`Tenders validated: ${tendersValidated}.`);
  }

  logger.info('All tenders have successfully been validated.');
  process.exit(1);
};
