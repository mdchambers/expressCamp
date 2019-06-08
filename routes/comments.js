const express = require('express');
// User mergeParams option to ensure :id is passed to each route
const router = express.Router({mergeParams: true});
const middleware = require('../middleware');

const Campground = require('../models/campground');
const Comment = require('../models/comment');

// Comment routes
// INDEX
router.get("/new", middleware.isLoggedIn, function(req, res){
    // Send page with form for adding comments
    console.log("id: " + req.params.id);
    Campground.findById(req.params.id).then(
        (found_cg) => {
            // console.log("cg: " + found_cg)
            res.render("comments/new", {campground: found_cg});
        }
    )
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    // res.send("adding comment to campground");
    // Generate new comment doc
    // console.log(req.params.id);
    Campground.findById(req.params.id).then(
        (found_cg) => {
            // console.log(found_cg);
            Comment.create({
                text: req.body.commentText,
                author: {
                    id: req.user._id,
                    username: req.user.username
                }
            }).then(
                (new_comment) => {
                    // console.log(req.body.comment);
                    found_cg.comments.push(new_comment);
                    found_cg.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + found_cg._id);
                }
            );
        }
    );
    // Add comment to campground doc
    // Redirect to /campgrounds/:id
});

// EDIT

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    // res.send("comment edit page");
    console.log("edit id: " + req.params.id);
    Campground.findById(req.params.id).then(
        (found_campground) => {
            // console.log(found_campground);
            Comment.findById(req.params.comment_id).then(
                (found_comment) => {
                    res.render("comments/edit", {campground: found_campground, comment: found_comment});
                }
            );
        }
    )
});

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id).then(
        (found_comment) => {
            console.log(req.body.commentText);
            console.log(found_comment);
            found_comment.text = req.body.commentText;
            found_comment.save();
            req.flash("success", "Comment updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    );
});

// DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // res.send("delete route");
    Comment.findByIdAndRemove(req.params.comment_id).then(
        (doc) => {
            req.flash("success", "Comment deleted");
            res.redirect('back');
        }
    )
});

module.exports = router;
