FROM node

ADD package.json /tmp/package.json
RUN cd /tmp && npm install && \
    mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app
ADD ./ /usr/src/app