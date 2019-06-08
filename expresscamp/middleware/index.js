// Middleware goes here
const Campground = require('../models/campground');
const Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    // Check if logged in
    if( ! req.isAuthenticated()){
        req.flash("You neeed to log in!");
        res.redirect('back');
    }
    // Check if user owns campground
    Campground.findById(req.params.id).then(
        (found_campground) => {
            // Is user owner of campground?
            if( ! found_campground.author.id.equals(req.user._id)){
                console.log("user is not authorized");
                req.flash("You do not have permission to do that.");
                // console.log(req.user._id + " " + found_campground.author.id);
                return res.redirect("back");
            } else {
                console.log("user is authorized");
                return next();
            }   
        }
    );    
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    // Check if logged in
    if( ! req.isAuthenticated()){
        req.flash("You neeed to log in!");
        res.redirect('back');
    }
    // Check if user owns comment
    Comment.findById(req.params.comment_id).then(
        (found_comment) => {
            // Is user owner of campground?
            if( ! found_comment.author.id.equals(req.user._id)){
                console.log("user is not authorized");
                req.flash("You do not have permission to do that.");
                // console.log(req.user._id + " " + found_campground.author.id);
                return res.redirect("back");
            } else {
                console.log("user is authorized");
                return next();
            }   
        }
    );    
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error', "You need to log in!");
        res.redirect('/login');
    }
}


module.exports = middlewareObj;
