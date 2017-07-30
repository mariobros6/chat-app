const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '/../public');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');
var {Users} = require('./utils/users');


console.log(__dirname + '/../public');
console.log(publicPath);

var app = express();
const port = process.env.PORT || 3000;
// var server = http.createServer((req, res) => {

// });
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

// app.use(bodyParser.json());
app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('new user', socket.id);

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) ||
        !isRealString(params.room)) {
            return callback('nazwa i pokoj wymagane');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        // console.log(socket.id, params.name, params.room);
        users.addUser(socket.id, params.name, params.room);
        // console.log(users.getUserList());
        // socket.leave(roomname);

        // metody emitów
        // io.emit - do wszystkich podlaczonych userów
        //  pokoje io.to(room) - do wszystkich w pokoju
        // socket.broadcast.emit - do wszystkich poza aktyalnym userem
        //  socket.broadcast.to(room) - do wszytskich w pokoju poza mną
        // socket.emit - do konkretnego usera
        //   
        // socket.emit('newMessage', generateMessage('admin', 'welcome to chat app'));
        // socket.broadcast.emit('newMessage', generateMessage('admin', 'user joinde'));

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('admin', 'welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `user ${params.name} joinde`));


        callback();
    });

    socket.on('disconnect', () => {
        // console.log('disss', socket.id);
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `user ${user.name} leaved`));
        }
    });

    

    // // welcome and joined
    // socket.emit('newMessage', {
    //     from: 'admin',
    //     text: 'welcome'
    // });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        // console.log(message);
        // socket.emit('newMessage', message);
        // io.emit('newMessage', generateMessage(message.from,message.text));
        callback('wiadomosc z serwera');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime(),
        // })
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
        
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