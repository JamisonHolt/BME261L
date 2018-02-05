const bcrypt = require('bcryptjs');
const mongojs = require('mongojs');

const ObjectID = mongojs.ObjectID;
// Set up database connection and collection
const db = mongojs('MERNAPP', ['users'])

module.exports.getUserById = function(id, callback) {
  const query = {_id: ObjectID(id)};
  db.users.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback) {
  const query = {email: email};
  db.users.findOne(query, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username};
  db.users.findOne(query, callback);
}

module.exports.checkIfUniqueUser = function(username, email, callback) {
  const query = {$or: [{username: username}, {email:email}]};
  db.users.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      db.users.insert(newUser);
      callback(null, newUser);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  // hash potential password and compare both encryptions
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}
