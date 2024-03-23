// models/booking.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const Booking = sequelize.define('Booking', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    service_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time_slot: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicle_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicle_model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    special_request: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    centerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Booking;
