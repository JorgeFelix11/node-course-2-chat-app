let socket: SocketIOClient.Socket = io();

interface IResponseMessage{
  from: string;
  text: string;
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
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function(){
    alert('Unable to fetch location')
  })
})
socket.on('newMessage', (message: IResponseMessage): void => {
  console.log('newMessage', message)
  var li: JQuery<HTMLElement> = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`)
  jQuery('#messages').append(li)
})

socket.on('newLocationMessage', (position: IPosition) => {
  let li: JQuery<HTMLElement> = jQuery('<li></li>');
  let a: JQuery<HTMLElement> = jQuery(`<a href='${position.url}' target='_blank'>My Current Location</a>`);
  li.text(`${position.from}: `);
  a.attr('href', position.url);
  li.append(a)
  jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function(e: _Event){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){
  })
})
