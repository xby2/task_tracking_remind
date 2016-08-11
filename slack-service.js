"use strict";

var settings = require('./config');
var Botkit = require('botkit');
var _ = require('lodash');
var controller = Botkit.slackbot();

//Setup connection
var bot = controller.spawn({

	//TODO: Add API Token Here
	token: settings.slackToken
});

module.exports = {
	sendMessage: sendMessage,
};

/**
 * Sends a direct message to the slack user with the given email
 * @param  {string} email
 * @param  {string} message
 */
function sendMessage(email, message) {

	bot.startRTM(function(err, bot, payload) {

		bot.api.users.list({}, function (err, response) {
			
			//Find user info
			var users = _.filter(response.members, function(user) {
				return user.profile.email === email;
			}) || [];

			//Send message if user exists
			if (users.length > 0) {

				//Select user to talk to
				var targetUser = users[0];
				bot.startPrivateConversation({
					user: targetUser.id
				},
				function(err, conversation) {

					//Send message
					conversation.say(message);
				});
			}
	    });
	});
}
