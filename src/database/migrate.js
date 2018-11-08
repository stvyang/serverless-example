require('app-module-path').addPath(process.cwd());

require('src/models');

const sequelize = require('src/database/sequelize');

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Sync DB Success');
    process.exit();
  });
