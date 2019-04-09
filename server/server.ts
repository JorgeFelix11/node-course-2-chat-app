import path from 'path';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import {generateMessage} from './utils/message';

let app: express.Application = express();
const port: string | number = process.env.PORT || 3000;
const publicPath: string = path.join(__dirname, '../public');
let server: http.Server = http.createServer(app);
let io: socketIO.Server = socketIO(server)

io.on('connection', (socket: socketIO.Socket) => {
  console.log('New user connecteds');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))
  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

app.use(express.static(publicPath))

server.listen(port,() => {
  console.log(`Server listening to port ${port}`)
})