FROM r3ddox/node-pdftk:8.4.0

ADD ./ /usr/app
WORKDIR /usr/app

RUN npm install
RUN npm run build:staging

CMD npm start
