module.exports = function(models) {
    models.users.hasMany(models.transactions, {
        foreignKey: 'userid'
    });
}

