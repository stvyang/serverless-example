require('app-module-path').addPath(process.cwd());

const sequelize = require('src/database/sequelize');

sequelize()
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
