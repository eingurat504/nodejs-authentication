module.exports = function(sequelize, Sequelize){
    var Email = sequelize.define('supplier', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        contact_name: {
            type: Sequelize.STRING,
            noEmpty:true
        },
        phone_number: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        email: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        address: {
            type: Sequelize.TEXT,
            noEmpty: true
        }
        
    });

    return Email;
}