// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Handle Date API Processing...
Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};  

app.get("/api/:date?", function (req, res) {
	const { date } = req.params

	if (date === undefined) {
		nowDate = new Date()
		res.json({
			unix: nowDate.getTime(), 
			utc: nowDate.toGMTString()
		})
		return
	}

	let unixTime = Date.parse(date)
	unixTime = unixTime ? parseInt(unixTime) : parseInt(date)

	const realDate = new Date(date).isValid() ? new Date(date) : new Date(parseInt(date))
	if (realDate.isValid()) {
		res.json({unix: date, utc: realDate.toGMTString()})
	} else {
		res.json({error: "Invalid Date"})
	}
})


// listen for requests :)
var listener = app.listen(80, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
