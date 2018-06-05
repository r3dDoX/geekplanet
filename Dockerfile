FROM r3ddox/node-pdftk:10.3.0

ARG BUILD_ENV="staging"

RUN adduser -D -u 1001 geekplanet

ADD ./ /usr/app
WORKDIR /usr/app

RUN chown geekplanet --recursive .
USER geekplanet

RUN npm install
RUN npm run build:$BUILD_ENV

CMD npm start
