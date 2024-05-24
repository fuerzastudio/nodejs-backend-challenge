# Backend Challenge

## How to Set Up the Project

### Attencion
- For this project is recommended use Docker, but if don't going to use, run `npm run start:dev` on step 3.
#### 1. Copy the `.env.example` file to `.env`:

  ```bash
    cp .env.example .env
  ```

#### 2. Set the environment variables on `.env` file:
  ```bash
    DB_HOST=dockercontainername or locahost
    DB_USERNAME=postgresUser
    DB_PASSWORD=postgresUserPasssword
    DB_DATABASE=postgresDatabase
  ```

#### 3. Run Docker Compose:
  ```bash
    docker compose up
  ```

#### 4. Routes

- Before use the app, take a look on swagger at: `localhost:3000/doc`