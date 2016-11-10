/**
 * Script to test casper services
 */
"use strict";

//var casperService = require('~/casper-service');
var settings = require('./config');

console.log("Starting Application");

var options = {
	connection: {
		rejectUnauthorized: false,
		headers: {
		"Content-Type": "application/html"
		}
	},
	requestConfig: {
		timeout: 30000,
		noDelay: true,
		keepAlive: true,
		keepAliveDelay: 30000
	},
	responseConfig: {
		timeout: 30000
	}
};

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
						'userid': targetElements[0].innerHTML.trim(),
						'username': targetElements[1].innerHTML.trim(),
						'name' : targetElements[7].innerHTML.trim() +
							' ' +
							targetElements[8].innerHTML.trim()
					};
				});

				//Call api ?userId=142&start=2016-10-01&end=2016-10-12
				var today = new Date();

				console.log(today);

				var secondsInAday = 1000 * 60 * 60 * 24 * 2;

				var twoWeeksAgo = new Date(today.getTime() - 14 * secondsInAday);

				function getFormat(d) {
					return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay();
				}

				var queryString = '?userId=' + user.userid + '&start=' + getFormat(twoWeeksAgo) + '&end=' + getFormat(today); 

				console.log('after require', settings.adminCalendarUrl + queryString);

				casper.thenOpen(settings.adminCalendarUrl + queryString, {
					method: 'get',
					headers: {
						'Accept': 'application/json'
					}
				}, function() {

					var calendarData = JSON.parse(casper.getPageContent());

					var doesNotHaveTaskTrackingData = calendarData.length === 0;

					if (doesNotHaveTaskTrackingData) {

						console.log(user.name + " hasn't entered their time.");

						var slackService = require('~/slack-service');

						console.log("........derp");

						slackService.sendMessage("jsallans@xby2.com", "TO" + user.username + "" + settings.messageTemplate);
					}
				});
//				require('utils').dump(JSON.parse(casper.getPageContent()));
/*
				var xhr = new XMLHttpRequest();
				
				xhr.onreadystatechange = function () {
				  var DONE = 4; // readyState 4 means the request is done.
				  var OK = 200; // status 200 is a successful return.
				  console.log("response", JSON.stringify(xhr));
				  if (xhr.readyState === DONE) {
				    if (xhr.status === OK) {
						console.log(xhr.responseText); // 'This is the returned text.'
				    }
				    else {
						console.log('Error: ' + xhr.status); // An error occurred during the request.
				    }
				  }
				};

				xhr.open('GET', settings.adminCalendarUrl + queryString);
				xhr.send(null);


				/*client.get(settings.adminCalendarUrl + queryString, function(data, response) {

					console.log(JSON.stringigy(data));
				});*/

				//users.push(user);
			});
		});

		counter++;
	});

	console.log('YYYYYYY');
/*
	counter = 0;
	casper.repeat(users.length, function() {

		//Call api ?userId=142&start=2016-10-01&end=2016-10-12
		var today = new Date();

		var secondsInAday = 1000 * 60 * 60 * 24 * 2;

		var twoWeeksAgo = today - 14 * secondsInAday;

		function getFormat(d) {
			return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay();
		}

		var queryString = '?userId=' + users[counter].userid + '&start=' + getFormat(twoWeeksAgo) + '&end=' + getFormat(today); 

		console.log('before require');

		//var Client = require('node-rest-client').Client;
		//var client = new Client(options);

		console.log('after require', queryString);

		/*client.get(settings.adminCalendarUrl + queryString, function(data, response) {

			console.log(JSON.stringigy(data));
		});

		counter++;
	});	
*/
});


casper.run();

//casperService.getActiveEmployees();