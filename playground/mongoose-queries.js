/**
 * File    : mongoose-queries.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 3/10/2017
 */
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/server');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '59d357f163ad951868f2d7c711';
//
// if (!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// with Mongoose even if we pass a String as the id
// and not an ObjectId, Mongoose will make the conversion!
// find all documents matching our criteria:
//      returns an Array or an empty Array if no results found
// Todo.find({
//    _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// find the 1rst document matching our criteria:
//      returns a Document or null if no results found
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// find One document by ID!
// Todo.findById(id).then((todo) => {
//     if (!todo){
//         return console.log('Id not found.');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

// read more for Querying your documents:
// http://mongoosejs.com/docs/queries.html


// **** Challenge ***
// make a query to the Users collection
// load Users Mongoose Model
// User.findById
// handle case
//      1. where query woks but user do not found
//      2. where user found, so print him
//      3. where user not found
var user_id = '59d259110876f42f544205ae';

User.findById(user_id).then((user)=> {
    // display message if user NOT found
    if (!user){
        return console.log('User not found.');
    }
    // print user if found
    console.log('User: ', user);
}, (e) => {
    // handle error if wrong Id passed
    console.log(e);
});