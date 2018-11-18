#!/bin/bash

heroku container:login
heroku container:push web --app geekplanet --arg BUILD_ENV="production"
heroku container:release web --app geekplanet