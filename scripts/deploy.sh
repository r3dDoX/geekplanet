#!/bin/bash

HEROKU_API_KEY="$1" heroku container:login
heroku container:push web --app geekplanet --arg BUILD_ENV="production"
