var User = require('../models/users');
var GoalPost = require('../models/goalposts');
var Goal = require('../models/goals');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


module.exports = function(app, passport) {

    //login
    app.get('/', function(req, res) {
       
       res.render('pages/index', { user: req.user
        
       });
    });

    app.get('/signup', function(req, res) {
       res.render('pages/signUp', { user: req.user
        
       });
    });
    
    
    app.get('/goals', jsonParser, function(req, res) {
        Goal.find()
        .then((goal) => res.send(goal))
        .catch('something went wrong');
     });

    app.get('/profile', isLoggedIn, function(req, res) {
        let goals;
        Goal.find().then(returnedGoals=>{
            goals = returnedGoals;
            return GoalPost.find();
          }).then(goalposts=>{
            res.render('pages/pick-goals',{
              user: req.user,
              goals: goals,
              goalposts: goalposts
            });
          }); 
        })
        //, {
        /*res.render('pick-goals.ejs', {
        user : req.user // get the user out of session and pass to template
        });*/
    //});
    /*

   /*
    app.get('/profile', isLoggedIn, function(req, res) {

        GoalPost.find()
        .then((goalposts) => {
            res.render( 'pages/pick-goals', { 
                user: req.user,
                goalposts: goalposts
            });
        })
        
        //, {
          //  user: req.user
          //res.status(200).json({message: 'Profile Page', user : req.user});

    })
*/
    app.get('/posts', jsonParser, function(req, res) {
        // res.render('signUp');
         //res.status(200).json({message: 'Signup Page'});
        //res.render('pages/signUp', { message: req.flash('signupMessage') });
        GoalPost.find()
        .then((goalposts) => res.send(goalposts))
        .catch('something went wrong');
     });
           

     app.post('/posts', jsonParser, function(req, res) {
        // res.render('signUp');
         //res.status(200).json({message: 'Signup Page'});
        //res.render('pages/signUp', { message: req.flash('signupMessage') });
        const requiredFields = ['category', 'comments' ];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
          //  return res.status(400).send(message);
        }
    }
        GoalPost
        .create({
            id: this._id,
            category: req.body.category,
            comments: req.body.comments
        })
        //res.status(201);
        //res.json();
        res.redirect("/profile"); // recently removed
     });

    app.get('/users', (req, res) => {
        User.find()
        .then((users) => res.send(users))
        .catch('something went wrong');
    });

app.get('/goals', jsonParser, function(req, res) {
        // res.render('signUp');
         //res.status(200).json({message: 'Signup Page'});
        //res.render('pages/signUp', { message: req.flash('signupMessage') });
        Goal.find()
        .then((goal) => res.send(goal))
        .catch('something went wrong');
     });

     app.get('/delete/:id', (req, res) => {
        GoalPost
            .findByIdAndRemove(req.params.id)
            .then(goal => res.redirect('/profile'))
            .catch(err => res.status(500).json({ message: 'Internal server error' }));
    });

    app.post('/posts/:id', jsonParser, (req, res) => {
        const toUpdate = {};
        const updateableFields = ['category', 'comments'];
    
        updateableFields.forEach(field => {
            if (field in req.body) {
                toUpdate[field] = req.body[field];
            }
        });
    
        GoalPost
            .findByIdAndUpdate(req.params.id, { $set: toUpdate })
            .then(goal => res.redirect('/profile'))
            .catch(err => res.status(500).json({ message: 'Internal server error' }));
    });

    app.get('/edit-goal/:id', isLoggedIn, function(req, res) {
        // res.render('index.ejs'); // load the index.ejs file;
        //res.status(200).json({message: 'Home Page'});
        GoalPost
        .findOne({_id: req.params.id})
        .then(goalPost=>{
            res.render('pages/edit-goal', { user: req.user,
                goalPost: goalPost
            });
        })
        
     });

     app.get('/ideas', isLoggedIn, function(req, res) {
        // res.render('index.ejs'); // load the index.ejs file;
        //res.status(200).json({message: 'Home Page'});
        Goal
        .find()
        .then(goals=>{
            res.render('pages/ideas', { user: req.user,
                goals: goals
            });
        })
        
     });
    
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};

/*app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
}); */
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
    })); */

    



/*
    app.get('/posts', isLoggedIn, function(req, res) {

        GoalPost.find()
        res.render( 'pages/pick-goals', { 
            user: req.user,
            goalposts: goalposts
        });
    })*/

    /*
    
    <form class="formCss js-submit">

            <% goalposts.forEach(function(goalpost) { %> 
              <section class="dbDisplay">
              <label for="goalposts">
              <input title="checkBox" id="goalposts" class="answerOption1" name="answer" >
              <p class="dbGoals"><%=goalpost.category%></p>
              <p class="dbGoals1"><%=goalpost.comments%></p>
              </label>
              <button type="submit" class="deleteButton"><a href="/delete"> Delete </a></button>  
              <button  class="editButton" type="submit" id="/edit">Edit</button>  
              </section>
              
              <% }) %> 
              
              </form>*/

              /*
              div class="dashboaresults1" >

              <form id="myform" action="#" >
              
              <% goals.forEach(function(goal) { %> 
            
              <div class="formCss">
                <section class="dbDisplay">
                <label for="goals-options">
                <input title="checkBox" id="goals-options" class="answerOption1" name="answer" >
                <p class="dbGoals"><%=goal.category%></p>
                <p class="dbGoals1"><%=goal.goal%></p>
                </label>
                <input class="pickGoals js-pickGoals" form="myform" type="submit"  />
                </section>
            </div> 
            
            <% }) %> 
            
              </form>
                
            </div></form>

            */