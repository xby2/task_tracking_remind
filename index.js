/**
 * Derp derp
 */
"use strict";

var settings = require('./config');
var slackService = require('~/slack-service');
var casperService = require('~/casper-service');

//Schedule logic

slackService.sendMessage('jsallans@xby2.com', settings.messageTemplate);


