var exports = module.exports = {}

exports.index = function(req,res){

    var User = require('../models/role.js');

      try {
        // const users = User.findAll; // Fetch all users from the database


        const users =  User.findAll();  // Fetch all users from the database

        console.log('Users:', users);



        res.render('./users/index', { title: 'User List', users });
      } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
      }
}

