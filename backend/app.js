// For info on file sturcture and basics of Express/node https://www.terlici.com/2014/08/25/best-practices-express-structure.html
const express = require('express');
const app = express();
const mongo = require('./helpers/mongoUtil.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var db;

//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(require('./routes/api'));

app.listen(2000, function() {
  console.log('Listening on port 2000...')
  mongo.connectToServer();
})
