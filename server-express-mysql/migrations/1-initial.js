'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "sequelizemeta", deps: []
 * createTable "tasks", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2020-06-02T23:04:21.120Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "sequelizemeta",
            {
                "name": {
                    "type": Sequelize.STRING(255),
                    "field": "name",
                    "primaryKey": true,
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
    },
    {
        fn: "createTable",
        params: [
            "tasks",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING(255),
                    "field": "name",
                    "allowNull": true
                },
                "complete": {
                    "type": Sequelize.INTEGER(1),
                    "field": "complete",
                    "allowNull": true
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
            "users",
            {
                "userid": {
                    "type": Sequelize.INTEGER,
                    "field": "userid",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "firstname": {
                    "type": Sequelize.STRING(45),
                    "field": "firstname",
                    "allowNull": false
                },
                "lastname": {
                    "type": Sequelize.STRING(45),
                    "field": "lastname",
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING(45),
                    "field": "username",
                    "allowNull": false,
                    "unique": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "allowNull": false,
                    "unique": true
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
