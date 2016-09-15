var require = patchRequire(require);
var fs = require('fs');
var casper = require('casper').create({
	verbose: true,
	logLevel: "debug"
});

casper.debug = function(name) {
  this.capture(name + '.png');
  fs.write(name + ".html", casper.getHTML(undefined, true), 'w');
};

module.exports = casper;
