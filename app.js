const express   = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    // Campground  = require('./models/campground'),
    // Comment     = require('./models/comment'),
    User        = require('./models/user.js'),
    passport    = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    seedDB      = require('./seeds'),
    flash       = require('connect-flash');

const   commentRoutes       = require('./routes/comments'),
        campgroundRoutes    = require('./routes/campgrounds'),
        indexRoutes         = require('./routes/index')

// Connect mongoose
// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mike:Hl3SbOeTsoPkwYYv@yelpcamp-cxz1h.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
  // perform actions on the collection object
//   client.close();
// });
mongoose.connect(uri, {useNewUrlParser: true});

// Reseed database
seedDB();
// Print all campgrounds
// Campground.find({}).then(
//     (docs) => {
//         console.log(docs);
//     }
// )


// Set directory for serving up css/js
app.use(express.static(__dirname + "/public"));
// Set default view engine so can skip adding ".ejs" to end of files
app.set("view engine", "ejs");

app.use(methodOverride("_method"));



// Tell express to use bodyParser to parse form data
app.use(bodyParser.urlencoded({extended: true}));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "There's no secret greater than this",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

// Add variables for use on every page (without giving errors)
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error"),
    res.locals.success = req.flash("success");
    next();
})

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// Listen on port 3000
// app.listen(3000);
my_port = process.env.PORT || 3000;
console.log("Listening on port  " + my_port);
app.listen(my_port);


// RESTful Routes
// Campgrounds:
// INDEX    /campgrounds        GET
// NEW      /campgrounds/new    GET
// CREATE   /campgrounds        POST
// SHOW     /campgrounds/:id    GET
// Comments:
// NEW      /campgrounds/:id/comments/new   GET
// CREATE   /campgrounds/:id/comments       PUT


// Define route prefixes so they are no longer needed in route declarations
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);




