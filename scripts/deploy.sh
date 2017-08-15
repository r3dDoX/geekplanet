#!/bin/bash

# install heroku cli
wget -qO- https://toolbelt.heroku.com/install.sh | sh

# build and deploy docker image
heroku container:login --password=$1
heroku container:push web --app geekplanet-docker
