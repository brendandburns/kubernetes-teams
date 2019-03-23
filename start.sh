#!/bin/bash

export MICROSOFT_APP_ID=8796276b-832b-4311-bf3f-eb5f900df23b
export MICROSOFT_APP_PASSWORD=$(cat passwd.txt)
export WEBSITE_NODE_DEFAULT_VERSION=8.9.4

node src/app.js
