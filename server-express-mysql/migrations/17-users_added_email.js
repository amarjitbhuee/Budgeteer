'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "email" to table "users"
 *
 **/

var info = {
    "revision": 17,
    "name": "users_added_email",
    "created": "2020-05-26T21:32:42.180Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "users",
        "email",
        {
            "type": Sequelize.STRING,
            "field": "email",
            "unique": true
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
