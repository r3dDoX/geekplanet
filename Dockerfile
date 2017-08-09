FROM r3ddox/node-pdftk:latest

ADD ./ /usr/app
WORKDIR /usr/app

RUN npm install
RUN npm run build:production

RUN useradd -ms /bin/bash geekplanet
USER geekplanet

CMD npm start
