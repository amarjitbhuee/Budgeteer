var express = require('express');
var router = express.Router();
var models = require('../models');
var Sequelize = require('sequelize');
var op = Sequelize.Op;
var passport = require('../services/passport');
var authService = require('../services/auth');

// user signup frontend route
router.get('/signup', function (req, res, next) {
  res.render('signup');
});

// user signup with JWT Auth
//verified
router.post('/signup', function (req, res, next) {
  models.users.findOrCreate({
    where: { username: req.body.username },
    defaults: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: authService.hashPassword(req.body.password)
      // password: req.body.password
    }
  }).spread(function (result, created) {
    if (created) {
      // res.send("User created successfully.");
      res.redirect('login');
    } else {
      // res.status(400);
      res.send('That username already exist.');
    }
  })
})

// user login frontend route
router.get('/login', function (req, res, next) {
  res.render('login');
});

// login with JWT Auth
//verified
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      console.log('User not found');
      return res.status(401).json({
        message: "User not found"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        // res.send('Login successful');
        console.log('Login successful');
        res.redirect('transactions');
      } else {
        console.log('Wrong Password');
        res.redirect('login');
      }
    }
  });
});

//findOne users
router.get('/', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
  authService.verifyUser(token)
    .then(user => {
      if (user) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(user));
      } else {
        res.status(401);
        res.send('Invalid authentication token');
      }
    })
  } else {
    res.status(401);
    res.send('Must be logged in')
    // console.log('Must be logged in');
    // res.redirect('login')
  }
})

// create new transaction with user secured route
router.post('/transactions', function (req, res, next) {
  let token = req.cookies.jwt;
  // after logout
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        // console.log(user);
        if (user) {
          models.transactions
            .create({
              userid: parseInt(user.userid),
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
        }
        else {
          res.status(401);
          // res.send('Must be logged in');
          console.log('Must be logged in');
          res.redirect('login')
        }
      })
  };
});

// secure transactions route (JWT)
router.get('/transactions', function (req, res, next) {
  let token = req.cookies.jwt;
  // after logout
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(user));
          // res.render('transactions', {
          //   firstname: user.firstname,
          //   lastname: user.lastname,
          // });
        } else {
          res.status(401);
          res.send('Invalid authentication token')
          // console.log('Must be logged in');
          // res.redirect('login')
        }
      })
  } else {
    res.status(401);
    res.send('Must be logged in')
    // console.log('Must be logged in');
    // res.redirect('login')
  }
})

// update user information with JWT Authentication
router.put('/', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          let userid = parseInt(user.userid);
          models.users.update(req.body,
            {
              where: { userid: userid }
            })
            .then(result => res.redirect('/users'))
            .catch(err => {
              res.status(400);
              res.send('There was a problem updating the user. Please check the user information.');
            })
        }
      })
  }
})

// logout
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', '', { expire: new Date(0) });
  // res.send('Logged out');
  console.log('Logged out');
  res.redirect('login')
});

//GET function res.render with JWT (not working) 
router.get('/income_expenses', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          // res.setHeader('Content-Type', 'application/json');
          // res.send(JSON.stringify(user));
          res.render('income_expenses', {
            firstname: user.firstname,
            lastname: user.lastname,
            transactions: [{
              transactionid: transactions.transactionid,
              type: transactions.type,
              amount: transactions.amount,
              description: transactions.description,              
            }]
          });
        } else {
          res.status(401);
          res.send('Invalid authentication token')
          // console.log('Must be logged in');
          // res.redirect('login')
        }
      })
  } else {
    res.status(401);
    res.send('Must be logged in')
    // console.log('Must be logged in');
    // res.redirect('login')
  }
})



// user profile == for future updates. will contain add'l info i.e. history and stats
// AJ confirmed working on Postman
router.get('/profile', function (req, res, next) {
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

// update user information with secured route
// router.put('/', function (req, res, next) {
//   let userId = parseInt(req.user.userid);
//   models.users.update(req.body, { where: { userid: userId } })
//     .then(result => res.redirect('/users/' + userId))
//     .catch(err => {
//       res.status(400);
//       res.send('There was a problem updating the user. Please check the user information.');
//     });
// });


// =====Admin functions==========

//findOne user and their transactions
// router.get("/:id", function (req, res, next) {
//   models.users
//     .findOne({
//       include: [{ model: models.transactions }],
//       where: { userid: parseInt(req.params.id) }
//     })
//     .then(usersFound => {
//       let token = authService.signUser(user);
//       res.cookie('jwt', token);
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(usersFound));
//     })
// });

// Return all app users (findAll)
// AJ confirmed working on Postman
// router.get("/", function (req, res, next) {
//   models.users.findAll({})
//     .then(users => res.json(users));
// });

// findAll users and their transactions
// router.get('/transactions', function (req, res, next) {
//   models.users
//     .findAll({ include: [{ model: models.transactions }] })
//     .then(usersFound => {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(usersFound))
//     })
// })

// Test users/:id route. Not needed.
// router.get('/:id', function (req, res, next) {
//   models.users.findByPk(parseInt(req.params.id))
//     .then(user => {
//       if (user) {
//         res.render('user', {
//           firstname: user.firstname,
//           lastname: user.lastname
//         });
//       } else {
//         res.send('User not found');
//       }
//     });
// });

//delete with user secured routes
// router.delete('/', function (req, res, next) {
//   let userId = parseInt(req.user.userid);
//   models.users
//     .destroy({ where: { userid: userId } })
//     .then(result => res.redirect('/'))
//     .catch(err => {
//       res.status(400);
//       res.send('There was a problem deleting the user. Please make sure you are specifying the correct id.')
//     })
// })

module.exports = router;


