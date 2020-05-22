/* jshint indent: 2 */
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      transactionid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      paymentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },      
    }, {}
    );
  Transaction.associate = function (models) {
    // associations can be defined here
  };
  return Transaction;
};
