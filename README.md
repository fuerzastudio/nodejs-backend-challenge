# Node.js Backend Challenge 🚀

This project is a Node.js API for managing posts developed as a Node Backend Challenge.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- Jest
- Swagger
- Docker

## Installation

1. Clone the repository:

```bash
git clone https://github.com/zembruzkill/nodejs-backend-challenge.git
```

2. Install dependencies:

```bash
cd backend-challenge
npm install
```

## Environment Variables

Copy the `.env-example` file in the root directory of the project and rename it to `.env`. Then, fill in the variables in the `.env` file with your actual configuration values, such as database credentials, test database credentials, and secret_key.

```plaintext
PORT=3000

SECRET_KEY=your_secret_key

DB_USERNAME=postgres_user
DB_PASSWORD=postgres_user
DB_NAME=your_app_database
DB_HOST=localhost

TEST_DB_USERNAME=postgres_user
TEST_DB_PASSWORD=postgres_user
TEST_DB_NAME=your_test_database
TEST_DB_HOST=localhost
```

## PostgreSQL Docker Creation

Run the following command to create a PostgreSQL Docker container:

```bash
docker run --name postgres_db -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -p 5432:5432 -d postgres
```

Access the Postgres terminal (psql) running:

```bash
docker exec -it postgres_db psql -h localhost -U postgres -p 5432
```

Create the test database

```sql
CREATE DATABASE main_database;
CREATE DATABASE test_database;
```

## Migration

Run the migration to create the necessary tables in the databases (main and test):

```bash
npx sequelize-cli --env development db:migrate
npx sequelize-cli --env test db:migrate
```

## Seed

Run the seed to populate the database with initial data in the databases (main and test) :

```bash
npx sequelize-cli --env development db:seed:all
npx sequelize-cli --env test db:seed:all
```

## Usage

Start the server:

```bash
npm run start
```

The server will start on port 3000 by default. 🎉

## JWT Authentication

This project uses JWT (JSON Web Token) authentication for securing endpoints. To authenticate, you need to obtain a token by logging in with valid credentials. Here's how to authenticate:

1. Send a POST request to `api/auth/login/` with the following JSON payload:

```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

Note: If you're testing locally with seeded data, you can use the following test user credentials:

```
Email: user1@example.com
Password: password1
```

2. Upon successful authentication, you will receive a JWT token in the response.

3. Include this token in the `Authorization` header of subsequent requests, like this:

```
Authorization: Bearer your_jwt_token
```

4. The server will verify the token and grant access to protected endpoints if the token is valid.

## Running Tests

To run the tests, use the following command:

```bash
npm run test
```

## API endpoints documentation

### Authentication

#### POST /api/auth/login

Authenticate a user and generate a JWT token.

##### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

##### Responses

- 200 OK: Returns a JWT token.

  ```json
  {
    "token": "string"
  }
  ```

- 401 Unauthorized: If the user is not found or the password is invalid.

  ```json
  {
    "error": "User not found"
  }
  ```

- 401 Unauthorized: If the user is not found or the password is invalid.

  ```json
  {
    "error": "Invalid password"
  }
  ```

- 500 Internal Server Error: If an unexpected error occurs.

### Posts

For all POST, GET, PUT, and DELETE requests to `/api/posts`, you need to include a Bearer token in the request headers. The token can be obtained by logging in via the `/api/auth/login` endpoint.

#### POST /api/posts

Create a new post.

##### Request Headers

```plaintext
Authorization: Bearer <token>
```

##### Request Body

```json
{
  "title": "string",
  "body": "string",
  "tags": ["string"]
}
```

##### Responses

- 201 Created: Returns the created post.

  ```json
  {
    "message": "Post Created",
    "data": {
      "id": "string",
      "title": "string",
      "body": "string",
      "tags": ["string"]
    }
  }
  ```

- 500 Internal Server Error: If an unexpected error occurs.

#### GET /api/posts

Get all posts with pagination.

##### Request Headers

```plaintext
Authorization: Bearer <token>
```

##### Query Parameters

- `page`: Page number (default: 1)
- `limit`: Number of posts per page (default: 10)

##### Responses

- 200 OK: Returns the paginated list of posts.

  ```json
  {
    "page": 1,
    "limit": 10,
    "totalPosts": 1,
    "posts": [
      {
        "id": "string",
        "title": "string",
        "body": "string",
        "tags": ["string"]
      }
    ]
  }
  ```

- 404 Not Found: If no posts are found.

  ```json
  {
    "error": "No posts found"
  }
  ```

- 500 Internal Server Error: If an unexpected error occurs.

#### GET /api/posts/:id

Get a post by ID.

##### Request Headers

```plaintext
Authorization: Bearer <token>
```

##### Path Parameters

- `id`: Post ID

##### Responses

- 200 OK: Returns the post.

  ```json
  {
    "data": {
      "id": "string",
      "title": "string",
      "body": "string",
      "tags": ["string"]
    }
  }
  ```

- 404 Not Found: If the post is not found.

  ```json
  {
    "error": "Post not found"
  }
  ```

- 500 Internal Server Error: If an unexpected error occurs.

#### PUT /api/posts/:id

Update a post by ID.

##### Request Headers

```plaintext
Authorization: Bearer <token>
```

##### Path Parameters

- `id`: Post ID

##### Request Body

```json
{
  "title": "string",
  "body": "string",
  "tags": ["string"]
}
```

##### Responses

- 201 Created: Returns the updated post.

  ```json
  {
    "message": "Post Updated",
    "data": {
      "id": "string",
      "title": "string",
      "body": "string",
      "tags": ["string"]
    }
  }
  ```

- 404 Not Found: If the post is not found.

  ```json
  {
    "error": "Post not found"
  }
  ```

- 500 Internal Server Error: If an unexpected error occurs.

#### DELETE /api/posts/:id

Delete a post by ID.

##### Request Headers

```plaintext
Authorization: Bearer <token>
```

##### Path Parameters

- `id`: Post ID

##### Responses

- 200 OK: Returns a success message.

  ```json
  {
    "message": "Post Deleted Successfully"
  }
  ```

- 404 Not Found: If the post is not found.

  ```json
  {
    "error": "Post not found"
  }
  ```

- 500 Internal Server Error: If an unexpected error occurs.

## API Documentation with Swagger

You can find the API documentation using Swagger UI. After starting the server, navigate to `http://localhost:3000/api-docs` in your browser to access the documentation and explore the endpoints.
