'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "userId" from table "transactions"
 * changeColumn "userid" on table "transactions"
 * changeColumn "userid" on table "transactions"
 * changeColumn "userid" on table "transactions"
 * changeColumn "userid" on table "transactions"
 * changeColumn "email" on table "users"
 * changeColumn "password" on table "users"
 * changeColumn "password" on table "users"
 *
 **/

var info = {
    "revision": 18,
    "name": "removed_length_password",
    "created": "2020-05-29T23:52:51.449Z",
    "comment": ""
};

var migrationCommands = [{
    //     fn: "removeColumn",
    //     params: ["transactions", "userId"]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "transactions",
    //         "userid",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "field": "userid",
    //             "references": {
    //                 "model": "users",
    //                 "key": "userid"
    //             },
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "transactions",
    //         "userid",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "field": "userid",
    //             "references": {
    //                 "model": "users",
    //                 "key": "userid"
    //             },
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "transactions",
    //         "userid",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "field": "userid",
    //             "references": {
    //                 "model": "users",
    //                 "key": "userid"
    //             },
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "transactions",
    //         "userid",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "field": "userid",
    //             "references": {
    //                 "model": "users",
    //                 "key": "userid"
    //             },
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "users",
    //         "email",
    //         {
    //             "type": Sequelize.STRING,
    //             "field": "email",
    //             "allowNull": false,
    //             "unique": true
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "users",
    //         "password",
    //         {
    //             "type": Sequelize.STRING,
    //             "field": "password",
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
        fn: "changeColumn",
        params: [
            "users",
            "password",
            {
                "type": Sequelize.STRING,
                "field": "password",
                "allowNull": false
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
