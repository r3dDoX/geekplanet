#!/bin/bash

docker login -u=_ --password-stdin registry.heroku.com
docker build . --build-arg BUILD_ENV="production" -t registry.heroku.com/geekplanet/web
docker push registry.heroku.com/geekplanet/web
