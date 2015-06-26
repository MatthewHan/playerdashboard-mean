// require the path module
var path = require("path");
// require express and create the express app
var express = require("express");
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
require('./server/config/mongoose.js');
// static content
app.use(express.static(path.join(__dirname, "./client")));
// set the views folder and set up ejs
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');
require('./server/config/routes.js')(app);
// listen on 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
})

