import fastify from 'fastify';

import fastifySwagger from 'fastify-swagger';

import packageJson from '../../../package.json';

const register = (app: fastify.FastifyInstance): void => {
  app.register(fastifySwagger, {
    routePrefix: '/$wagger',
    exposeRoute: true,
    swagger: {
      info: {
        title: packageJson.description,
        description: 'Swagger API Documentation',
        version: packageJson.version,
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });
};

export default { register };
