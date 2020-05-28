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

//Jeff added find by pk
//Jeff - tested and works in postman by pulling up the selected ID
router.get("/edit/:id", function (req, res, next) {
    let transactionId = parseInt(req.params.id);
    models.Transaction.findByPk(transactionId)
    .then(transactions => res.json(transactions));  
});

router.post("/", function (req, res, next) {
    let newTransaction = new models.transactions();
    newTransaction.paymentType = req.body.paymentType;
    newTransaction.date = req.body.date;
    newTransaction.type = req.body.type;
    newTransaction.amount = req.body.amount;
    newTransaction.description = req.body.description;
    newTransaction.save().then(transactions => res.json(transactions));
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


module.exports = router;
