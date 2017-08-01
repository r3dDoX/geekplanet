FROM r3ddox/node-pdftk:latest

ADD ./ /usr/app
WORKDIR /usr/app

RUN adduser -D geekplanet
USER geekplanet

CMD npm start
