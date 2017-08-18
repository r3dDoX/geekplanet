FROM r3ddox/node-pdftk:8.4.0

RUN adduser -D -u 1001 geekplanet

ADD ./ /usr/app
WORKDIR /usr/app

RUN chown geekplanet --recursive .
USER geekplanet

RUN npm install
RUN npm run build:staging

CMD npm start
