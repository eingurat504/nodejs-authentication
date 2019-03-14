module.exports = function(sequelize, Sequelize){
    var User = sequelize.define('email', {
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

    return User;
}