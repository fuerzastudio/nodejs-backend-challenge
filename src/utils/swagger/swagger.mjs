import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',            
    title: 'NodeJs ForzaStudio',              
    description: 'NodeJs ForzaStudio Backend Challenge'         
  },
  servers: [
    {
      url: 'http://localhost:3000',              
    },
  ],
  components: {
    schemas: {
      InputPostRequest: {
        $title: 'Title Test',
        $body: 'Body test',
        $tags: ['Tags', 'Test', 'Swagger']
      },
      PostResponse: {
        $id: '1',
        $title: 'Title Test',
        $body: 'Body test',
        $tags: ['Tags', 'Test', 'Swagger']
      },
      GetPostsListRequest: {
        $page: 1
      },
      PostResponseList:{
        "data": [
          {
            "id": 1,
            "title": "Title Test",
            "body": "Body test",
            "tags": ["Tags", "Test", "Swagger"]
          }
        ],
        "count": 134
      },
      PostResponseError: {
        $message: 'Error message'
      }
    }
  }            
};

const outputFile = './swagger-output.json';
const routes = ['../../routes/api/index.mjs'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);