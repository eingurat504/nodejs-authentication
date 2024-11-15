var exports = module.exports = {}
exports.index = async(req,res) => {

    const db = require("../models");
    const User = db.users;
    // const { User } = require('../models/user.js');
    // const { User } = require('../models');

      // try {

      User.findAll()
      .then(data => {
          res.render('./users/index', { title: 'User List', data });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });

        // const users = await User.findAll;
// 
        // console.log(users);

        // Convert the results to plain objects (needed for Sequelize v4)
        // const usersData = users.map(user => user.get({ plain: true }));
    
        // Log the data for debugging
        // console.log('Users:', usersData);

        // res.render('./users/index', { title: 'User List', users });
      // } catch (err) {
      //   console.error(err);
      //   res.status(500).send('Error retrieving users');
      // }
}

