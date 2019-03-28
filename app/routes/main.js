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

// signup
    app.get('/signup', function(req, res) {
       res.render('pages/signUp', { user: req.user
        
       });
    });

// load posts to profile page
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
        
// make post request and redirect to profile page    
    app.get('/posts', jsonParser, function(req, res) {
        GoalPost.find()
        .then((goalposts) => res.send(goalposts))
        .catch('something went wrong');
     });
           
     app.post('/posts', jsonParser, function(req, res) {
       
        const requiredFields = ['category', 'comments' ];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        }
    }
        GoalPost
        .create({
        id: this._id,
        category: req.body.category,
        comments: req.body.comments
        })
        
        res.redirect("/profile"); 
     });
// get all users
    app.get('/users', (req, res) => {
        User.find()
        .then((users) => res.send(users))
        .catch('something went wrong');
    });

//delete and return to profile page
     app.get('/delete/:id', (req, res) => {
        GoalPost
        .findByIdAndRemove(req.params.id)
        .then(goal => res.redirect('/profile'))
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
    });

// post update and redirect to profile
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

//fetch id and redirect to edit page
    app.get('/edit-goal/:id', isLoggedIn, function(req, res) {
       
        GoalPost
        .findOne({_id: req.params.id})
        .then(goalPost=>{
        res.render('pages/edit-goal', { user: req.user,
        goalPost: goalPost
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
}
