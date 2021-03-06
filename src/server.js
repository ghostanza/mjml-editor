require('dotenv').config();

var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes.js'),
    port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../pub')));

// use the router
app.use(routes);

// 404 handler
app.use((req, res, next) => {
  res.status(404);
  res.redirect('/');
});

// 500 handler
app.use((err, req, res, next) => {
  console.log(chalk.bold.red(err));
  res.send("500 error");
});


app.listen(port);
console.log(chalk.bold.green(`Listening on port ${port}!`));
module.exports = app;
