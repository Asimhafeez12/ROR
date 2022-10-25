
FROM node:9
#FROM ruby:2.5
FROM starefossen/ruby-node

ENV APP /usr/src/app
RUN mkdir $APP
WORKDIR $APP

COPY package.json yarn.lock $APP/
RUN yarn install

COPY . $APP/
CMD ["yarn", "run", "start"]

COPY Gemfile* $APP/
COPY package.json yarn.lock $APP/

RUN yarn install

RUN bundle install -j3 --path vendor/bundle

COPY . $APP/

CMD ["bundle", "exec", "rails", "server", "-p", "8080", "-b", "0.0.0.0"]
