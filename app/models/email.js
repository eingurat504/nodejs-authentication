module.exports = function(sequelize, Sequelize){
    var Email = sequelize.define('email', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        emailto: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        subject: {
            type: Sequelize.STRING,
            noEmpty:true
        },
        body: {
            type: Sequelize.TEXT,
            noEmpty: true
        }
        
    });

    return Email;
}