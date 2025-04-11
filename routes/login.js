const express = require('express');
const router = express.Router();
const passport = require('passport');
const { trace } = require('@opentelemetry/api');

// Initialize tracer
const tracer = trace.getTracer('login-route');

// GET login page
router.get('/login', (req, res) => {
    res.render('login');
});

// POST login
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) return next(err);

        if (!user) {
            // ✅ Manually create a span for logging
            const span = tracer.startSpan("LoginFailed");
            span.setAttribute("email", req.body.username || "unknown");
            span.setAttribute("reason", info?.message || "Authentication failed");
            span.end(); // Send to Azure

            return res.redirect('/login');
        }

        req.logIn(user, function (err) {
            if (err) return next(err);
            req.session.username = req.body.username;
            return res.redirect('/');
        });
    })(req, res, next);
});

// Logout
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// // const bcrypt = require('bcrypt');
// const passport = require('passport');

// router.get('/login',   (req, res) => {
//     res.render('login');
// })

// router.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     req.session.username = req.body.username;
//     // console.log(req.session.username);
//     res.redirect('/');
//   });


// router.get('/logout', function(req, res, next) {
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       // req.flash('success','BYY')
//       res.redirect('/');
//     });
//   });
  
// module.exports = router;