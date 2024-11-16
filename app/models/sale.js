module.exports = function(sequelize, Sequelize){
    var Sale = sequelize.define('sale', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        supplier_id: {
            type: Sequelize.INTEGER,
            noEmpty: true
        },
        order_date: {
            type: Sequelize.STRING,
            noEmpty:true
        },
        total_amount: {
            type: Sequelize.TEXT,
            noEmpty: true
        },
        status: {
            type: Sequelize.TEXT,  //pending, received, cancelled
            noEmpty: true
        },
        received_date: {
            type: Sequelize.TEXT,
            noEmpty: true
        }
        
    });

    return Sale;
}