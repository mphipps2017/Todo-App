// For info on file sturcture and basics of Express/node https://www.terlici.com/2014/08/25/best-practices-express-structure.html
const express = require('express');
const app = express();
const mongo = require('./helpers/mongoUtil.js');
var db;

//app.use(express.static(__dirname + '/public'));
app.use(require('./routes/api'));

app.listen(3000, function() {
  console.log('Listening on port 3000...')
  mongo.connectToServer();
})

