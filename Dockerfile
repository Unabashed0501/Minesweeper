FROM node:16-alpine

ENV PORT 8080
EXPOSE 8080

COPY . /app
WORKDIR /app

RUN yarn install:all
RUN yarn build

CMD ["yarn", "deploy"]