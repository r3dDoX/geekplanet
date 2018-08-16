#!/bin/bash

heroku -v

echo $1 | docker login --username=_ --password-stdin registry.heroku.com
heroku container:push web --app geekplanet-staging --arg BUILD_ENV="staging"
