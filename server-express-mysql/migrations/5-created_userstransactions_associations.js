'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "transactionid" from table "users"
 * addColumn "userid" to table "Transactions"
 *
 **/

var info = {
    "revision": 5,
    "name": "created_userstransactions_associations",
    "created": "2020-05-19T17:33:32.571Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["users", "transactionid"]
    },
    {
        fn: "addColumn",
        params: [
            "Transactions",
            "userid",
            {
                "type": Sequelize.INTEGER,
                "field": "userid",
                "allowNull": true
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
