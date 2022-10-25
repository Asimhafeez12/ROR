FROM node:9

ENV APP /usr/src/app
RUN mkdir $APP
WORKDIR $APP

COPY package.json yarn.lock $APP/
RUN yarn install

COPY . $APP/
CMD ["yarn", "run", "start"]
