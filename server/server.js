/**
 * File    : server.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 2/10/2017
 */
const express = require('express');
// takes a JSON and convert it to an object
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');

const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

// config post route: /todos
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


app.listen(3000, () => {
    console.log('Started on port 3000');
});


module.exports = {app};