import fastify from 'fastify';

import { getRecordsPackage } from 'controllers/records-package';

export const tendersRoute = (app: fastify.FastifyInstance): void => {
  app.get(
    '/ocds/tenders/:ocid',
    {
      schema: {
        params: {
          type: 'object',
          required: ['ocid'],
          properties: {
            ocid: {
              type: 'string',
            },
          },
        },
        response: {
          404: {
            type: 'object',
            required: ['details'],
            properties: {
              message: { type: 'string' },
              details: {},
            },
          },
        },
      },
    },
    getRecordsPackage
  );
};
