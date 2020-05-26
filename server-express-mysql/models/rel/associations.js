module.exports = function(models) {
    // models.users.hasMany(models.transaction, {
    //     foreignKey: 'userid'
    // });
    // users.hasMany(transaction, {as: 
    //     'transactions', foreignKey: 'userid'
    // });
    
    models.transactions.belongsTo(models.users, {
        foreignKey: 'userId'
    });
    // models.users.hasMany(models.transaction, {
    //         foreignKey: 'userid'
    //     });
}

// module.exports = function(models) {
//     models.actor.belongsToMany(models.film, 
//         { 
//             through: models.film_actor, // film_actor is the one that has both actor_id and film_id
//             foreignKey: 'actor_id'
//         });
//     models.film.belongsToMany(models.actor,
//         {
//             through: models.film_actor,
//             foreignKey: 'film_id'
//         });
// }

