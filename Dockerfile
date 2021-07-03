FROM node:16-buster

WORKDIR /app

COPY --chown=node:node *.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn

COPY --chown=node:node . .

# RUN yarn res:build
RUN yarn build

USER node
CMD ["yarn", "start"]
