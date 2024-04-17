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

Download or clone this repo and install is dependencies

```bash
npm install
```

### Configuration

This application uses `.env` file to configure some variables

Copy the example file using the command below:

```bash
cp .env.example .env
```

Generate an JWT secret with this command:

```bash
npm run jwt:secret
```

Copy the created string and add to the `JWT_SECRET` param in the .env file

### Running the app

To run the application in dev mode, run the command below

```bash
npm run dev
```

It will auto-reload the app when any change in files are detected

### Docs

To see the swagger docs run the application with

```bash
npm run dev
```

And access the docs url: http://127.0.0.1:3000/api-docs

### Tests

To run the tests execute this command:

```bash
npm run test
```
