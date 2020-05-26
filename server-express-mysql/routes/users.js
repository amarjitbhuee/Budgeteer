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

// Add users to the database without if-else
// router.post("/", function (req, res, next) {
//   let newUser = new models.users();
//   newUser.firstname = req.body.firstname;
//   newUser.lastname = req.body.lastname;
//   newUser.username = req.body.username;
//   newUser.save().then(users => res.json(users));
// });

// findOrCreate a new User
router.post('/', function (req, res, next) {
  models.users.findOrCreate({
    where: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username
    }
  }).spread(function(result, created){
    if (created) {
      res.redirect('/users/' + result.userid);
    } else {
      res.status(400);
      res.send('Username already exists.');
    }
  })
})
  
// findAll users and their transactions
router.get('/transactions', function(req, res, next){
  models.users
  .findAll({include: [{ model: models.transactions }]})
  .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound))
  })
})

//findOne user and their transactions
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

// create new transaction
router.post('/:id/transactions', function(req, res, next){
  models.transactions
  .create(req.body)
  .then(newTransaction => {
    res.setHeader(JSON.stringify(newTransaction));
  })
  .catch(err => {
    res.status(400);
    res.send(err.message);
  })
})

// router.post("/:id/transactions", function (req, res, next) {
//   let newTransaction = new models.transactions();
//   newTransaction.paymentType = req.body.paymentType;
//   newTransaction.date = req.body.date;
//   newTransaction.type = req.body.type;
//   newTransaction.amount = req.body.amount;
//   newTransaction.description = req.body.description;
//   newTransaction.save().then(transactions => res.json(transactions));
// });

// update user information
router.put('/:id', function(req, res, next) {
  let userId = parseInt(req.params.id);

  models.users.update(req.body, {where: {userid: userId}})
  .then(result => res.redirect('/users/' + userId))
  .catch(err => {
    res.status(400);
    res.send('There was a problem updating the user. Please check the user information.');
  });
});

//delete
router.delete('/:id', function(req, res, next){
  let userId = parseInt(req.params.id);

  models.users
  .destroy({where: {userid: userId}})
  .then(result => res.redirect('/'))
  .catch(err => {
    res.status(400);
    res.send('There was a problem deleting the user. Please make sure you are specifying the correct id.')
  })
})

module.exports = router;
