let socket: SocketIOClient.Socket = io();

interface IResponseMessage{
  from: string;
  text: string;
}

socket.on('connect', (): void => {
  console.log('Connected to server');
})

socket.on('disconnect', (): void => {
  console.log('Disconnected from server');
})

socket.on('newMessage', (message: IResponseMessage): void => {
  console.log('newMessage', message)
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`)
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
