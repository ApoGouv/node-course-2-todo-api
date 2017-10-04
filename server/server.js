/**
 * File    : server.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 2/10/2017
 */
require('./config/config');

const _ = require('lodash');
const express = require('express');
// takes a JSON and convert it to an object
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

// disable the x-powered-by entry in header
//app.disable('x-powered-by');
// or set it to a custom one:
app.use(function (req, res, next) {
  res.header("X-powered-by", "recursion(coffee && nerves) + code(nodeJS, Express, MongoDB)")
  next()
});

app.use(bodyParser.json());

/* *** /todos *** */

// config POST route: /todos
// get the body data send by client- we can simulate this with Postman
app.post('/todos', authenticate, (req, res) => {
  //console.log(req.body);
  // create a new model in connection with the logged in user
  var todo = new Todo({
    text: req.body.text,
    // set the _creator property to the id of the logged in user
    _creator: req.user._id
  });

  // save the model to the db
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// config GET route: /todos
app.get('/todos', authenticate, (req, res) => {
  // fetch all todos for the currently logged in user
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});

// config GET route: /todos/someId
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  // validate ID using isValid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty send
    return res.status(404).send();
  }

  // findById
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    // success
    if (!todo) {
      // if no todo - send back 404 - with empty body
      return res.status(404).send();
    }
    // if todo - send it back
    res.send({todo});
  }).catch((e) => {
    // error
    // 400 - and send empty body back
    res.status(400).send();
  });
});

// config DELETE route: /todos/someId
app.delete('/todos/:id', authenticate, (req, res) => {
  // get the id
  var id = req.params.id;
  // validate the id
  if (!ObjectID.isValid(id)) {
    // not valid? return 404
    return res.status(404).send();
  }

  // remove todo by id
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    // success
    if (!todo) {
      // if no doc, send 404
      return res.status(404).send();
    }
    // if doc, send doc back with 200
    res.status(200).send({todo});
  }).catch((e) => {
    // error
    // 400 with empty body
    res.status(400).send();
  });
});

// config PATCH (UPDATE) route: /todos/someId
app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  // _.pick() takes an Object and then an array of properties we want to pull off
  // with that way, the users will not have access to the _id
  //    or other properties we don't want them to have access to.

  // This has a subset of the things the user passed to us.
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // here we update the completedAt property based on the completed property
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // call the findByIdAndUpdate()
  Todo.findOneAndUpdate({_id: id, _creator: req.user._id }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});

/* *** /users *** */

// config POST route: /users
app.post('/users', (req, res) => {

  // allow only a subset of User model to be accessible by a user
  var body = _.pick(req.body, ['email', 'password']);

  // create a new User model
  var user = new User(body);
  // save the new model to the DB
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    // set a header key => value pair
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });

});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login (email, password)
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

// DELETE /users/me/token  ~ private route! must be authenticated
app.delete('/users/me/token', authenticate, (req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});



/* *** Listen *** */
app.listen(port, () => {
  console.log(`Started up at port: ${port}`);
});


module.exports = {app};