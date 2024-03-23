const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceSubmission = sequelize.define('ServiceSubmission', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = ServiceSubmission;
