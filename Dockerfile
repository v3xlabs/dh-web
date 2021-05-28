FROM node:alpine

WORKDIR /app

COPY package.json .
COPY next.config.js .
COPY next-env.d.ts .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn

COPY src src

RUN yarn build

CMD ["yarn", "start"]