var exports = module.exports = {}
const { check, validationResult } = require('express-validator');
const db = require("../models");
const Supplier = db.suppliers;

exports.index = async(req,res) => {

      Supplier.findAll()
      .then(data => {
          res.render('./suppliers/index', { title: 'Supplier List', data });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users."
        });
      });
}

exports.create = async (req,res) => {
    
    try {
        res.render('./suppliers/create', { 
            title: 'Supplier Create'
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Server error. Unable to load categories.');
    }
}

exports.edit = async (req,res) => {
    try {
        const supplierId = req.params.id; // Get user ID from route parameter
        const supplier = await Supplier.findByPk(supplierId); // Fetch the user from the database

        if (!supplier) {
            return res.status(404).send('Supplier not found');
        }

        res.render('./suppliers/edit', { supplier }); // Render the edit form with user data
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

exports.store =  async(req,res) => {

    await check('name')
      .notEmpty()
      .withMessage('Name is required').run(req);
    await check('contact_name')
      .notEmpty()
      .withMessage('Contact Name is required').run(req);
    await check('phone_number')
      .notEmpty()
      .withMessage('Phone Number is required').run(req);
    await check('email')
      .notEmpty()
      .withMessage('Email is required').run(req);
    await check('address')
      .notEmpty()
      .withMessage('Address is required').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('./suppliers/create', { errors: errors.array() });
    }

    const data = {
        name: req.body.name,
        contact_name: req.body.contact_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        address: req.body.address
    };

    try {

        await Supplier.create(data);

        res.redirect('/suppliers');
    } catch (error) {
        console.error('Error creating supplier:', error);
        res.status(500).send('Server error');
    }

}

// Update supplier data
exports.update = async (req, res) => {
    try {
        const supplierId = req.params.id;
        const updatedData = {
            name: req.body.name,
            contact_name: req.body.contact_name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            address: req.body.address
        };

        const supplier = await Supplier.update(updatedData, { 
            new: true,
            where: { id: supplierId }
         });

        if (!supplier) {
            return res.status(404).send('Supplier not found');
        }

        res.redirect('/suppliers'); // Redirect to the list of users or another relevant page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}
