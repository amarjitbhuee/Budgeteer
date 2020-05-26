'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "userid" from table "transactions"
 *
 **/

var info = {
    "revision": 13,
    "name": "removed_userid_transactions",
    "created": "2020-05-25T02:31:15.813Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["transactions", "userid"]
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
