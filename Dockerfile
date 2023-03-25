FROM node:18-alpine

WORKDIR /usr/src/app


COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .


EXPOSE 5000

CMD [ "node", "index.js" ]