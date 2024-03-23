const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const admin = sequelize.define('admins', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = admin;
