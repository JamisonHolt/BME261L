const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongojs = require('mongojs');

// Add configuration to file
const config = require('./config/database');

// Add routes to file
const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');

// Set up database
const db = mongojs('MERNAPP', ['users'])

// Add express backend to allow middleware
const app = express();

// Configure view engine and views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// CORS Middleware - Allows request to app from different domain names
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow jwt tokens for private endpoints
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Add routes to file
app.use('/user', authRoutes);
app.use('/', mainRoutes);

// Port Number
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

// Start Server
app.listen(port, err => {
  if (err) return console.error(err);
  console.log(`Server running on localhost:${port} [${env}]`);
});
