var exports = module.exports = {}
 
exports.signup = function(req, res) {
    res.render('signup', {
      _csrfToken = req.csrfToken()
    });
}

exports.signin = function(req, res) {
    res.render('signin', {
      _csrfToken = req.csrfToken()
    });
}

exports.dashboard = function(req,res){
	res.render('dashboard', {
    _csrfToken = req.csrfToken()
  }); 
}

exports.logout = function(req,res){
  req.session.destroy(function(err) {
  res.redirect('/signin', {
    _csrfToken = req.csrfToken()
  });
  });

}