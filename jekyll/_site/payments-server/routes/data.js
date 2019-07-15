var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


var jsonfile = require('jsonfile'); 

/* GET customer listing. */
router.get('/', function(req, res, next) {

  var file = './data/user.json'
  var obj = { name: 'JP' }
  jsonfile.writeFile(file, obj, function (err) {
    // res.send(obj);
    if (err) console.error(err)
  })
});
