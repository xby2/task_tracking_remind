# task_tracking_remind
Send slack reminder on task tracking time

## Technology

* Node.js
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

5) Install casperjs
```
$ npm install casperjs -g
```

5) Install phantomjs
```
$ npm install phantomjs -g
```

## Deployment

1) Navigate to project directory
```
//npm start defined in package.json
//Actual command is node index.js
$ npm start
```
## Conventions

* JavaScript Hosting for service files

## To Do

- [ ] Have action run on a schedule
- [ ] Use CasperJS to scrap task tracking data
- [x] Send slack message to employees

## Contributors

[Jeff Sallans](https://github.com/JeffSallans)

[Dave Farinelli](https://github.com/davefarinelli)

Bill Sun

Liban Abukar

Mohammed Hussain