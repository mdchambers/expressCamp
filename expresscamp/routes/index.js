const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get("/", function(req, res){
    res.render("landing");
});

//// AUTH ROUTES

router.get('/register', function(req, res){
    res.render('register');
})

router.post("/register", function(req, res){
    // res.send("signing you up");
    var newUser = new User({ username: req.body.username});
    User.register(newUser, req.body.password).then(
        (user) => {
            console.log("added user");
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Registered new account!")
                return res.redirect("/campgrounds");
            })
        }, (e) => {
            console.log("error registering user");
            req.flash("error", "Error: " +  e.message);
            return res.redirect("/register");
        }
    )
});

router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login" 
}),
function(req, res){
    req.flash("success", "Login might have worked?");
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash("success", "You\'ve logged out");
    res.redirect("/campgrounds");
})

module.exports = router;