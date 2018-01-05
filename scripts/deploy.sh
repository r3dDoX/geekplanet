#!/bin/bash

docker login -u=_ -p="$1" registry.heroku.com
docker build . --build-arg BUILD_ENV="production" -t registry.heroku.com/geekplanet/web
docker push registry.heroku.com/geekplanet/web
