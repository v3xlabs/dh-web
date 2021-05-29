FROM node:16-buster

WORKDIR /app

COPY *.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

# RUN yarn res:build
RUN yarn build

CMD ["yarn", "start"]