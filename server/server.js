/**
 * File    : server.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 2/10/2017
 */
const mongoose = require('mongoose');

// Configure Mongoose to use promises
mongoose.Promise = global.Promise;
// Make a connection to the DB with Mongoose
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Mongoose Model
// we specify what types the attributes of Todos will have
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// create a newTodo
// var newTodo = new Todo({
//     text: 'Something to do'
// });

// save it to the db
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save Todo', e);
// });

// User
// email -require it - trim it - set type - set min length of 1
var User = mongoose.model('User', {
    email: {
        required: true,
        trim: true,
        type: String,
        minlength: 1
    }
});

var newUser = new User({
    email: 'tolios@example.com'
});

newUser.save().then((doc) => {
    console.log('User Saved');
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log('Unable to save new User', e);
});