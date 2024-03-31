// models/serviceSender.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceSender = sequelize.define('ServiceSender', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique :true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue : null
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profilePicture: {
        type: DataTypes.STRING, 
        allowNull: true,
        defaultValue: null 
    },
    role: {
        type: DataTypes.STRING, // Assuming role is a string
        allowNull: false
    },
    approved: {
        type: DataTypes.BOOLEAN, // Assuming approved is a boolean
        defaultValue: false // Default value is false
    }
});

module.exports = ServiceSender;

