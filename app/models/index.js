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


db.orders = require("../models/order.js")(sequelize, Sequelize);
db.products = require("../models/product.js")(sequelize, Sequelize);
db.users = require("../models/user.js")(sequelize, Sequelize);
db.categories = require("../models/category.js")(sequelize, Sequelize);
db.suppliers = require("../models/supplier.js")(sequelize, Sequelize);
 
module.exports = db;