var express = require('express');
var router = express.Router();
var models = require('../models');
var Sequelize = require('sequelize');
var op = Sequelize.Op;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// Return all app users (findAll)
router.get("/", function (req, res, next) {
  models.users.findAll({})
    .then(users => res.json(users));
});

// Add users to the database
router.post("/", function (req, res, next) {
  let newUser = new models.users();
  newUser.firstname = req.body.firstname;
  newUser.lastname = req.body.lastname;
  newUser.username = req.body.username;
  newUser.save().then(users => res.json(users));
});
  
// if-else
  // .spread(function (result, created) {
  //   if (created) {
  //       res.redirect('/actors');
  //   } else {
  //       res.send('This actor already exists.');
  //   }
  // });


router.get("/:id", function (req, res, next) {
  models.users
  .findOne({
    // include: [{model: models.transactions}],
    where: { userid: parseInt(req.params.id)}
  })
  .then(usersFound => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(usersFound));
  })
});

router.post("/:id/transactions", function (req, res, next) {
  let newTransaction = new models.Transaction();
  newTransaction.paymentType = req.body.paymentType;
  newTransaction.date = req.body.date;
  newTransaction.type = req.body.type;
  newTransaction.amount = req.body.amount;
  newTransaction.description = req.body.description;
  newTransaction.save().then(transaction => res.json(transaction));
});

module.exports = router;
