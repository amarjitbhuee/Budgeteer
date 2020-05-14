var express = require("express");
var router = express.Router();
var models = require("../models");

//AJ added routes
router.get("/", function (req, res, next) {
    models.Transaction.findAll().then(transactions => res.json(transactions));
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
            where: { id: parseInt(req.params.id) }
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
