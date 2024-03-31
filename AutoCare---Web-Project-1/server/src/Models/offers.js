// models/Offer.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Offer = sequelize.define('Offer', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  discount_percentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  offer_image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  promo_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  centerId: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Offer;
