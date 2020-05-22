var express = require("express");
var router = express.Router();
var models = require("../models");

//AJ added routes
//Jeff added to limit 10 for main page
router.get("/", function (req, res, next) {
    models.Transaction.findAll({
        limit:10,
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

//Jeff added find all for history
router.get("/history", function (req, res, next) {
    models.Transaction.findAll({
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

//Jeff added find by pk !!!still working on it
router.get("/edit/:id", function (req, res, next) {
    let transactionId = parseInt(req.params.id);
    models.Transaction.findByPk(transactionId)
    .then(transaction => res.json(transaction));    
})

router.post("/", function (req, res, next) {
    let newTransaction = new models.Transaction();
    newTransaction.paymentType = req.body.paymentType;
    newTransaction.date = req.body.date;
    newTransaction.type = req.body.type;
    newTransaction.amount = req.body.amount;
    newTransaction.description = req.body.description;
    newTransaction.save().then(transaction => res.json(transaction));
});

router.put("/:id", function (req, res, next) {
    models.Transaction.update(
        {
            paymentType: req.body.paymentType,
            date: req.body.date,
            type: req.body.type,
            amount: req.body.amount,
            description: req.body.description
        },
        {
            where: { transactionid: parseInt(req.params.id) }
        }
    ).then(transaction => res.json(transaction));
});

router.delete("/:id", function (req, res, next) {
    let transactionId = parseInt(req.params.id);
    models.Transaction.findByPk(transactionId)
        .then(transaction => transaction.destroy())
        .then(() => res.send({ transactionId }))
        .catch(err => res.status(400).send(err));
});


// Look up one app user and their account activity (findOne)
// router.get('/users/:id', function (req, res, next) {
//     models.users.findByPk(parseInt(req.params.id), {
//         include: [{model: models.transaction}],
//     })
//     .then(userFound => {
//         res.setHeader('Content-type', 'application/json');
//         res.send(JSON.stringify(userFound));
//     })
//   });

module.exports = router;
