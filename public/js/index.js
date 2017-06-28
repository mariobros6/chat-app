var socket = io();

socket.on('connect', function() {
    console.log('connected');

    // socket.emit('')
});

socket.on('disconnect', function() {
    console.log('disconnected');
});

socket.on('newMessage', function(message) {
    console.log('new message');
    console.log(message);

})