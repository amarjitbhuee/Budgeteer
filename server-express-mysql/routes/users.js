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
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// Return all app users (findAll)
// AJ confirmed working on Postman
router.get("/", function (req, res, next) {
  models.users.findAll({})
    .then(users => res.json(users));
});

// user signup with JWT Auth
// user signup
// AJ confirmed working on Postman
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

// user login
// AJ confirmed working on Postman
// user login frontend route
router.get('/login', function (req, res, next) {
  res.render('login');
});

// login with JWT Auth
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      username: req.body.username,
      // password: req.body.password
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

// secure transactions route (JWT)
router.get('/transactions', function (req, res, next) {
  let token = req.cookies.jwt;
  // after logout
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.render('transactions', {
            firstname: user.firstname,
            lastname: user.lastname,
          });
        }
        else {
          res.status(401);
          res.send('Must be logged in')
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
    if (user) {
      res.send('Login successful.');
      // res.redirect('/' + user.userid + '/transactions' );
    } else {
      res.send('Invalid login.');
    }
  });

// POST to transactions without JWT (Working)
// create new transaction
// AJ confirmed working on Postman
router.post('/:id/transactions', function (req, res, next) {
  models.transactions
    .create({
      userid: parseInt(req.params.id),
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
router.get('/profile/:id', function (req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id))
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
// AJ confirmed working on Postman
router.get("/:id", function (req, res, next) {
  models.users
    .findOne({
      // causes an error that transactions is not associated with users
      include: [{ model: models.transactions }],
      where: { userid: parseInt(req.params.id) }
    })
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    })
});

// router.post("/:id/transactions", function (req, res, next) {
//   let newTransaction = new models.transactions();
//   newTransaction.paymentType = req.body.paymentType;
//   newTransaction.date = req.body.date;
//   newTransaction.type = req.body.type;
//   newTransaction.amount = req.body.amount;
//   newTransaction.description = req.body.description;
//   newTransaction.save().then(transactions => res.json(transactions));
// });

router.get("/:id/expense", function (req, res, next) {
  models.users
    .findOne({
      // causes an error that transactions is not associated with users
      include: [{ model: models.transactions }],
      where: 
      { 
        userid: parseInt(req.params.id)     
      },
      attributes: ['transactions.type']      
    }).then()
    .findAll({
      where:{ type:'Expense'}
    })
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    })
});

// update user information
// create new transaction with user secured route
// router.post('/transactions', function (req, res, next) {
//   // let token = req.cookies.jwt;
//   // if (token) {
//   //   authService.verifyUser(token)
//   //   .then(user => {
//   //     if (user) {
//   //       res.render('transactions')
//   //     }  else {
//   //       res.status(401);
//   //       res.send('Must be logged in')
//   //       // console.log('Must be logged in');
//   //       // res.redirect('login')
//   //     }
//   //   })
//   // }
//   models.transactions
//     .create({
//       userid: parseInt(req.user.userid),
//       type: req.body.type,
//       amount: req.body.amount,
//       description: req.body.description,
//       date: req.body.date
//     })
//     .then(newTransaction => {
//       // JWT 
//       let token = authService.signUser(user);
//       res.cookie('jwt', token);
//       // res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(newTransaction));
//     })
//     .catch(err => {
//       res.status(400);
//       res.send(err.message);
//     })
// })

//findOne user and their transactions with JWT
// router.get('/:id', function (req, res, next) {
//   let token = req.cookies.jwt;
//   if (token) {
//     authService.verifyUser(token)
//       .then(user => {
//         if (user) {
//           res.render('users', {
//             include: [{ model: models.transactions }],
//             where: { userid: parseInt(req.params.id) },
//             firstname: user.firstname,
//             lastname: user.lastname
//           })
//         } else {
//           res.status(401);
//           res.send('Must be logged in')
//           // console.log('Must be logged in');
//           // res.redirect('login')
//         }
//       })
//   } else {
//     res.status(401);
//     res.send('Must be logged in')
//     // console.log('Must be logged in');
//     // res.redirect('login')
//   }
// });

// logout
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', '', { expire: new Date(0) });
  // res.send('Logged out');
  console.log('Logged out');
  res.redirect('login')
});

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
router.put('/', function (req, res, next) {
  let userId = parseInt(req.user.userid);

router.put('/:id', function (req, res, next) {
  let userId = parseInt(req.params.id);

  models.users.update(req.body, { where: { userid: userId } })
    .then(result => res.redirect('/users/' + userId))
    .catch(err => {
      res.status(400);
      res.send('There was a problem updating the user. Please check the user information.');
    });
});

// get user in update screen
router.get("/edituser/:id", function (req, res, next) {
  let userId = parseInt(req.params.id);
  models.users.findByPk(userId)
    .then(users => res.json(users));
});

router.put("/edituser/:id", function (req, res, next) {
  models.users.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    },
    {
      where: { userid: parseInt(req.params.id) }
    }
  ).then(user => res.json(user));
});

//delete
//AJ confirmed working on Postman
router.delete('/:id', function (req, res, next) {
  let userId = parseInt(req.params.id);
  models.users.findByPk(userId)
    // .destroy({ where: { userid: userId } })
    .then(users => users.destroy())
    .then(() => res.send({ userId }))

    //delete with user secured routes
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

// =====Admin functions==========

//findAll users
router.get('/', function (req, res, next) {
  let token = req.cookies.jwt;
  authService.verifyUser(token)
  // models.users
    .findAll({
      include: [{ model: models.transactions }]
        .then(usersFound => {
          res.setHeader('Content-Type', 'application/json')
          res.send(JSON.stringify(usersFound));
        })
    })
})

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

module.exports = router;
