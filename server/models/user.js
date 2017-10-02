/**
 * File    : user.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 2/10/2017
 */
const mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        required: true,
        trim: true,
        type: String,
        minlength: 1
    }
});

module.exports = {User};