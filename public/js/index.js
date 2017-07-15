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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    console.log(li);
    $('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'mar',
//     text: 'hi'
// }, function (data) {
//     console.log('got it', data);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'user',
        text: $('[name=message]').val()
    }, function (data) {
        console.log(data);
    });
})