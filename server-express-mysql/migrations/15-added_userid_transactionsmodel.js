'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "userid" to table "transactions"
 *
 **/

var info = {
    "revision": 15,
    "name": "added_userid_transactionsmodel",
    "created": "2020-05-25T20:03:10.091Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "transactions",
        "userid",
        {
            "type": Sequelize.INTEGER,
            "field": "userid",
            "allowNull": false
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
