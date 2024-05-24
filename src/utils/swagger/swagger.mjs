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
      ResponseError: {
        $message: 'Error message'
      },
      InputUserRequest: {
        $name: 'Jhon Doe',
        $email: 'jhondoe@test.com',
        $password: '12345678'
      },
      InputUserLoginRequest: {
        $name: 'Jhon Doe',
        $password: '12345678'
      },
      InputUserLoginRequest: {
        $name: 'Jhon Doe',
        $password: '12345678'
      },
      UserResponse: {
        $id: 1,
        $name: 'Jhon Doe',
        $email: 'jhondoe@test.com'
      }
    }
  }            
};

const outputFile = './swagger-output.json';
const routes = ['../../routes/api/posts.mjs', '../../routes/api/users.mjs'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);