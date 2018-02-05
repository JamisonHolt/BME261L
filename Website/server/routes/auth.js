const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const dbconfig = require('../config/database');
const Users = require('../util/db-functions');

// Create router for authorization routes

// Register new users
router.post('/register', (req, res, next) => {
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  // Make sure password is secure through various tests
  const passwordTests = {
    '[a-z]': 'Password must contain at least one lowercase letter',
    '[A-Z]': 'Password must contain at least one uppercase letter',
    '[0-9]': 'Password must contain at least one digit',
    '[$@$!%*#?&]': 'Password must contain at least one special character',
    '^[a-zA-Z0-9$@$!%*#?&]*$': 'Password has invalid special characters (only $@$!%*#?& allowed)',
    '.{8,}': 'Password must be at least 8 characters in length'
  };
  for (let regString in passwordTests) {
    if (passwordTests.hasOwnProperty(regString)) {
      let regex = new RegExp(regString);
      if (!regex.test(newUser.password)) {
        return res.json({success: false, msg: passwordTests[regString]});
      }
    }
  }
  // Make sure username is valid
  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(newUser.username)) {
    return res.json({success: false, msg: 'Username must start with a letter and only contain letters, numbers, and underscores'});
  }
  Users.checkIfUniqueUser(newUser.username, newUser.email, (err, user) => {
    if (err) throw err;
    // Make sure user email and username unique
    if (user && user.email === newUser.email) {
      return res.json({success: false, msg: 'Email already in use'});
    } else if (user && user.username === newUser.username) {
      return res.json({success: false, msg: 'Username already in use'});
    }
    // Add user to database
    Users.addUser(newUser, (err, user) => {
      if (err) {
        res.json({success: false, msg: 'Failed to register user'});
      } else {
        res.json({success: true, msg: `User ${user.username} successfully created!`});
      }
    });
  });
});

// Authentication
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Users.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    // Make sure username exists in the database
    if (!user) {
      return  res.json({success: false, msg: 'User not found'});
    }
    // Make sure that types password matches password in database
    Users.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, dbconfig.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: "Wrong password"});
      }
    });
  });
});


//
router.get('/validate', (req, res, next) => {
  res.send('VALIDATE');
});


module.exports = router;
