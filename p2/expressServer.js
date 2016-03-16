var express = require('express');
var app = express();
app.use('/fonts',express.static('fonts'));
app.use('/js',express.static('js'));
app.use('/css',express.static('css'));
app.use('/img',express.static('img'));

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server running at at http://%s:%s", host, port)
})

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile(__dirname+"/index.html");
})

app.get('/*.html', function (req, res) {
   console.log(__dirname);
   console.log(req.url);
   res.sendFile(__dirname+"/"+req.url);
})


// This responds a GET request for data.json
app.get('/data.json', function(req, res) {   
   console.log("Got a GET request for /data.json");
   res.sendFile(__dirname+"/data.json");
})


