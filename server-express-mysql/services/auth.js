const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require("bcryptjs");

var authService ={
    signUser: function(user){
        const token = jwt.sign({
            username: user.username,
            userid: user.userid,
            // transactionid: transaction.transactionid
        }, 'secretkey', 
        {
            expiresIn: '1h'
        });
        return token;
    },
    verifyUser: function(token){
        try {
            let decoded = jwt.verify(token, 'secretkey');
            return models.users.findByPk((decoded.userid), {include: [{ model: models.transactions }]});
        } catch (err){
            console.log(err);
            return null;
        }
    },
    // verifyTransaction: function(token){
    //     try {
    //         let decoded = jwt.verify(token, 'secretkey');
    //         return models.transactions.findByPk(decoded.transactionid);
    //     } catch (err) {
    //         console.log(err);
    //         return null;
    //     }
    // },
    hashPassword: function(plainTextPassword){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    },
    comparePasswords: function(plainTextPassword, hashedPassword) {
        return bcrypt.compareSync(plainTextPassword, hashedPassword);
    }
}

module.exports = authService;