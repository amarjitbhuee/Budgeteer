var express = require('express');
var router = express.Router();
//Jeff: added mysql variable and ran npm --save mysql
var mysql = require('mysql2'); 

//Jeff: added connection to database, ***IF IT DOESNT WORK: check your password for the workbench, and created budgetapp schema ;)
var connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'Password1!',
  database: 'budgetapp'
});

connection.connect(function(err) {
  if (err) {
    console.error(err.message); 
    return;
  }
  console.log('Yay! Your are connected to the database!');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
