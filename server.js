/* server.js */

var express = require('express');
var app = express();

app.use(express.static('src'));

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

var port = 4000;

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});

