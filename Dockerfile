FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY . .

EXPOSE 3000

COPY ./start.sh /app/start.sh

RUN chmod +x /app/start.sh

ENTRYPOINT [ "sh", "/app/start.sh" ]