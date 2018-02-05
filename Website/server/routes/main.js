const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const dbconfig = require('../config/database');
const Users = require('../util/db-functions');

// Create router for authorization routes
const router = express.Router();

// Home page
router.get('/', (req, res, next) => {
  res.send("Home page not yet configured");
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
