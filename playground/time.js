var moment = require('moment');

// var date = new Date();

// console.log(date.getMonth());

// var date = moment();
// //moment.locale('pl');
// date.add(1, 'year');
// console.log(date.locale('pl').format('MMM Do, YYYY'));

// console.log(moment().format('h:mm a'));

// timestamp
var t1 = new Date().getTime();
var t2 = moment().valueOf();
console.log(t1, t2);

var createdAt = 1234;
var date = moment(createdAt);

console.log(date.format('h:mm a'));