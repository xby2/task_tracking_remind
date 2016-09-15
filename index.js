/**
 * Derp derp
 */
"use strict";

let settings = require('./config');
let slackService = require('~/slack-service');
let casperService = require('~/casper-service');

//Schedule logic

	//Get list of employees that have missing time over two weeks 
	let allEmployees = casperService.getActiveEmployees();

	let employeesWithMissingTime = _.filter(allEmployees, employee => {

		return casperService.needsToAddTime(employee.name);
	}, []); 

	//Send message to each employee
	employeesWithMissingTime.forEach(employee => {

		slackService.sendMessage(employee.email, settings.messageTemplate);
	});

	//Sample slack
	//slackService.sendMessage('mhussain@xby2.com', 'I realized this method of messaging is anonymous. Muah ha ha');


