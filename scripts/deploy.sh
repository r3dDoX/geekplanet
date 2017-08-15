#!/bin/bash

docker login -u=_ -p="$1" registry.heroku.com
docker build . -t geekplanet-docker
docker push geekplanet-docker
