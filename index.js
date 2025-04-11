require('dotenv').config();
require('./telemetry/appInsights'); // ✅ Load early

const express = require('express');
const app = express();
const PORT = 4000;

const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const Blog = require('./models/blog');
const { dummydata } = require('./dummy');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/globalblogs')
    .then(() => { console.log("✅ MongoDB Connected") })
    .catch((err) => { console.log("❌ MongoDB Error", err) });

// Setup session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

// Static files
app.use('/public/', express.static('./public'));

// View engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Local variables middleware
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Home route
app.get('/', async (req, res) => {
    const blogs = await Blog.find({}).sort({ "comments": -1 });
    res.status(200).render('home', { blogs });
});

// Routes
app.use(require('./routes/login'));
app.use(require('./routes/register'));
app.use(require('./routes/blog'));

// Start server
app.listen(PORT, () => {
    console.log("🚀 Server Started on PORT", PORT);
});