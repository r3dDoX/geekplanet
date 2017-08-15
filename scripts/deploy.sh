#!/bin/bash

# install heroku cli
which heroku

# build and deploy docker image
heroku container:login --password=$1
heroku container:push web --app geekplanet-docker
