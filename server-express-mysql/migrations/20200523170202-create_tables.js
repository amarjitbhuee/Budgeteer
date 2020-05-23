'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      paymentType: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      transactionid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    }),
    ('users', {
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      firstname: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }),
    ('tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      complete: {
        type: Sequelize.INTEGER(1),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      tableName: 'tasks'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("transactions", "users", "tasks");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
