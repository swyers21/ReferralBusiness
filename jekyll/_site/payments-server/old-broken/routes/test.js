var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/help', function (req, res) {
  res.send('hello world')
})
