#!/bin/bash

HEROKU_API_KEY=$1 heroku container:login
heroku container:push web --app geekplanet-staging --arg BUILD_ENV="staging"
heroku container:release web --app geekplanet-staging