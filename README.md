# Backend Challenge

Simple Blog application made with NodeJS

### Technologies

- express
- sqlite
- sequelize
- jwt
- swagger
- jest

### Installation

```bash
npm install
```

### Configuration

This application uses `.env` file to configure some options

```bash
cp .env.example .env
```

Generate an JWT secret with this command:

```bash
npm run jwt:secret
```

Copy the created string and add to the .env file

### Docs

To see the swagger docs run the application with

```bash
npm run serve
```

And access the docs url: http://127.0.0.1:3000/api-docs

### Tests

To run the tests execute this command:

```bash
npm run test
```
