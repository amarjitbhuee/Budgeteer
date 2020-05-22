<<<<<<< Updated upstream
"use strict";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", 
        {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {}
    );
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};
=======
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      }, 
      firstname: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(45),
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
        allowNull: true
      }
    }, {
      tableName: 'users'
    });
  };

  // users.associate = models => {
  //   users.hasMany(models.transaction, {
  //     onDelete: "cascade"
  //   })
  // }
>>>>>>> Stashed changes
