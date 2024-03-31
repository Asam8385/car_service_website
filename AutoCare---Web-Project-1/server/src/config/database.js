const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'Pro',
    'root',
    'Sm@838500',
    { dialect: 'mysql',
    host: 'localhost'
    },
);

module.exports = sequelize;
