'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "id" from table "Transactions"
 * addColumn "transactionid" to table "Transactions"
 *
 **/

var info = {
    "revision": 3,
    "name": "transactions_id_transactionid",
    "created": "2020-05-19T04:19:31.318Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Transactions", "id"]
    },
    {
        fn: "addColumn",
        params: [
            "Transactions",
            "transactionid",
            {
                "type": Sequelize.INTEGER,
                "field": "transactionid",
                "autoIncrement": true,
                "primaryKey": true
            }
        ]
    }
];

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
