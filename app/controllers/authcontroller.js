var exports = module.exports = {}
 
exports.signup = function(req, res) {
  res.render('./auth/signup', { title: 'Login', layout: 'auth' });
}

exports.signin = function(req, res) {
    res.render('./auth/signin', { title: 'Login', layout: 'auth' });
}

exports.dashboard = function(req,res){
	res.render('dashboard'); 
}

exports.logout = function(req,res){
  req.session.destroy(function(err) {
        res.redirect('./auth/signin');
  });

}
