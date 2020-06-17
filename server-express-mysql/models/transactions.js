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
  };
  
  