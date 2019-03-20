var User = require('../models/users');
var GoalPost = require('../models/goalposts');
var Goal = require('../models/goals');


module.exports = function(app, passport) {

    //home page
    app.get('/', function(req, res) {
       // res.render('index.ejs'); // load the index.ejs file;
       //res.status(200).json({message: 'Home Page'});
       res.render('pages/index');
    });

    

    app.get('/signup', function(req, res) {
       // res.render('signUp');
        //res.status(200).json({message: 'Signup Page'});
       res.render('pages/signUp', { message: req.flash('signupMessage') });
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render( 'pages/pick-goals', { message: req.flash('signupMessage') });//, {
          //  user: req.user
          //res.status(200).json({message: 'Profile Page', user : req.user});

    })
        // user:req.user
        /*res.render('pick-goals.ejs', {
        user : req.user // get the user out of session and pass to template
        });*/
    //});

    app.get('/posts', function(req, res) {
        // res.render('signUp');
         //res.status(200).json({message: 'Signup Page'});
        //res.render('pages/signUp', { message: req.flash('signupMessage') });
        GoalPost.find()
        .then((goalposts) => res.send(goalposts))
        .catch('something went wrong');
     });

     app.post('/posts', function(req, res) {
        // res.render('signUp');
         //res.status(200).json({message: 'Signup Page'});
        //res.render('pages/signUp', { message: req.flash('signupMessage') });
        const requiredFields = ['category', 'comments', ];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            return res.status(400).send(message);
        }
    }
        GoalPost
        .create({
            category: req.body.category,
            comments: req.body.comments,
        })
        .then(goal => res.status(201).json(goal.serialize()))
        .catch('somemthing went wrong');
     });

    app.get('/users', (req, res) => {
        User.find()
        .then((users) => res.send(users))
        .catch('something went wrong');
    });

    
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
}

function isAdmin(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated() && req.user.level == 'admin')
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

/*

    // code from documentation
    // show the login form
    app.post('/', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    })); 

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    }); 

    */