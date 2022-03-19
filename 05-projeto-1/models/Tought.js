const { DataTypes } = require('sequelize');

const db = require('../db/conn');

//User
const User = require('./User');

const Tought = db.define('Tought', {
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
})

Tought.belongsTo(User); //o pensamento pertence a um usuário
User.hasMany(Tought); //o usuário tem muitos pensamentos

module.exports = Tought;