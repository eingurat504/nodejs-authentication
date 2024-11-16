var exports = module.exports = {}
const { check, validationResult } = require('express-validator');
const db = require("../models");
const Product = db.products;
const Category = db.categories;

exports.index = async(req,res) => {

      Product.findAll()
      .then(data => {
          res.render('./products/index', { title: 'Product List', data });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users."
        });
      });
}

exports.create = async (req,res) => {
    
    try {
        const categories = await Category.findAll();

        res.render('./products/create', { 
            title: 'Product Create', 
            categories 
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Server error. Unable to load categories.');
    }
}

exports.edit = async (req,res) => {
    try {
        const productId = req.params.id; // Get user ID from route parameter
        const product = await Product.findByPk(productId); // Fetch the user from the database

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('./products/edit', { product }); // Render the edit form with user data
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

exports.store =  async(req,res) => {

    await check('name')
      .notEmpty()
      .withMessage('Name is required').run(req);
    await check('category')
      .notEmpty()
      .withMessage('Category is required').run(req);
    await check('price')
      .notEmpty()
      .withMessage('Price is required').run(req);
    await check('description')
      .notEmpty()
      .withMessage('Description is required').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('./products/create', { errors: errors.array() });
    }

    const data = {
        name: req.body.name,
        category_id: req.body.category,
        price: req.body.price,
        description: req.body.description
    };

    try {
       const product = await Product.create(data);

        // Generate SKU after creation
        const sku = generateSKU(product);

        // Update the product with the generated SKU
        product.sku = sku;
        await product.save();

        res.redirect('/products');
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Server error');
    }

}

// Update product data
exports.update = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedData = {
            name: req.body.name,
            description: req.body.description
        };

        const product = await Product.update(updatedData, { 
            new: true,
            where: { id: productId }
         });

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.redirect('/products'); // Redirect to the list of users or another relevant page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}


function generateSKU(product) {
    // const categoryCode = product.category.slice(0, 3).toUpperCase(); // First 3 letters of category
    // const brandCode = product.brand.slice(0, 3).toUpperCase(); // First 3 letters of brand
    // const attributeCode = product.size ? product.size.toUpperCase() : ''; // Optional size
    const uniqueNumber = product.id.toString().padStart(3, '0'); // Ensure 3-digit unique number

    // return `${categoryCode}-${uniqueNumber}`;
    return `${uniqueNumber}`;
}
