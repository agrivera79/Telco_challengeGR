const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signup',isNotLoggedIn, (req, res) =>{
    res.render('links/signup');

});

router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));

router.get('/signin', (req, res) =>{
    res.render('links/signin');
    console.log(req.body);
});

router.post('/signin', passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    }));

router.get('/profile', isLoggedIn, (req,res) => {
    res.render('profile');
});

router.get('/logout', (req,res, next) => {
    req.logOut(req.user, err => {
        if (err) return next(err);
        res.redirect('/signin');
    });
});


module.exports = router;