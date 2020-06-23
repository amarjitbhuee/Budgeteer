var express = require("express");
var router = express.Router();
var models = require("../models");

//AJ added routes
//Jeff added to limit 3 for main page
router.get("/", function (req, res, next) {
    models.transactions.findAll({
        limit:3,
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

//Jeff added find all for history
router.get("/history", function (req, res, next) {
    models.transactions.findAll({
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/statements", function (req, res, next) {
    models.transactions.findAll({
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
    models.transactions.findByPk(transactionId)
    .then(transactions => res.json(transactions));  
});

router.post("/", function (req, res, next) {
    let newTransaction = new models.transactions();
    newTransaction.userid = req.body.userid;
    newTransaction.paymentType = req.body.paymentType;
    newTransaction.date = req.body.date;
    newTransaction.type = req.body.type;
    newTransaction.amount = req.body.amount;
    newTransaction.description = req.body.description;
    newTransaction.save().then(transactions => res.json(transactions));
});

//Jeff -tested and works in postman by udating a given ID. Update is aplied to main page and history
router.put("/edit/:id", function (req, res, next) {
    models.transactions.update(
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
    models.transactions.findByPk(transactionId)
        .then(transaction => transaction.destroy())
        .then(() => res.send({ transactionId }))
        .catch(err => res.status(400).send(err));
});

router.get("/income", function (req, res, next) {
    models.transactions.findAll({
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
    models.transactions.findAll({
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
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '06-01-2020',
                '06-02-2020',
                '06-03-2020',
                '06-04-2020',
                '06-05-2020',
                '06-06-2020',
                '06-07-2020',
                '06-08-2020', 
                '06-09-2020',
                '06-10-2020',
                '06-11-2020',
                '06-12-2020',
                '06-13-2020',
                '06-14-2020',
                '06-15-2020',
                '06-16-2020',
                '06-17-2020',
                '06-18-2020',
                '06-19-2020',
                '06-20-2020',
                '06-21-2020',
                '06-22-2020',
                '06-23-2020',
                '06-24-2020',
                '06-25-2020',
                '06-26-2020',
                '06-27-2020',
                '06-28-2020',
                '06-29-2020',
                '06-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeJanuary", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '01-01-2020',
                '01-02-2020',
                '01-03-2020',
                '01-04-2020',
                '01-05-2020',
                '01-06-2020',
                '01-07-2020',
                '01-08-2020', 
                '01-09-2020',
                '01-10-2020',
                '01-11-2020',
                '01-12-2020',
                '01-13-2020',
                '01-14-2020',
                '01-15-2020',
                '01-16-2020',
                '01-17-2020',
                '01-18-2020',
                '01-19-2020',
                '01-20-2020',
                '01-21-2020',
                '01-22-2020',
                '01-23-2020',
                '01-24-2020',
                '01-25-2020',
                '01-26-2020',
                '01-27-2020',
                '01-28-2020',
                '01-29-2020',
                '01-30-2020',
                '01-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeFebruary", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '02-01-2020',
                '02-02-2020',
                '02-03-2020',
                '02-04-2020',
                '02-05-2020',
                '02-06-2020',
                '02-07-2020',
                '02-08-2020', 
                '02-09-2020',
                '02-10-2020',
                '02-11-2020',
                '02-12-2020',
                '02-13-2020',
                '02-14-2020',
                '02-15-2020',
                '02-16-2020',
                '02-17-2020',
                '02-18-2020',
                '02-19-2020',
                '02-20-2020',
                '02-21-2020',
                '02-22-2020',
                '02-23-2020',
                '02-24-2020',
                '02-25-2020',
                '02-26-2020',
                '02-27-2020',
                '02-28-2020',
                '02-29-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeMarch", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '03-01-2020',
                '03-02-2020',
                '03-03-2020',
                '03-04-2020',
                '03-05-2020',
                '03-06-2020',
                '03-07-2020',
                '03-08-2020', 
                '03-09-2020',
                '03-10-2020',
                '03-11-2020',
                '03-12-2020',
                '03-13-2020',
                '03-14-2020',
                '03-15-2020',
                '03-16-2020',
                '03-17-2020',
                '03-18-2020',
                '03-19-2020',
                '03-20-2020',
                '03-21-2020',
                '03-22-2020',
                '03-23-2020',
                '03-24-2020',
                '03-25-2020',
                '03-26-2020',
                '03-27-2020',
                '03-28-2020',
                '03-29-2020',
                '03-30-2020',
                '03-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeApril", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '04-01-2020',
                '04-02-2020',
                '04-03-2020',
                '04-04-2020',
                '04-05-2020',
                '04-06-2020',
                '04-07-2020',
                '04-08-2020', 
                '04-09-2020',
                '04-10-2020',
                '04-11-2020',
                '04-12-2020',
                '04-13-2020',
                '04-14-2020',
                '04-15-2020',
                '04-16-2020',
                '04-17-2020',
                '04-18-2020',
                '04-19-2020',
                '04-20-2020',
                '04-21-2020',
                '04-22-2020',
                '04-23-2020',
                '04-24-2020',
                '04-25-2020',
                '04-26-2020',
                '04-27-2020',
                '04-28-2020',
                '04-29-2020',
                '04-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeMay", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '05-01-2020',
                '05-02-2020',
                '05-03-2020',
                '05-04-2020',
                '05-05-2020',
                '05-06-2020',
                '05-07-2020',
                '05-08-2020', 
                '05-09-2020',
                '05-10-2020',
                '05-11-2020',
                '05-12-2020',
                '05-13-2020',
                '05-14-2020',
                '05-15-2020',
                '05-16-2020',
                '05-17-2020',
                '05-18-2020',
                '05-19-2020',
                '05-20-2020',
                '05-21-2020',
                '05-22-2020',
                '05-23-2020',
                '05-24-2020',
                '05-25-2020',
                '05-26-2020',
                '05-27-2020',
                '05-28-2020',
                '05-29-2020',
                '05-30-2020',
                '05-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeJuly", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '07-01-2020',
                '07-02-2020',
                '07-03-2020',
                '07-04-2020',
                '07-05-2020',
                '07-06-2020',
                '07-07-2020',
                '07-08-2020', 
                '07-09-2020',
                '07-10-2020',
                '07-11-2020',
                '07-12-2020',
                '07-13-2020',
                '07-14-2020',
                '07-15-2020',
                '07-16-2020',
                '07-17-2020',
                '07-18-2020',
                '07-19-2020',
                '07-20-2020',
                '07-21-2020',
                '07-22-2020',
                '07-23-2020',
                '07-24-2020',
                '07-25-2020',
                '07-26-2020',
                '07-27-2020',
                '07-28-2020',
                '07-29-2020',
                '07-30-2020',
                '07-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeAugust", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '08-01-2020',
                '08-02-2020',
                '08-03-2020',
                '08-04-2020',
                '08-05-2020',
                '08-06-2020',
                '08-07-2020',
                '08-08-2020', 
                '08-09-2020',
                '08-10-2020',
                '08-11-2020',
                '08-12-2020',
                '08-13-2020',
                '08-14-2020',
                '08-15-2020',
                '08-16-2020',
                '08-17-2020',
                '08-18-2020',
                '08-19-2020',
                '08-20-2020',
                '08-21-2020',
                '08-22-2020',
                '08-23-2020',
                '08-24-2020',
                '08-25-2020',
                '08-26-2020',
                '08-27-2020',
                '08-28-2020',
                '08-29-2020',
                '08-30-2020',
                '08-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeSeptember", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '09-01-2020',
                '09-02-2020',
                '09-03-2020',
                '09-04-2020',
                '09-05-2020',
                '09-06-2020',
                '09-07-2020',
                '09-08-2020', 
                '09-09-2020',
                '09-10-2020',
                '09-11-2020',
                '09-12-2020',
                '09-13-2020',
                '09-14-2020',
                '09-15-2020',
                '09-16-2020',
                '09-17-2020',
                '09-18-2020',
                '09-19-2020',
                '09-20-2020',
                '09-21-2020',
                '09-22-2020',
                '09-23-2020',
                '09-24-2020',
                '09-25-2020',
                '09-26-2020',
                '09-27-2020',
                '09-28-2020',
                '09-29-2020',
                '09-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeOctober", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '10-01-2020',
                '10-02-2020',
                '10-03-2020',
                '10-04-2020',
                '10-05-2020',
                '10-06-2020',
                '10-07-2020',
                '10-08-2020', 
                '10-09-2020',
                '10-10-2020',
                '10-11-2020',
                '10-12-2020',
                '10-13-2020',
                '10-14-2020',
                '10-15-2020',
                '10-16-2020',
                '10-17-2020',
                '10-18-2020',
                '10-19-2020',
                '10-20-2020',
                '10-21-2020',
                '10-22-2020',
                '10-23-2020',
                '10-24-2020',
                '10-25-2020',
                '10-26-2020',
                '10-27-2020',
                '10-28-2020',
                '10-29-2020',
                '10-30-2020',
                '10-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeNovember", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '11-01-2020',
                '11-02-2020',
                '11-03-2020',
                '11-04-2020',
                '11-05-2020',
                '11-06-2020',
                '11-07-2020',
                '11-08-2020', 
                '11-09-2020',
                '11-10-2020',
                '11-11-2020',
                '11-12-2020',
                '11-13-2020',
                '11-14-2020',
                '11-15-2020',
                '11-16-2020',
                '11-17-2020',
                '11-18-2020',
                '11-19-2020',
                '11-20-2020',
                '11-21-2020',
                '11-22-2020',
                '11-23-2020',
                '11-24-2020',
                '11-25-2020',
                '11-26-2020',
                '11-27-2020',
                '11-28-2020',
                '11-29-2020',
                '11-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/incomeDecember", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'income',
            date:[
                '12-01-2020',
                '12-02-2020',
                '12-03-2020',
                '12-04-2020',
                '12-05-2020',
                '12-06-2020',
                '12-07-2020',
                '12-08-2020', 
                '12-09-2020',
                '12-10-2020',
                '12-11-2020',
                '12-12-2020',
                '12-13-2020',
                '12-14-2020',
                '12-15-2020',
                '12-16-2020',
                '12-17-2020',
                '12-18-2020',
                '12-19-2020',
                '12-20-2020',
                '12-21-2020',
                '12-22-2020',
                '12-23-2020',
                '12-24-2020',
                '12-25-2020',
                '12-26-2020',
                '12-27-2020',
                '12-28-2020',
                '12-29-2020',
                '12-30-2020',
                '12-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expense", function (req, res, next) {
    models.transactions.findAll({
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
    models.transactions.findAll({
        where: {
            type:'expense'
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseJune", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '06-01-2020',
                '06-02-2020',
                '06-03-2020',
                '06-04-2020',
                '06-05-2020',
                '06-06-2020',
                '06-07-2020',
                '06-08-2020', 
                '06-09-2020',
                '06-10-2020',
                '06-11-2020',
                '06-12-2020',
                '06-13-2020',
                '06-14-2020',
                '06-15-2020',
                '06-16-2020',
                '06-17-2020',
                '06-18-2020',
                '06-19-2020',
                '06-20-2020',
                '06-21-2020',
                '06-22-2020',
                '06-23-2020',
                '06-24-2020',
                '06-25-2020',
                '06-26-2020',
                '06-27-2020',
                '06-28-2020',
                '06-29-2020',
                '06-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseJanuary", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '01-01-2020',
                '01-02-2020',
                '01-03-2020',
                '01-04-2020',
                '01-05-2020',
                '01-06-2020',
                '01-07-2020',
                '01-08-2020', 
                '01-09-2020',
                '01-10-2020',
                '01-11-2020',
                '01-12-2020',
                '01-13-2020',
                '01-14-2020',
                '01-15-2020',
                '01-16-2020',
                '01-17-2020',
                '01-18-2020',
                '01-19-2020',
                '01-20-2020',
                '01-21-2020',
                '01-22-2020',
                '01-23-2020',
                '01-24-2020',
                '01-25-2020',
                '01-26-2020',
                '01-27-2020',
                '01-28-2020',
                '01-29-2020',
                '01-30-2020',
                '01-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseFebruary", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '02-01-2020',
                '02-02-2020',
                '02-03-2020',
                '02-04-2020',
                '02-05-2020',
                '02-06-2020',
                '02-07-2020',
                '02-08-2020', 
                '02-09-2020',
                '02-10-2020',
                '02-11-2020',
                '02-12-2020',
                '02-13-2020',
                '02-14-2020',
                '02-15-2020',
                '02-16-2020',
                '02-17-2020',
                '02-18-2020',
                '02-19-2020',
                '02-20-2020',
                '02-21-2020',
                '02-22-2020',
                '02-23-2020',
                '02-24-2020',
                '02-25-2020',
                '02-26-2020',
                '02-27-2020',
                '02-28-2020',
                '02-29-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseMarch", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '03-01-2020',
                '03-02-2020',
                '03-03-2020',
                '03-04-2020',
                '03-05-2020',
                '03-06-2020',
                '03-07-2020',
                '03-08-2020', 
                '03-09-2020',
                '03-10-2020',
                '03-11-2020',
                '03-12-2020',
                '03-13-2020',
                '03-14-2020',
                '03-15-2020',
                '03-16-2020',
                '03-17-2020',
                '03-18-2020',
                '03-19-2020',
                '03-20-2020',
                '03-21-2020',
                '03-22-2020',
                '03-23-2020',
                '03-24-2020',
                '03-25-2020',
                '03-26-2020',
                '03-27-2020',
                '03-28-2020',
                '03-29-2020',
                '03-30-2020',
                '03-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseApril", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '04-01-2020',
                '04-02-2020',
                '04-03-2020',
                '04-04-2020',
                '04-05-2020',
                '04-06-2020',
                '04-07-2020',
                '04-08-2020', 
                '04-09-2020',
                '04-10-2020',
                '04-11-2020',
                '04-12-2020',
                '04-13-2020',
                '04-14-2020',
                '04-15-2020',
                '04-16-2020',
                '04-17-2020',
                '04-18-2020',
                '04-19-2020',
                '04-20-2020',
                '04-21-2020',
                '04-22-2020',
                '04-23-2020',
                '04-24-2020',
                '04-25-2020',
                '04-26-2020',
                '04-27-2020',
                '04-28-2020',
                '04-29-2020',
                '04-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseMay", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '05-01-2020',
                '05-02-2020',
                '05-03-2020',
                '05-04-2020',
                '05-05-2020',
                '05-06-2020',
                '05-07-2020',
                '05-08-2020', 
                '05-09-2020',
                '05-10-2020',
                '05-11-2020',
                '05-12-2020',
                '05-13-2020',
                '05-14-2020',
                '05-15-2020',
                '05-16-2020',
                '05-17-2020',
                '05-18-2020',
                '05-19-2020',
                '05-20-2020',
                '05-21-2020',
                '05-22-2020',
                '05-23-2020',
                '05-24-2020',
                '05-25-2020',
                '05-26-2020',
                '05-27-2020',
                '05-28-2020',
                '05-29-2020',
                '05-30-2020',
                '05-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseJuly", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '07-01-2020',
                '07-02-2020',
                '07-03-2020',
                '07-04-2020',
                '07-05-2020',
                '07-06-2020',
                '07-07-2020',
                '07-08-2020', 
                '07-09-2020',
                '07-10-2020',
                '07-11-2020',
                '07-12-2020',
                '07-13-2020',
                '07-14-2020',
                '07-15-2020',
                '07-16-2020',
                '07-17-2020',
                '07-18-2020',
                '07-19-2020',
                '07-20-2020',
                '07-21-2020',
                '07-22-2020',
                '07-23-2020',
                '07-24-2020',
                '07-25-2020',
                '07-26-2020',
                '07-27-2020',
                '07-28-2020',
                '07-29-2020',
                '07-30-2020',
                '07-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseAugust", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '08-01-2020',
                '08-02-2020',
                '08-03-2020',
                '08-04-2020',
                '08-05-2020',
                '08-06-2020',
                '08-07-2020',
                '08-08-2020', 
                '08-09-2020',
                '08-10-2020',
                '08-11-2020',
                '08-12-2020',
                '08-13-2020',
                '08-14-2020',
                '08-15-2020',
                '08-16-2020',
                '08-17-2020',
                '08-18-2020',
                '08-19-2020',
                '08-20-2020',
                '08-21-2020',
                '08-22-2020',
                '08-23-2020',
                '08-24-2020',
                '08-25-2020',
                '08-26-2020',
                '08-27-2020',
                '08-28-2020',
                '08-29-2020',
                '08-30-2020',
                '08-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseSeptember", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '09-01-2020',
                '09-02-2020',
                '09-03-2020',
                '09-04-2020',
                '09-05-2020',
                '09-06-2020',
                '09-07-2020',
                '09-08-2020', 
                '09-09-2020',
                '09-10-2020',
                '09-11-2020',
                '09-12-2020',
                '09-13-2020',
                '09-14-2020',
                '09-15-2020',
                '09-16-2020',
                '09-17-2020',
                '09-18-2020',
                '09-19-2020',
                '09-20-2020',
                '09-21-2020',
                '09-22-2020',
                '09-23-2020',
                '09-24-2020',
                '09-25-2020',
                '09-26-2020',
                '09-27-2020',
                '09-28-2020',
                '09-29-2020',
                '09-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseOctober", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '10-01-2020',
                '10-02-2020',
                '10-03-2020',
                '10-04-2020',
                '10-05-2020',
                '10-06-2020',
                '10-07-2020',
                '10-08-2020', 
                '10-09-2020',
                '10-10-2020',
                '10-11-2020',
                '10-12-2020',
                '10-13-2020',
                '10-14-2020',
                '10-15-2020',
                '10-16-2020',
                '10-17-2020',
                '10-18-2020',
                '10-19-2020',
                '10-20-2020',
                '10-21-2020',
                '10-22-2020',
                '10-23-2020',
                '10-24-2020',
                '10-25-2020',
                '10-26-2020',
                '10-27-2020',
                '10-28-2020',
                '10-29-2020',
                '10-30-2020',
                '10-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseNovember", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '11-01-2020',
                '11-02-2020',
                '11-03-2020',
                '11-04-2020',
                '11-05-2020',
                '11-06-2020',
                '11-07-2020',
                '11-08-2020', 
                '11-09-2020',
                '11-10-2020',
                '11-11-2020',
                '11-12-2020',
                '11-13-2020',
                '11-14-2020',
                '11-15-2020',
                '11-16-2020',
                '11-17-2020',
                '11-18-2020',
                '11-19-2020',
                '11-20-2020',
                '11-21-2020',
                '11-22-2020',
                '11-23-2020',
                '11-24-2020',
                '11-25-2020',
                '11-26-2020',
                '11-27-2020',
                '11-28-2020',
                '11-29-2020',
                '11-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/expenseDecember", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'expense',
            date:[
                '12-01-2020',
                '12-02-2020',
                '12-03-2020',
                '12-04-2020',
                '12-05-2020',
                '12-06-2020',
                '12-07-2020',
                '12-08-2020', 
                '12-09-2020',
                '12-10-2020',
                '12-11-2020',
                '12-12-2020',
                '12-13-2020',
                '12-14-2020',
                '12-15-2020',
                '12-16-2020',
                '12-17-2020',
                '12-18-2020',
                '12-19-2020',
                '12-20-2020',
                '12-21-2020',
                '12-22-2020',
                '12-23-2020',
                '12-24-2020',
                '12-25-2020',
                '12-26-2020',
                '12-27-2020',
                '12-28-2020',
                '12-29-2020',
                '12-30-2020',
                '12-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savings", function (req, res, next) {
    models.transactions.findAll({
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
    models.transactions.findAll({
        where: {
            type:'savings'
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsJune", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '06-01-2020',
                '06-02-2020',
                '06-03-2020',
                '06-04-2020',
                '06-05-2020',
                '06-06-2020',
                '06-07-2020',
                '06-08-2020', 
                '06-09-2020',
                '06-10-2020',
                '06-11-2020',
                '06-12-2020',
                '06-13-2020',
                '06-14-2020',
                '06-15-2020',
                '06-16-2020',
                '06-17-2020',
                '06-18-2020',
                '06-19-2020',
                '06-20-2020',
                '06-21-2020',
                '06-22-2020',
                '06-23-2020',
                '06-24-2020',
                '06-25-2020',
                '06-26-2020',
                '06-27-2020',
                '06-28-2020',
                '06-29-2020',
                '06-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsJanuary", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '01-01-2020',
                '01-02-2020',
                '01-03-2020',
                '01-04-2020',
                '01-05-2020',
                '01-06-2020',
                '01-07-2020',
                '01-08-2020', 
                '01-09-2020',
                '01-10-2020',
                '01-11-2020',
                '01-12-2020',
                '01-13-2020',
                '01-14-2020',
                '01-15-2020',
                '01-16-2020',
                '01-17-2020',
                '01-18-2020',
                '01-19-2020',
                '01-20-2020',
                '01-21-2020',
                '01-22-2020',
                '01-23-2020',
                '01-24-2020',
                '01-25-2020',
                '01-26-2020',
                '01-27-2020',
                '01-28-2020',
                '01-29-2020',
                '01-30-2020',
                '01-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsFebruary", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '02-01-2020',
                '02-02-2020',
                '02-03-2020',
                '02-04-2020',
                '02-05-2020',
                '02-06-2020',
                '02-07-2020',
                '02-08-2020', 
                '02-09-2020',
                '02-10-2020',
                '02-11-2020',
                '02-12-2020',
                '02-13-2020',
                '02-14-2020',
                '02-15-2020',
                '02-16-2020',
                '02-17-2020',
                '02-18-2020',
                '02-19-2020',
                '02-20-2020',
                '02-21-2020',
                '02-22-2020',
                '02-23-2020',
                '02-24-2020',
                '02-25-2020',
                '02-26-2020',
                '02-27-2020',
                '02-28-2020',
                '02-29-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsMarch", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '03-01-2020',
                '03-02-2020',
                '03-03-2020',
                '03-04-2020',
                '03-05-2020',
                '03-06-2020',
                '03-07-2020',
                '03-08-2020', 
                '03-09-2020',
                '03-10-2020',
                '03-11-2020',
                '03-12-2020',
                '03-13-2020',
                '03-14-2020',
                '03-15-2020',
                '03-16-2020',
                '03-17-2020',
                '03-18-2020',
                '03-19-2020',
                '03-20-2020',
                '03-21-2020',
                '03-22-2020',
                '03-23-2020',
                '03-24-2020',
                '03-25-2020',
                '03-26-2020',
                '03-27-2020',
                '03-28-2020',
                '03-29-2020',
                '03-30-2020',
                '03-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsApril", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '04-01-2020',
                '04-02-2020',
                '04-03-2020',
                '04-04-2020',
                '04-05-2020',
                '04-06-2020',
                '04-07-2020',
                '04-08-2020', 
                '04-09-2020',
                '04-10-2020',
                '04-11-2020',
                '04-12-2020',
                '04-13-2020',
                '04-14-2020',
                '04-15-2020',
                '04-16-2020',
                '04-17-2020',
                '04-18-2020',
                '04-19-2020',
                '04-20-2020',
                '04-21-2020',
                '04-22-2020',
                '04-23-2020',
                '04-24-2020',
                '04-25-2020',
                '04-26-2020',
                '04-27-2020',
                '04-28-2020',
                '04-29-2020',
                '04-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsMay", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '05-01-2020',
                '05-02-2020',
                '05-03-2020',
                '05-04-2020',
                '05-05-2020',
                '05-06-2020',
                '05-07-2020',
                '05-08-2020', 
                '05-09-2020',
                '05-10-2020',
                '05-11-2020',
                '05-12-2020',
                '05-13-2020',
                '05-14-2020',
                '05-15-2020',
                '05-16-2020',
                '05-17-2020',
                '05-18-2020',
                '05-19-2020',
                '05-20-2020',
                '05-21-2020',
                '05-22-2020',
                '05-23-2020',
                '05-24-2020',
                '05-25-2020',
                '05-26-2020',
                '05-27-2020',
                '05-28-2020',
                '05-29-2020',
                '05-30-2020',
                '05-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsJuly", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '07-01-2020',
                '07-02-2020',
                '07-03-2020',
                '07-04-2020',
                '07-05-2020',
                '07-06-2020',
                '07-07-2020',
                '07-08-2020', 
                '07-09-2020',
                '07-10-2020',
                '07-11-2020',
                '07-12-2020',
                '07-13-2020',
                '07-14-2020',
                '07-15-2020',
                '07-16-2020',
                '07-17-2020',
                '07-18-2020',
                '07-19-2020',
                '07-20-2020',
                '07-21-2020',
                '07-22-2020',
                '07-23-2020',
                '07-24-2020',
                '07-25-2020',
                '07-26-2020',
                '07-27-2020',
                '07-28-2020',
                '07-29-2020',
                '07-30-2020',
                '07-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsAugust", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '08-01-2020',
                '08-02-2020',
                '08-03-2020',
                '08-04-2020',
                '08-05-2020',
                '08-06-2020',
                '08-07-2020',
                '08-08-2020', 
                '08-09-2020',
                '08-10-2020',
                '08-11-2020',
                '08-12-2020',
                '08-13-2020',
                '08-14-2020',
                '08-15-2020',
                '08-16-2020',
                '08-17-2020',
                '08-18-2020',
                '08-19-2020',
                '08-20-2020',
                '08-21-2020',
                '08-22-2020',
                '08-23-2020',
                '08-24-2020',
                '08-25-2020',
                '08-26-2020',
                '08-27-2020',
                '08-28-2020',
                '08-29-2020',
                '08-30-2020',
                '08-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsSeptember", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '09-01-2020',
                '09-02-2020',
                '09-03-2020',
                '09-04-2020',
                '09-05-2020',
                '09-06-2020',
                '09-07-2020',
                '09-08-2020', 
                '09-09-2020',
                '09-10-2020',
                '09-11-2020',
                '09-12-2020',
                '09-13-2020',
                '09-14-2020',
                '09-15-2020',
                '09-16-2020',
                '09-17-2020',
                '09-18-2020',
                '09-19-2020',
                '09-20-2020',
                '09-21-2020',
                '09-22-2020',
                '09-23-2020',
                '09-24-2020',
                '09-25-2020',
                '09-26-2020',
                '09-27-2020',
                '09-28-2020',
                '09-29-2020',
                '09-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsOctober", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '10-01-2020',
                '10-02-2020',
                '10-03-2020',
                '10-04-2020',
                '10-05-2020',
                '10-06-2020',
                '10-07-2020',
                '10-08-2020', 
                '10-09-2020',
                '10-10-2020',
                '10-11-2020',
                '10-12-2020',
                '10-13-2020',
                '10-14-2020',
                '10-15-2020',
                '10-16-2020',
                '10-17-2020',
                '10-18-2020',
                '10-19-2020',
                '10-20-2020',
                '10-21-2020',
                '10-22-2020',
                '10-23-2020',
                '10-24-2020',
                '10-25-2020',
                '10-26-2020',
                '10-27-2020',
                '10-28-2020',
                '10-29-2020',
                '10-30-2020',
                '10-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsNovember", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '11-01-2020',
                '11-02-2020',
                '11-03-2020',
                '11-04-2020',
                '11-05-2020',
                '11-06-2020',
                '11-07-2020',
                '11-08-2020', 
                '11-09-2020',
                '11-10-2020',
                '11-11-2020',
                '11-12-2020',
                '11-13-2020',
                '11-14-2020',
                '11-15-2020',
                '11-16-2020',
                '11-17-2020',
                '11-18-2020',
                '11-19-2020',
                '11-20-2020',
                '11-21-2020',
                '11-22-2020',
                '11-23-2020',
                '11-24-2020',
                '11-25-2020',
                '11-26-2020',
                '11-27-2020',
                '11-28-2020',
                '11-29-2020',
                '11-30-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/savingsDecember", function (req, res, next) {
    models.transactions.findAll({
        where: {
            type:'savings',
            date:[
                '12-01-2020',
                '12-02-2020',
                '12-03-2020',
                '12-04-2020',
                '12-05-2020',
                '12-06-2020',
                '12-07-2020',
                '12-08-2020', 
                '12-09-2020',
                '12-10-2020',
                '12-11-2020',
                '12-12-2020',
                '12-13-2020',
                '12-14-2020',
                '12-15-2020',
                '12-16-2020',
                '12-17-2020',
                '12-18-2020',
                '12-19-2020',
                '12-20-2020',
                '12-21-2020',
                '12-22-2020',
                '12-23-2020',
                '12-24-2020',
                '12-25-2020',
                '12-26-2020',
                '12-27-2020',
                '12-28-2020',
                '12-29-2020',
                '12-30-2020',
                '12-31-2020'
            ]
        },
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
});

router.get("/lastAmount", function (req, res, next) {
    models.transactions.findOne({
        attributes:[ 'amount' ],
        order:[
            ['transactionid', 'DESC']
        ]
    })
    .then(transactions => res.json(transactions));
})

module.exports = router;
