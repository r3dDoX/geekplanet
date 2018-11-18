#!/bin/bash

cat ~/.netrc

HEROKU_API_KEY="$1" heroku login
echo "$1" | docker login -u=_ --password-stdin registry.heroku.com
heroku container:push web --app geekplanet-staging --arg BUILD_ENV="staging"
heroku container:release web --app geekplanet-staging