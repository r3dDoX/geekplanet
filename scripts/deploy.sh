#!/bin/bash

docker login -u="$1" -p="$2" registry.heroku.com
docker build . -t geekplanet-docker
docker push geekplanet-docker
