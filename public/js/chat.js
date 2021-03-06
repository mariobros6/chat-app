var socket = io();

function scrollToBottom() {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    console.log(newMessage);
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');

    console.log(clientHeight, scrollTop, newMessageHeight, lastMessageHeight);
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        //console.log('should scroll');
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('connected');
    var params = $.deparam();
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error');
            
        }
    })
    // socket.emit('')
});

socket.on('disconnect', function() {
    console.log('disconnected');
});

socket.on('updateUserList', function(usersList) {
    // console.log('userslist', usersList);
    var ol = $('<ol></ol>');

    usersList.forEach(function(name){
        var li = $(`<li>${name}</li>`)
        ol.append(li);

    });
    $('#users').html(ol);

});

socket.on('newMessage', function(message) {

    var template = jQuery('#message-template').html();
    var formatedTime = moment(message.createdAt).format('h:mm a');
    message.createdAt = formatedTime;
    var html = Mustache.render(template, message);
    jQuery('#messages').append(html);

    scrollToBottom();
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

    scrollToBottom();
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