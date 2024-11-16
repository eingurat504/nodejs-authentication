module.exports = function(sequelize, Sequelize){
    var Product = sequelize.define('product', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        category_id: {
            type: Sequelize.INTEGER,
            noEmpty:true
        },
        sku: {
            type: Sequelize.STRING,
            noEmpty:true
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
    });

    return Product;
}