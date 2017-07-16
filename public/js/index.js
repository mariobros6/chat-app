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

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = $('<a target="_blank" >My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    console.log(li);
    $('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'user',
        text: $('[name=message]').val()
    }, function (data) {
        console.log(data);
    });
});

var locationButton = $("#send-location");

locationButton.on("click", function() {
    if (!navigator.geolocation) {
        return alert('geolocation not supported');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        alert('unable to get position');
    })
})