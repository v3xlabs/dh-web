FROM node:alpine

WORKDIR /app

RUN apk update
RUN apk add python2
RUN apk add re2c
RUN apk add g++
RUN apk add make

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