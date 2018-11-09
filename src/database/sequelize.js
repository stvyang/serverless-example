require('dotenv').config();

const Sequelize = require('sequelize');

module.exports = () => new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
      max: 30,
      min: 0,
      acquire: 30000,
      idle: 10000,
      handleDisconnects: true
    }
  }
);
