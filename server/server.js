"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var message_1 = require("./utils/message");
var app = express_1.default();
var port = process.env.PORT || 3000;
var publicPath = path_1.default.join(__dirname, '../public');
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
io.on('connection', function (socket) {
    console.log('New user connected');
    socket.emit('newMessage', message_1.generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', message_1.generateMessage('Admin', 'New user joined'));
    socket.on('createMessage', function (message, callback) {
        console.log('createMessage', message);
        io.emit('newMessage', message_1.generateMessage(message.from, message.text));
        callback('This is from the server');
    });
    socket.on('disconnect', function () {
        console.log('User was disconnected');
    });
});
app.use(express_1.default.static(publicPath));
server.listen(port, function () {
    console.log("Server listening to port " + port);
});
