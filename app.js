'use strict'

const express = require("express");
const app     = express();
const path    = require("path");
const PORT = process.env.PORT || 5000
var xkcd = require('xkcd-api');
app.use(express.static(path.join(__dirname+'/uploads')));

const fs = require('fs');


// Send HTML at root
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Send Style
app.get('/style.css',function(req,res){
  //Feel free to change the contents of style.css to prettify your Web app
  res.sendFile(path.join(__dirname+'/public/style.css'));
});
app.get('/index.js',function(req,res){
   res.sendFile(path.join(__dirname+'/public/index.js'));
});

function myFunc() {
  xkcd.latest(function(error, response) {
    if (error) {
      console.error(error);
    } else {
      //image = response.img
      console.log(response.img)
      return response.img
    }
  });
}

app.get('/getimgsrc', function(req, res) {
  xkcd.get(req.query.data1, function(error, response) {
    if (error) {
      console.error(error);
      res.send({
        dat: 'error'
      });
    } else {
      //image = response.img
      res.send({
        dat: response
      });
    }
  });
});
app.get('/getrandomimgsrc', function(req, res) {
  xkcd.random(function(error, response) {
    if (error) {
      console.error(error);
      res.send({
        dat: 'error'
      });
    } else {
      res.send({
        dat: response
      });
    }
  });
});

app.get('/getlatestimgsrc', function(req, res) {
  xkcd.latest(function(error, response) {
    if (error) {
      console.error(error);
      res.send({
        dat: 'error'
      });
    } else {
      res.send({
        dat: response
      });
    }
  });
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
