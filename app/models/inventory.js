module.exports = function(sequelize, Sequelize){
    var Inventory = sequelize.define('inventory', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        warehouse_id: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        product_id: {
            type: Sequelize.INTEGER,
            noEmpty:true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
    });

    return Inventory;
}