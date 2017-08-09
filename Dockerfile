FROM r3ddox/node-pdftk:latest

ADD ./ /usr/app
WORKDIR /usr/app

RUN useradd -ms /bin/bash geekplanet
USER geekplanet

RUN npm install
RUN npm run build:production

CMD npm start
