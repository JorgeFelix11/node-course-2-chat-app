import moment from 'moment'
import '../css/styles.css'
import jQuery from 'jquery'
import io from 'socket.io-client'
import Mustache from 'mustache'
let socket: SocketIOClient.Socket = io();

interface IResponseMessage{
  from: string;
  text: string;
  createdAt: number;
}
interface IPosition{
  from: string;
  url: string;
  createdAt: number
}
socket.on('connect', (): void => {
  console.log('Connected to server');
})

socket.on('disconnect', (): void => {
  console.log('Disconnected from server');
})

let locationButton: JQuery<HTMLElement> = jQuery('#send-location')
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.')
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location')
    
  })
})
socket.on('newMessage', (message: IResponseMessage): void => {
  let template = jQuery('#message-template').html();
  let formatedDate = moment(message.createdAt).format('h:mm a')
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedDate
  })
  jQuery('#messages').append(html)
  // console.log('newMessage', message)
  // var li: JQuery<HTMLElement> = jQuery('<li></li>');
  // li.text(`${message.from} ${formatedDate}: ${message.text}`)
  // jQuery('#messages').append(li)
})

socket.on('newLocationMessage', (position: IPosition) => {
  let formatedDate = moment(position.createdAt).format('h:mm a');
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    from: position.from,
    url: position.url,
    createdAt: formatedDate
  });
  jQuery('#messages').append(html);
  // let li: JQuery<HTMLElement> = jQuery('<li></li>');
  // let a: JQuery<HTMLElement> = jQuery(`<a href='${position.url}' target='_blank'>My Current Location</a>`);
  // li.text(`${position.from} ${formatedDate}: `);
  // a.attr('href', position.url);
  // li.append(a)
  // jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function(e: _Event){
  let messageTextbox = jQuery('[name=message]');
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('')
  })
})
