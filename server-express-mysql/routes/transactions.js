var express = require("express");
var router = express.Router();
var models = require("../models");

//AJ added routes
//Jeff added to limit 10 for main page
router.get("/", function (req, res, next) {
    models.Transaction.findAll({
        limit:3,
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

router.get("/statements", function (req, res, next) {
    models.Transaction.findAll({
        order:[
            ['date', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

//Jeff added find by pk
//Jeff - tested and works in postman by pulling up the selected ID
router.get("/edit/:id", function (req, res, next) {
    let transactionId = parseInt(req.params.id);
    models.Transaction.findByPk(transactionId)
    .then(transactions => res.json(transactions));  
});

router.post("/", function (req, res, next) {
    let newTransaction = new models.Transaction();
    newTransaction.paymentType = req.body.paymentType;
    newTransaction.date = req.body.date;
    newTransaction.type = req.body.type;
    newTransaction.amount = req.body.amount;
    newTransaction.description = req.body.description;
    newTransaction.save().then(transaction => res.json(transaction));
});

//Jeff -tested and works in postman by udating a given ID. Update is aplied to main page and history
router.put("/edit/:id", function (req, res, next) {
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

router.get("/income", function (req, res, next) {
    models.Transaction.findAll({
        where: {
            type: 'Income' 
        },   
        attributes: [
            'type',
            'amount'
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeShow", function (req, res, next) {
    models.Transaction.findAll({
        where: {
            type:'income'
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeJune", function (req, res, next) {
    models.Transaction.findAll({
        where: {
            type:'income',
            date:'06-1-2020'
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expense", function (req, res, next) {
    models.Transaction.findAll({
        where: {
            type: 'Expense' 
        },   
        attributes: [
            'type',
            'amount',

        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseShow", function (req, res, next) {
    models.Transaction.findAll({
        where: {
            type:'expense'
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savings", function (req, res, next) {
    models.Transaction.findAll({
        where: {
            type: 'Savings' 
        },   
        attributes: [
            'type',
            'amount'
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsShow", function (req, res, next) {
    models.Transaction.findAll({
        where: {
            type:'savings'
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/lastAmount", function (req, res, next) {
    models.Transaction.findOne({
        attributes:[ 'amount' ],
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
})

module.exports = router;
