import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application, Express } from 'express';
import logger from '../utils/loggerUtils';
import dotenv from 'dotenv';

dotenv.config();
const domain = process.env.CLIENT_URL || 'http://localhost:3000';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NeoGenStudy API',
      version: '1.0.0',
      description: 'API documentation for managing users, study plans, and authentication',
    },
    servers: [
      {
        url: domain,
        description: 'Local Server',
      },
    ],
    tags: [
      { name: 'Users', description: 'Operations related to users' },
      { name: 'StudyPlans', description: 'Operations related to study plans' },
      { name: 'Authentication', description: 'Operations related to authentication' },
      { name: 'Cart', description: 'Operations related to cart management' },
      // { name: 'Favourites', description: 'Operations related to favourites' },
      { name: 'Orders', description: 'Operations related to order management' },
      { name: 'Payments', description: 'Operations related to payments' },
      { name: 'Addresses', description: 'Operations related to addresses' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer <token>',
        },
        ClientTypeHeader: {
          type: 'apiKey',
          in: 'header',
          name: 'x-client-type',
          description: 'Specify the client type (Flutter, Web, etc.)',
        },
        CookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
          description: 'Enter refresh token as a cookie',
        },
      },
    },
    security: [
      { BearerAuth: [] },
      { ClientTypeHeader: [] },
      { CookieAuth: [] },
    ],
  },
  apis: ['./src/routes/*.ts', './src/routes/**/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Application) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  logger.info(`Swagger Docs available at ${domain}/api-docs`);
}