import logger from '../../libs/logger';
import { validator } from './validator';

(async () => {
  try {
    await validator();
  } catch (error) {
    logger.error(error);

    process.exit(0);
  }
})();
