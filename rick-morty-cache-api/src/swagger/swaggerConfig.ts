import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rick and Morty Cache API',
      version: '1.0.0',
      description: 'API для кэширования и получения данных персонажей Rick and Morty',
    },
    components: {
      schemas: {
        ResultType: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
            species: {
              type: 'string',
            },
            type: {
              type: 'string',
            },
            gender: {
              type: 'string',
            },
            origin: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                url: {
                  type: 'string',
                },
              },
            },
            location: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                url: {
                  type: 'string',
                },
              },
            },
            image: {
              type: 'string',
            },
            episode: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            url: {
              type: 'string',
            },
            created: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/app/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: Express): void => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
