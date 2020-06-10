import logger from 'libs/logger';

import { getTenders, getTenderStatus } from './requests';

export const validator = async (): Promise<void> => {
  const errors: string[] = [];
  let tendersValidated = 0;

  for await (const tenders of getTenders()) {
    const statuses = await Promise.all(
      tenders.map((tender) => {
        tendersValidated += 1;

        return Promise.resolve(getTenderStatus(tender.ocid));
      })
    );

    logger.info(`Tenders validated: ${tendersValidated}.`);

    errors.push(...statuses.filter(({ statusCode }) => statusCode !== 200).map(({ message }) => message as string));
  }

  if (errors.length) {
    errors.forEach((message) => logger.error(message));
    logger.info(`Total errors found: ${errors.length}.`);

    process.exit(0);
  }

  logger.info('All tenders have successfully been validated.');
  process.exit(1);
};
