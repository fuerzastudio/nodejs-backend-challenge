import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'ForzaStudio Challenge',
    description: 'NodeJs ForzaStudio Backend Challenge'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['../routes/api/posts.mjs'];

swaggerAutogen()(outputFile, routes, doc);