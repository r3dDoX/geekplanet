FROM node

ADD ./ /usr/src/app
WORKDIR /usr/src/app

RUN npm install --silent
