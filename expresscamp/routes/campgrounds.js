const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

const Campground = require('../models/campground');
// const Comment = require('../models/comment');
// const User = require('../models/user');

// RESTFUL : INDEX
router.get("/", function(req, res){
    // Get all campgrounds from db
    Campground.find({}, function(err, cgs){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: cgs, currentUser: req.user});        
        }
    })
    // res.render("campgrounds", {campgrounds: campgrounds});
})

// RESTFUL : NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
})

// RESTFUL : CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    // Get data from form and add to campgrounds array
    var newName = req.body.name;
    var newImage = req.body.image;
    var newDesc = req.body.description;
    Campground.create({
        name: newName,
        image: newImage,
        description: newDesc,
        author: {
                id: req.user._id,
                username: req.user.username
            }
        }, function(err, cg){
            if(err){
                console.log(err);
            } else {
                // Redirect back to campgrounds
                res.redirect("/campgrounds");
            }
    });
});

// RESTFUL : SHOW
// /campgrounds/:id - show info about one cg
router.get("/:id", function(req, res){
    // Show more info about one item
    // Campground.findById(req.params.id, function(err, found){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         res.render("show", {campground: found});
    //     }
    // });
    Campground.findById(req.params.id).populate("comments").then(
        (found_cg) => {
            res.render("campgrounds/show", {campground: found_cg});
        }
    );
});

// RESTful: EDIT
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id).then(
        (found_campground) => {
            res.render('campgrounds/edit', {campground: found_campground});
        }
    )
});

// RESTful: UPDATE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    // Authorize user
    // Update and save to db
    console.log("updating: " + req.params.id);
    Campground.findById(req.params.id).then(
        (found_campground) => {
            found_campground.name = req.body.name;
            found_campground.image = req.body.image;
            found_campground.description = req.body.description;
            found_campground.save();
            res.redirect("/campgrounds/" + found_campground._id);
        }, (err) => { console.log("did not find campground"); }
    )
});

// RESTful: DESTROY
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    // Authorize user
    // Delete document from db
    // res.send("delete called");
    Campground.findByIdAndRemove(req.params.id).then(
        (doc) => { 
            console.log("doc deleted"); 
            res.redirect('/campgrounds');
        }
    );
});

module.exports = router;
