var socket = io();

socket.on('connect', function() {
    console.log('connected');

    // socket.emit('')
});

socket.on('disconnect', function() {
    console.log('disconnected');
});

socket.on('newMessage', function(message) {

    var template = jQuery('#message-template').html();
    var formatedTime = moment(message.createdAt).format('h:mm a');
    message.createdAt = formatedTime;
    var html = Mustache.render(template, message);
    jQuery('#messages').append(html);

    // var formatedTime = moment(message.createdAt).format('h:mm a');
    // console.log('new message');
    // console.log(message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formatedTime}: ${message.text}`);
    // console.log(li);
    // $('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'mar',
//     text: 'hi'
// }, function (data) {
//     console.log('got it', data);
// });

socket.on('newLocationMessage', function(message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    message.createdAt = formatedTime;
    var html = Mustache.render(template, message);
    $('#messages').append(html);
    // var li = jQuery('<li></li>');
    // var a = $('<a target="_blank" >My current location</a>');
    // li.text(`${message.from} ${formatedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // console.log(li);
    // $('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'user',
        text: messageTextBox.val()
    }, function (data) {
        console.log(data);
        messageTextBox.val('');
    });
});

var locationButton = $("#send-location");

locationButton.on("click", function() {
    if (!navigator.geolocation) {
        return alert('geolocation not supported');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');
    }, function(){
        alert('unable to get position');
        locationButton.removeAttr('disabled').text('Send location');
    })
})