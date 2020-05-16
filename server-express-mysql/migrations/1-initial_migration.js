'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Tasks", deps: []
 * createTable "Transactions", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-05-14T21:58:48.189Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Tasks",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "complete": {
                    "type": Sequelize.BOOLEAN,
                    "field": "complete"
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Transactions",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "paymentType": {
                    "type": Sequelize.STRING,
                    "field": "paymentType",
                    "allowNull": false
                },
                "date": {
                    "type": Sequelize.DATEONLY,
                    "field": "date",
                    "allowNull": true
                },
                "type": {
                    "type": Sequelize.STRING,
                    "field": "type",
                    "allowNull": false
                },
                "amount": {
                    "type": Sequelize.INTEGER,
                    "field": "amount",
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
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
                }
            },
            {}
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
