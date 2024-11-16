var exports = module.exports = {}
exports.index = async(req,res) => {

    const db = require("../models");
    const User = db.users;

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

}

