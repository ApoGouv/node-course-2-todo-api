/**
 * File    : hashing.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 4/10/2017
 */

/**
 * Small intro to Hashing and SHA 256 (for moar, jsut google it!) -
 *
 * A cryptographic hash (sometimes called ‘digest’) is a kind of ‘signature’ for a text or a data file.
 * SHA-256 generates an almost-unique 256-bit (32-byte) signature for a text.
 * A hash is not ‘encryption’ – it cannot be decrypted back to the original text
 * (it is a ‘one-way’ cryptographic function, and is a fixed size for any size of source text). This makes it
 * suitable when it is appropriate to compare ‘hashed’ versions of texts, as opposed to decrypting the text to
 * obtain the original version.
 *
 * Such applications include hash tables, integrity verification, challenge handshake authentication,
 *  digital signatures, etc.
 */
const {SHA256} = require('crypto-js');

// var message = 'I am user number 3';
//
// // the result of SHA256 is an object, that is why we call toString()
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// // ~ middle attack and changed the data
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash){
//     console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust');
// }

//          <=======>
/**
 * The idea of creating an object, hashing it, and verifying it later is not something new!
 * In fact, a whole standard exist, known as:
 *
 * Json Web Token or JWT
 */

const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');
console.log('token: ', token);
var decoded = jwt.verify(token, '123abc');
console.log('decoded: ', decoded);




