"use strict";
var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});
socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(message.from + ": " + message.text);
    jQuery('#messages').append(li);
});
socket.on('newLocationMessage', function (position) {
    var li = jQuery('<li></li>');
    var a = jQuery("<a href='" + position.url + "' target='_blank'>My Current Location</a>");
    li.text(position.from + ": ");
    a.attr('href', position.url);
    li.append(a);
    jQuery('#messages').append(li);
});
jQuery('#message-form').on('submit', function (e) {
    var messageTextbox = jQuery('[name=message]');
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});
