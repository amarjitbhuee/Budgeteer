/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('transactions', {
      paymentType: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
<<<<<<< HEAD:server-express-mysql/models/transaction.js
      }, 
      
    }, {}
    );
  Transaction.associate = function (models) {
    // associations can be defined here
=======
      },
      transactionid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userid'
        }
      }
    }, {
      tableName: 'transactions'
    });
>>>>>>> a9d8f69596f2f710578cf1f9e462db364f465b5a:server-express-mysql/models/transactions.js
  };
  
  