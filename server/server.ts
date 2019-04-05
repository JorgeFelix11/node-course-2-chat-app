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
  console.log('New user connected')
  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

app.use(express.static(publicPath))

server.listen(port,()=>{
  console.log(`Server listening to port ${port}`)
})