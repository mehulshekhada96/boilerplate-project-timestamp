// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
require("dotenv").config;
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date_string?", function(req, res) {
  var reqString = req.params.date_string;
  var resDate;
  if (reqString == undefined) {
    resDate = new Date();
  } else {
    if (!/(^\d{4}-)|(^\d{2}-)/.test(reqString)) reqString = parseInt(reqString);
    resDate = new Date(reqString);
    if(/(^\d{2,}-\d{1,}-\d{0,})/)
    // this comparision is used to see if the date is a valid date, is there another way to do this?
    if (resDate.getTime() !== resDate.getTime()) {
      res.json({ error: "Invalid Date" });
    }
  }
  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
