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

    // find() without any argument, will fetch everything regarding their value
    // find() returns a MongoDB cursor. A pointer to the actual documents (for efficiency)
    //  the cursor has methods that we can use to get our documents,
    // e.g.: db.collection('CollectionName').find().toArray(); Will return an array of objects/documents
    // and .toArray() returns a promise!
    // db.collection('Todos').find({
    //     _id: new ObjectID('59d20a4a3398f3481c5252ad')// ObjectId is NOT a string
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find({completed: false}).count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Tolios'}).toArray().then((docs) =>{
        console.log('User: Tolios');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });

    //db.close();// Close the MongoDB connection to the server
});