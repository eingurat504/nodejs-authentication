module.exports = function(sequelize, Sequelize){
    var User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            noEmpty:true
        },
        username: {
            type: Sequelize.TEXT
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        about: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        last_login: {
            type: Sequelize.DATE
        },
        status: {
            type:Sequelize.ENUM('active','inactive'),
            defaultValue: 'active'
        }
    });

    return User;
}