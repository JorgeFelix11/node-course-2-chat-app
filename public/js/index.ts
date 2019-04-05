let socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('createMessage', { from: 'jen', text: 'Message from client'});
})

socket.on('disconnect', () => {
  console.log('Disconnected from server');
})

socket.on('newMessage', (message: object) => {
  console.log('newMessage', message)
})