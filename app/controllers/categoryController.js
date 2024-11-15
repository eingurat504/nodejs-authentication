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

exports.create = async (req,res) => {
  res.render('./categories/create');
}

exports.edit = async (req,res) => {
    try {
        const categoryId = req.params.id; // Get user ID from route parameter
        const category = await Category.findByPk(categoryId); // Fetch the user from the database

        if (!category) {
            return res.status(404).send('Category not found');
        }

        res.render('./categories/edit', { category }); // Render the edit form with user data
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
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

// Update category data
exports.update = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updatedData = {
            name: req.body.name,
            description: req.body.description
        };

        // Update user in the database
        const category = await Category.findByIdAndUpdate(categoryId, updatedData, { new: true });

        if (!category) {
            return res.status(404).send('Category not found');
        }

        res.redirect('/categories'); // Redirect to the list of users or another relevant page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
