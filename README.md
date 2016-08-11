# task_tracking_remind
Send slack reminder on task tracking time

## Technology

* Node.js (using ES6)
* NPM modules
  * Wavy
  * BotKit
  * Casperjs
  * Phantomjs
  * Lodash

## Install

1) Pull this repository

2) Install all npm modules
```
$ npm install
```
4) Create ~/config.js file
```JavaScript
"use strict";

module.exports = {
	slackToken: 'your token here',
	taskTrackingUrl: '',
	messageTemplate: 'FILL IN YOUR DATA',
};
```

## Deployment

1) Navigate to project directory
```
//npm start defined in package.json
//Actual command is node index.js
$ npm start
```
## Conventions

* JavaScript Hoisting for service files

## To Do

- [ ] Have action run on a schedule
- [ ] Use casperjs to scrap task tracking data
- [x] Send slack message to employees

## Contributors

[Jeff Sallans](https://github.com/JeffSallans)
Dave Farinelli
Bill Sun
Liban Abukar
Mohammed Hussain