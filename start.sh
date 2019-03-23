#!/bin/bash

export MICROSOFT_APP_ID=19855b98-0e1e-4090-9892-4ae4b211bacd
export MICROSOFT_APP_PASSWORD=$(cat passwd.txt)
export WEBSITE_NODE_DEFAULT_VERSION=8.9.4

node src/app.js
