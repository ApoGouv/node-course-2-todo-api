/**
 * File    : mongodb-connect.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 2/10/2017
 */
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');// here we destructuring 2 properties from mongodb

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert todo', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // Insert new doc into Users collection (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Tolios',
    //     age: 30,
    //     location: 'Salonika'
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert user', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     // ObjectIds like the default _id has embedded a timestamp, which we can retrieve:
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });

    db.close();// Close the MongoDB connection to the server
});