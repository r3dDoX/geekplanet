#!/bin/bash

docker login -u=_ -p="$1" registry.heroku.com
docker build . -t registry.heroku.com/geekplanet-docker/web
docker push registry.heroku.com/geekplanet-docker/web
