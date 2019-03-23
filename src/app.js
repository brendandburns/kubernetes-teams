'use strict';

var express = require('express');
var app = express();

var tabs = require('./tabs');
tabs.setup(app);

var bot = require('./bot');
bot.setup(app);

var port = process.env.PORT || 3333;

app.listen(port, function() {
    console.log(`Kubernetes Teams extension started listening on port ${port}`);
});
