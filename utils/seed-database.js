'use strict';
const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');
const User = require('../models/user');



const seedUsers = require('../db/seed/users');

mongoose.connect((DATABASE_URL))
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => { 
    console.info('Seeding Database');
    return Promise.all([
 
      User.insertMany(seedUsers),
      User.createIndexes()

    ]);
 
  })
  .then(() => {
    console.info('Disconnecting');
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
  });