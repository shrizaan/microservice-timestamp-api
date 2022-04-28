// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

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
app.get("/api", (req, res) => {
  const date = new Date();
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  const dateParams = req.params.date;
  if (!Date.parse(dateParams) && !Number(dateParams)) {
    return res.json({
      error: "Invalid Date",
    });
  } else if (!/[-]/.test(dateParams) && Number(dateParams)) {
    const date = new Date(Number(dateParams));
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }

  const date = new Date(dateParams);
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
