var express = require("express");
var app = express();
// Static:
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

// Body Parser "POSTS/GET":
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Sessions:
var session = require('express-session');
app.use(session({
  secret: 'EsC1337',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
})) 

// Routes:
app.get("/", function(req, res){
  res.render("index");
});

// Post:
app.post("/submit", function(req, res){
  req.session.name = req.body.name;
  req.session.location = req.body.location;
  req.session.language = req.body.language;
  req.session.comment = req.body.comment;
  res.redirect("/result");
});

// Get:
app.get("/result", function(req, res){
  results = {
      name: req.session.name,
      location: req.session.location,
      language: req.session.language,
      comment: req.session.comment,
  }
  res.render("result", results);
});

// Listening:
app.listen(8000);
console.log("Running in localhost at port 8000");