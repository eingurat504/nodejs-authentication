var exports = module.exports = {}
const { check, validationResult } = require('express-validator');
const db = require("../models");
const Category = db.categories;

exports.index = async(req,res) => {

      Category.findAll()
      .then(data => {
          res.render('./categories/index', { title: 'Category List', data });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users."
        });
      });
}

exports.create = function(req,res){
  res.render('./categories/create');
}

exports.store =  async(req,res) => {

    await check('name')
      .notEmpty()
      .withMessage('Name is required').run(req);
   await  check('description')
      .notEmpty()
      .withMessage('Description is required').run(req);

  // Get validation errors (if any)
  const errors = validationResult(req);

  console.log(errors);

  if (!errors.isEmpty()) {
    // Render the form with error messages
    return res.render('./categories/create', { errors: errors.array() });
  }

    const data = {
        name: req.body.name,
        description: req.body.description
    };

    try {
        await Category.create(data);
        res.redirect('/categories');
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).send('Server error');
    }

}
