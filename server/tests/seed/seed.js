/**
 * File    : seed.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 4/10/2017
 */
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'tolios@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'},  process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'toloukos@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'},  process.env.JWT_SECRET).toString()
  }]
}];

// seed data for Todos
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];


const populateTodos = (done) => {
  // remove everything
  Todo.remove({}).then(() => {
    // insert the seed Todos data
    return Todo.insertMany(todos)
  }).then(() => done());
};


const populateUsers = (done) => {
  // wipe out everything
  User.remove({}).then(() => {
    // create 2 users
    // by calling save(), we also call the middleware, which hashes the password
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    // Promise.all() takes an array of Promises and the then()
    // will be called only after ALL of the Promises in the array resolve
    // here, when user 1 + 2 saved successfully to the db
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};



module.exports = {todos, populateTodos, users, populateUsers};