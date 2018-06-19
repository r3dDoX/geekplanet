#!/bin/bash

HEROKU_API_KEY="$1" heroku container:login
docker login --username=_ --password=$(heroku auth:token) registry.heroku.com
heroku container:push web --app geekplanet-staging --arg BUILD_ENV="staging"
