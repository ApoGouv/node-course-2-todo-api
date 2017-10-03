/**
 * File    : mongoose.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 2/10/2017
 */
const mongoose = require('mongoose');

// Configure Mongoose to use promises
mongoose.Promise = global.Promise;
// Make a connection to the DB with Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {
    useMongoClient: true,
    /* other options */
});

module.exports = {mongoose};