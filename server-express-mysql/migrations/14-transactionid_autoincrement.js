'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "paymentType" on table "transactions"
 *
 **/

var info = {
    "revision": 14,
    "name": "transactionid_autoincrement",
    "created": "2020-05-25T02:37:32.572Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "transactions",
        "paymentType",
        {
            "type": Sequelize.STRING(255),
            "field": "paymentType",
            "allowNull": true
        }
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
