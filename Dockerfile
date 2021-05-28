FROM node:alpine

WORKDIR /app

RUN apk add python

COPY package.json .
COPY next.config.js .
COPY next-env.d.ts .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn

COPY src src

RUN yarn res:build
RUN yarn build

CMD ["yarn", "start"]