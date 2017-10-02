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

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // })

    // findOneAndDelete : delete one item and return its values
    // we can implement undo functionality with this
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Tolios'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users')
    //     .findOneAndDelete({_id: new ObjectID("59d20029e1282729044e8ec0")})
    //     .then((result) => {
    //         console.log(result);
    //         console.log(JSON.stringify(result, undefined, 2));
    //     });

    //db.close();// Close the MongoDB connection to the server
});