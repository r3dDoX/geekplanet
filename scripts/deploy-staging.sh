#!/bin/bash

echo "$1" | docker login -u=_ --password-stdin registry.heroku.com
docker build . --build-arg BUILD_ENV="staging" -t registry.heroku.com/geekplanet-staging/web
docker push registry.heroku.com/geekplanet-staging/web
heroku -v