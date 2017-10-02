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

    // db.collection('Todos')
    //     .findOneAndUpdate({
    //         _id: new ObjectID("59d2175b3398f3481c5254f5")
    //     }, {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     })
    //     .then((result) => {
    //     console.log(result);
    //     });

    db.collection('Users')
        .findOneAndUpdate({
            _id: new ObjectID("59d1f77b1542092f30c44928")
        }, {
            $set: { name: 'Tolios' },
            $inc: { age: 1 }
        }, {
            returnOriginal: false
        }).then((result) => {
        console.log(result);
    });

    //db.close();// Close the MongoDB connection to the server
});