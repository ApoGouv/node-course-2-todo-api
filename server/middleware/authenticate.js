/**
 * File    : authenticate.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 4/10/2017
 */

const {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  // get a header value, by providing the key
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user){
      // return res.status(401).send();
      // or better, since we do the same thing
      // return a rejected promise, which will make the catch to run
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
    // here we do not cal next(), since the authentication failed
  });
};

module.exports = {authenticate};