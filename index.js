#!/usr/bin/env node

var google = require('google');
var myArgs = process.argv;

var isDomainInLink = function(domain , link) {
	if(domain === null || link === null) return false;

	return link.substr(0, ("http://www."+domain).length) === "http://www."+domain ||
	link.substr(0, ("http://"+domain).length) === "http://"+domain;	
}

var checkPossition = function(domain, searchKey, resultsPerPage) {
//	console.log(domain + " " + searchKey)
	google.resultsPerPage = resultsPerPage;
	var nextCounter = 0;
	google(searchKey, function(err, next, links){
  	if (err) console.error(err);

  	for (var i = 0; i < links.length; ++i) {
    		//console.log(links[i].title + ' - ' + links[i].link); //link.href is an alias for link.link
    		//console.log(links[i].description);
    		var link = links[i].link;
  		if(isDomainInLink(domain, link)) {
			var possition = i+1;
			console.log(domain + "\t" + possition === "" ? "empty" : possition + "\t" + searchKey + "");
			break;
		} 
	}

  	if (nextCounter < 0) {
    		nextCounter += 1;
    		if (next) next();
  	}

});}

var checkArgv = function(argv) {
	if(argv.length<4) {
		console.log("Run somthing like this: mmMySiteReport www.my.site.pl \"search key\" ");
		process.exit(1);
	}
	argv = argv.splice(0, 2);
}

checkArgv(myArgs);

console.log("Site \t possition in google \t words");
for(var i = 0; i < myArgs.length ; ) {
	checkPossition(myArgs[i] , myArgs[i+1], 15);	
	i = i + 2;
}


