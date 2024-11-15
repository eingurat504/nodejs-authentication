var exports = module.exports = {}
const db = require("../models");
const Category = db.categories;

exports.index = async(req,res) => {

   

      Category.findAll()
      .then(data => {
          res.render('./categories/index', { title: 'Category List', data });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });

}


exports.create = function(req,res){
  res.render('./categories/create');
}

exports.store = function(req,res){

//   var Category = require('../models/category.js');

  // var testing = Category.create();

  //validation implementation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();

  var errors = req.validationErrors();
  
  if(errors){
      res.render('./categories/create',{
          errors:errors
      });
  }else{

      var data = {
          name: req.body.name,
          description: req.body.description
      };


      Category.create(data)
      .then(function(newCategory, created){
            res.redirect('/categories');
      })
    .catch(error => console.error('Error creating category:', error));
          
  //     req.flash('success_msg','You are registered and can now login');   

  }


}