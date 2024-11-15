"use strict";
 
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.js'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};
 
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file.slice(-3) === ".js");
  })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      });
 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
 
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;


// db.projects = require("../models/project.js")(sequelize, Sequelize);
// db.tasks = require("../models/task.js")(sequelize, Sequelize);
db.users = require("../models/user.js")(sequelize, Sequelize);
// db.comments = require("../models/comment.js")(sequelize, Sequelize);
 
module.exports = db;