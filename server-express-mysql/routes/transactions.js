var express = require("express");
var router = express.Router();
var models = require("../models");

//AJ added routes
//Jeff added to limit 10 for main page
router.get("/", function (req, res, next) {
    models.Transaction.findAll({
        limit:10,
        order:[
            ['id', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

<<<<<<< HEAD
router.get("/:id", function (req, res, next) {
    models.Transaction.findByPk(req.params.id).then(user => res.json(user));
});

=======
//Jeff added find all for history
router.get("/history", function (req, res, next) {
    models.Transaction.findAll({
        order:[
            ['id', 'DESC']
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

>>>>>>> c4f20222fc2d14c5894baee5f7b99fe2ce21985f
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

module.exports = router;
