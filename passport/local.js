'use strict';

const { Strategy: LocalStrategy } = require('passport-local');

const  User = require('../models/user');

// ===== Define and create basicStrategy =====
const localStrategy = new LocalStrategy((username, password, done) => {
  let user;
  console.log('Hello from local strategy');
  User.findOne({ username })
    .then(results => {
      user = results;
      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username',
          location: 'username'
        });
      }
      
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        console.log('invalid password');
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect password',
          location: 'password'
        });
      }
      return done(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        console.log('loginerror');
        return done(null, false);
      }
      return done(err);
    });
});

module.exports = localStrategy;