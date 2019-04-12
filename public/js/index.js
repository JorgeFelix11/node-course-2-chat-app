"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
require("../css/styles.css");
var jquery_1 = __importDefault(require("jquery"));
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var mustache_1 = __importDefault(require("mustache"));
var socket = socket_io_client_1.default();
socket.on('connect', function () {
    console.log('Connected to server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});
var locationButton = jquery_1.default('#send-location');
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
    var template = jquery_1.default('#message-template').html();
    var formatedDate = moment_1.default(message.createdAt).format('h:mm a');
    var html = mustache_1.default.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedDate
    });
    jquery_1.default('#messages').append(html);
    // console.log('newMessage', message)
    // var li: JQuery<HTMLElement> = jQuery('<li></li>');
    // li.text(`${message.from} ${formatedDate}: ${message.text}`)
    // jQuery('#messages').append(li)
});
socket.on('newLocationMessage', function (position) {
    var formatedDate = moment_1.default(position.createdAt).format('h:mm a');
    var template = jquery_1.default('#location-message-template').html();
    var html = mustache_1.default.render(template, {
        from: position.from,
        url: position.url,
        createdAt: formatedDate
    });
    jquery_1.default('#messages').append(html);
    // let li: JQuery<HTMLElement> = jQuery('<li></li>');
    // let a: JQuery<HTMLElement> = jQuery(`<a href='${position.url}' target='_blank'>My Current Location</a>`);
    // li.text(`${position.from} ${formatedDate}: `);
    // a.attr('href', position.url);
    // li.append(a)
    // jQuery('#messages').append(li)
});
jquery_1.default('#message-form').on('submit', function (e) {
    var messageTextbox = jquery_1.default('[name=message]');
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});
