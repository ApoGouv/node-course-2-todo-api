/**
 * File    : server.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 2/10/2017
 */
const express = require('express');
// takes a JSON and convert it to an object
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');

const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// config POST route: /todos
// get the body data send by client- we can simulate this with Postman
app.post('/todos', (req, res) => {
  //console.log(req.body);
  // create a new model
  var todo = new Todo({
    text: req.body.text
  });

  // save the model to the db
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


// config GET route: /todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});

// config GET route: /todos/someId
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  // validate ID using isValid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty send
    return res.status(404).send();
  }

  // findById
  Todo.findById(id).then((todo) => {
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

app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;
  // validate the id
  if (!ObjectID.isValid(id)){
    // not valid? return 404
    return res.status(404).send();
  }

  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    // success
    if (!todo){
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


app.listen(port, () => {
  console.log(`Started up at port: ${port}`);
});


module.exports = {app};