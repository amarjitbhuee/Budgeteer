var express = require('express');
var router = express.Router();
var models = require('../models');
var Sequelize = require('sequelize');
var op = Sequelize.Op;
var passport = require('../services/passport');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// Return all app users (findAll)
// AJ confirmed working on Postman
// router.get("/", function (req, res, next) {
//   models.users.findAll({})
//     .then(users => res.json(users));
// });

// user signup
// AJ confirmed working on Postman
router.post('/signup', function (req, res, next) {
  models.users.findOrCreate({
    where: { username: req.body.username },
    defaults: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    }
  }).spread(function (result, created) {
    if (created) {
      res.send("User created successfully.");
      res.redirect('login');
    } else {
      res.status(400);
      res.send('That username already exist.');
    }
  })
})

// Test login
router.get('/login', function(req, res, next){
  res.render('login');
});

// login with passport with user authorization
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login'
}), 
  function(req, res, next){
    res.redirect('/users/transactions');
  }
);

// test /:id/transactions route with user authorization
router.get('/transactions', function (req, res, next) {
  if (req.user) {
  models.users.findByPk(parseInt(req.user.userid))
    .then(user => {
      if (user) {
        res.render('transactions', {
          firstname: user.firstname,
          lastname: user.lastname
        });
      } else {
        res.send('User not found');
      }
    });
  } else {
    res.redirect('/users/login')
  }
});

// Test users/:id route with user authorization
router.get('/', function (req, res, next) {
  models.users.findByPk(parseInt(req.user.userid))
    .then(user => {
      if (user) {
        res.render('user', {
          firstname: user.firstname,
          lastname: user.lastname
        });
      } else {
        res.send('User not found');
      }
    });
});

// create new transaction with user authorization
router.post('/transactions', function (req, res, next) {
  models.transactions
    .create({
      userid: parseInt(req.user.userid),
      type: req.body.type,
      amount: req.body.amount,
      description: req.body.description,
      date: req.body.date
    })
    .then(newTransaction => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(newTransaction));
    })
    .catch(err => {
      res.status(400);
      res.send(err.message);
    })
})

// user profile
// AJ confirmed working on Postman
router.get('/profile/', function(req, res, next){
  models.users
    .findByPk(parseInt(req.user.userid))
    .then(user => {
      if (user) {
        // res.render('profile', {
        //   firstname: user.firstname,
        //   lastname: user.lastname,
        //   email: user.email,
        //   username: user.username
        // })
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(user));

      } else {
        res.send('User not found.');
      }
    })
})

// findAll users and their transactions
// router.get('/transactions', function (req, res, next) {
//   models.users
//     .findAll({ include: [{ model: models.transactions }] })
//     .then(usersFound => {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(usersFound))
//     })
// })

//findOne user and their transactions
// router.get("/:id", function (req, res, next) {
//   models.users
//     .findOne({
//       // causes an error that transactions is not associated with users
//       include: [{ model: models.transactions }],
//       where: { userid: parseInt(req.params.id) }
//     })
//     .then(usersFound => {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(usersFound));
//     })
// });

// update user information with user authorization
router.put('/', function (req, res, next) {
  let userId = parseInt(req.user.userid);
  models.users.update(req.body, { where: { userid: userId } })
    .then(result => res.redirect('/users/' + userId))
    .catch(err => {
      res.status(400);
      res.send('There was a problem updating the user. Please check the user information.');
    });
});

//delete with user authorization (secured routes)
router.delete('/', function (req, res, next) {
  let userId = parseInt(req.user.userid);

  models.users
    .destroy({ where: { userid: userId } })
    .then(result => res.redirect('/'))
    .catch(err => {
      res.status(400);
      res.send('There was a problem deleting the user. Please make sure you are specifying the correct id.')
    })
})



module.exports = router;
