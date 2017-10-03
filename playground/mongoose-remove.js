/**
 * File    : mongoose-remove.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 3/10/2017
 */
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/server');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// remove({}) will remove everything in the DB
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// findOneAndRemove() finds the 1rst matched document and deletes
//Todo.findOneAndRemove
// findByIdAndRemove() finds the matched document and deletes it
//Todo.findByIdAndRemove
// BOTH of the above functions will also RETURN the doc after deletion

// Todo.findOneAndRemove({_id: '59d3b0fade8d499653e7965c'}).then((todo) => {
//     console.log(todo);
// });

// findByIdAndRemove() will have its success case called even
//      if NO todo gets deleted, returning: null
Todo.findByIdAndRemove('59d3b0fade8d499653e7965c').then((todo) => {
  console.log(todo);
});