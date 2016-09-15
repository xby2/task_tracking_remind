/**
 * Script to test casper services
 */
"use strict";

var casperService = require('~/casper-service');
var settings = require('./config');

console.log("Starting Application");

var casper = require('casper').create({
	verbose: true,
	logLevel: 'debug'
});

casper.echo("Starting Casper");

casper.on('remote.message', function(msg) {
	console.log('remote message is: ' + msg);
});

casper.start(settings.taskTrackingUrl);

//Wait and click active only
casper.waitForSelector('#filter-active', function() {

	casper.click('#filter-active');
	casper.capture("debug.png");

	var detailUrls = casper.evaluate(function() {
		console.log('Running on remote');
		var targetElements = document.querySelectorAll('.actions a:last-child');
		console.log(targetElements[0].innerHTML);

		var result = [];

		for (var i = 0; i < targetElements.length; i++) {
			result.push('https://'
				+ location.hostname
				+ targetElements[i].getAttribute('href'));
		};

		return result;		
	});

	casper.echo(detailUrls);

	var counter = 0;
	var users = [];
	casper.repeat(detailUrls.length, function() {

		casper.thenOpen(detailUrls[counter], function() {
			
			casper.waitForSelector('.display-label', function() {

				var user = casper.evaluate(function() {
					var targetElements = document.querySelectorAll('div.display-field');

					return {
						'username': targetElements[1].innerHTML.trim(),
						'name' : targetElements[7].innerHTML.trim() +
							' ' +
							targetElements[8].innerHTML.trim()
					};
				});

				console.log(user['username']);
				console.log(user['name']);

				users.push(user);
			});
		});

		counter++;
	});
});


casper.run();

//casperService.getActiveEmployees();