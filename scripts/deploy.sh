#!/bin/bash

docker login -u $1 -p $2 registry.heroku.com
docker push geekplanet-docker
