FROM r3ddox/node-pdftk:8.4.0

ENV user geekplanet
RUN groupadd --system $user && useradd --system --create-home --gid $user $user

ADD ./ /usr/app
WORKDIR /usr/app

RUN chown $user --recursive .
USER $user

RUN npm install
RUN npm run build:staging

CMD npm start
