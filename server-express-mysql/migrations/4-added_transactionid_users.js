'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "transactionid" to table "users"
 *
 **/

var info = {
    "revision": 4,
    "name": "added_transactionid_users",
    "created": "2020-05-19T05:13:18.620Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "users",
        "transactionid",
        {
            "type": Sequelize.INTEGER,
            "field": "transactionid",
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
