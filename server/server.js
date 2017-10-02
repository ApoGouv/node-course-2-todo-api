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
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// create a newTodo
var newTodo = new Todo({
    text: 'Make a pie',
    completed: true,
    completedAt: Math.floor(Date.now() / 1000)
});

// save it to the db
newTodo.save().then((doc) => {
    console.log('Saved todo', doc);
}, (e) => {
    console.log('Unable to save Todo', e);
});