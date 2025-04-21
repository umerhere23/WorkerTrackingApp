// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

 db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Employee = require('./Employee')(sequelize, Sequelize.DataTypes);
db.Department = require('./Department')(sequelize, Sequelize.DataTypes);
db.Supervisor = require('./Supervisor')(sequelize, Sequelize.DataTypes);
db.JobTitle = require('./JobTitle')(sequelize, Sequelize.DataTypes);
db.Engagement = require('./Engagement')(sequelize, Sequelize.DataTypes);

// Run associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
