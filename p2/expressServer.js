var express = require('express');
var app = express();
// app.use(express.static('fonts'));
// app.use(express.static('js'));
// app.use(express.static('css'));
// app.use(express.static('img'));
app.use(express.static('public'));

// app.use('/static', express.static('public'));
// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile(__dirname+"/project-detail.html");

})


// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for data.json
app.get('/data.json', function(req, res) {   
   console.log("Got a GET request for /data.json");
   res.sendFile(__dirname+"/data.json");
})


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})