module.exports = function(sequelize, Sequelize){
    var Category = sequelize.define('category', {
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
            type: Sequelize.TEXT
        }
    });

    return Category;
}