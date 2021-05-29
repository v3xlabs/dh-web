FROM node:16-buster

WORKDIR /app

COPY package.json .
COPY next.config.js .
COPY next-env.d.ts .
COPY bsconfig.json .
COPY next-env.d.ts .
COPY tsconfig.json .
COPY yarn.lock .

RUN yarn

COPY src src

# RUN yarn res:build
RUN yarn build

CMD ["yarn", "start"]