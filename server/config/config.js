/**
 * File    : config.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 3/10/2017
 */

// Environment Variables
var env = process.env.NODE_ENV || 'development';

//console.log(process.env); // Log all the Environment Variables
//console.log('env *****', env);
// 'production' env is configured by Heroku
if (env === 'development' || env === 'test'){
  var config = require('./config.json');
  var envConfig = config[env];

  // Object.keys(obj): takes an object and gets all of the keys and returns them as an array
  // will output [ 'PORT', 'MONGODB_URI' ]
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}