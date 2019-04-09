let socket: SocketIOClient.Socket = io();

socket.on('connect', (): void => {
  console.log('Connected to server');
})

socket.on('disconnect', (): void => {
  console.log('Disconnected from server');
})

socket.on('newMessage', (message: object): void => {
  console.log('newMessage', message)
})