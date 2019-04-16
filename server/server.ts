import path from 'path';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import {generateMessage, generateLocationMessage} from './utils/message';
import {isRealString} from './utils/validation'
import {Users} from './utils/users'

let app: express.Application = express();
const port: string | number = process.env.PORT || 3000;
const publicPath: string = path.join(__dirname, '../public');
let server: http.Server = http.createServer(app);
let io: socketIO.Server = socketIO(server)
let users = new Users();

interface options {
  id?: string | undefined
  name?: string | undefined
  room?: string | undefined
}

io.on('connection', (socket: socketIO.Socket) => {
  console.log('New user connected');
  
  socket.on('createLocationMessage', (coords, callback) => {
    let user = users.getUser(socket.id)
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
  })
  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback()
  })
  socket.on('join', (params, callback) => {
    if(!isRealString(params['?name']) || !isRealString(params.room)){
      return callback("Name and room name are required")
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params['?name'], params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room))
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    socket.broadcast.to(params.room).emit('newMessage', 
    generateMessage('Admin', `${params['?name']} has joined`));
    callback();
  })
  socket.on('disconnect', () => {
    let user: options | undefined = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat`));
    }
    console.log('User was disconnected')
  })
})

app.use(express.static(publicPath))

server.listen(port,() => {
  console.log(`Server listening to port ${port}`)
})