'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "transactions", deps: [users]
 *
 **/

var info = {
    "revision": 2,
    "name": "add_transactions",
    "created": "2020-06-02T23:05:46.889Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "transactions",
        {
            "paymentType": {
                "type": Sequelize.STRING(255),
                "field": "paymentType",
                "allowNull": true
            },
            "date": {
                "type": Sequelize.DATEONLY,
                "field": "date",
                "allowNull": true
            },
            "type": {
                "type": Sequelize.STRING(255),
                "field": "type",
                "allowNull": false
            },
            "amount": {
                "type": Sequelize.INTEGER,
                "field": "amount",
                "allowNull": false
            },
            "description": {
                "type": Sequelize.STRING(255),
                "field": "description",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            },
            "transactionid": {
                "type": Sequelize.INTEGER,
                "field": "transactionid",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "userid": {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "field": "userid",
                "references": {
                    "model": "users",
                    "key": "userid"
                },
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
