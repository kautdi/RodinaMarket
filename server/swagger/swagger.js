const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SneakerMarket',
      version: '1.0.0',
      description: 'API documentation for SneakerMarket',
    },
  },
  apis: ['../routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;