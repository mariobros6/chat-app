const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '/../public');
const socketIO = require('socket.io');

console.log(__dirname + '/../public');
console.log(publicPath);

var app = express();
const port = process.env.PORT || 3000;
// var server = http.createServer((req, res) => {

// });
var server = http.createServer(app);
var io = socketIO(server);
var {generateMessage} = require('./utils/message');

// app.use(bodyParser.json());
app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('new user');

    socket.on('disconnect', (socket) => {
        console.log('disss');
    });

    socket.emit('newMessage', generateMessage('admin', 'welcome to chat app'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'user joinde'));

    // // welcome and joined
    // socket.emit('newMessage', {
    //     from: 'admin',
    //     text: 'welcome'
    // });

    socket.on('createMessage', (message) => {
        console.log(message);
        // socket.emit('newMessage', message);
        io.emit('newMessage', generateMessage(message.from,message.text));

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime(),
        // })
    })
});



app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}, ${req.method}, ${req.url}`;

    console.log(log);
    // fs.appendFile('log.txt', log + '\n', (err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    // })
    next();
});

// app.get('/', (req, res) => {
//     res.sendFile(publicPath + '/index.html');
//     // res.render(publicPath + '/index.html', {
//     //     title: 'home page titlelelele',
//     //     welcomeMessage: "widajcie na stronie",
//     //     h1: 'h1 nazwa'
//     // });
//     //res.send();
// })


server.listen(port, () => {
  console.log('Started on port ' + port);
});

module.exports = {app};