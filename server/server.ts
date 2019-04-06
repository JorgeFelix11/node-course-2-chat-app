import path from 'path';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

let app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
let server = http.createServer(app);
let io = socketIO(server)

io.on('connection', socket => {
  console.log('New user connected');
  // socket.emit ('newMessage', {from: 'jorge', text: 'Dummy text', createdAt: 123})
  socket.on('createMessage', (message) => {
    console.log('createMessage', message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

app.use(express.static(publicPath))

server.listen(port,()=>{
  console.log(`Server listening to port ${port}`)
})