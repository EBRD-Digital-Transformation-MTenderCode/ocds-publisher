FROM node:lts-slim

ARG SERVICE_PORT

ENV NODE_ENV=production
ENV NODE_PATH=./build/app

WORKDIR /usr/src/ocds-publisher

COPY package.json tsconfig.json yarn.lock ./
COPY src ./src

RUN yarn --production && yarn cache clean --force && yarn build

EXPOSE $SERVICE_PORT

CMD ["node", "build/app/index.js"]
