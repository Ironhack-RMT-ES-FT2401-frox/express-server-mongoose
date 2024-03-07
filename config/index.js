const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

function config(app) {

  // aqui aplicariamos cors

  // all middlewares & configurations here
  app.use(morgan("dev"));
  app.use(express.static("public"));
  
  // below two configurations will help express routes at correctly receiving data. 
  app.use(express.json()); // recognize an incoming Request Object as a JSON Object
  app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array

}

module.exports = config
