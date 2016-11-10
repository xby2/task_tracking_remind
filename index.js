/**
 * Derp derp
 */
"use strict";

let settings = require('./config');
let slackService = require('~/slack-service');
let Casper = require('Casper');

var url = "http://google.com";
// load the page refered with 'url' with casper
var casper = Casper.create(url, {});
 
// once the page is loaded, execute that in our current nodejs context
casper.then(function executed_in_this_context() {
  console.log("page loaded");
});
 
// then, execute that in casperjs, and the second callback in the current nodejs context
casper.then(function executed_in_casperjs_context() {
  return 42;
}, function executed_in_this_context(ret) {
  console.log("it works: " + ret);
  
  // casper.exit() can be placed here too, instead of in the bottom :)
  // casper.exit();
});
 
// exit casper after executing the 2 previous 'then'
casper.exit();

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


