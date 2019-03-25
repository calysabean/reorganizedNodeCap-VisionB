
module.exports = function(app, passport) {

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true 
  }));
      
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true 
  }));

  app.post('/posts', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/profile',
    failureFlash: true 
  }));

  app.get('/delete/:id', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/profile',
    failureFlash: true 
  }));

  app.put('/posts/:id', passport.authenticate('local-login', {
    successRedirect: '/edit-goal',
    failureRedirect: '/profile',
    failureFlash: true 
  }));

  app.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
if (req.isAuthenticated())
return next();
res.redirect('/');
}