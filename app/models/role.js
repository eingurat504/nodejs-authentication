module.exports = function(sequelize, Sequelize){
    var Role = sequelize.define('role', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        description: {
            type: Sequelize.STRING,
            noEmpty:true
        },
        status: {
            type:Sequelize.ENUM('active','inactive'),
            defaultValue: 'active'
        }
    });

    return Role;
}