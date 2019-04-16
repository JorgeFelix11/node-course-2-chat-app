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
var validation_1 = require("./utils/validation");
var users_1 = require("./utils/users");
var app = express_1.default();
var port = process.env.PORT || 3000;
var publicPath = path_1.default.join(__dirname, '../public');
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
var users = new users_1.Users();
io.on('connection', function (socket) {
    console.log('New user connected');
    socket.on('createLocationMessage', function (coords, callback) {
        var user = users.getUser(socket.id);
        io.to(user.room).emit('newLocationMessage', message_1.generateLocationMessage(user.name, coords.latitude, coords.longitude));
    });
    socket.on('createMessage', function (message, callback) {
        var user = users.getUser(socket.id);
        if (user && validation_1.isRealString(message.text)) {
            io.to(user.room).emit('newMessage', message_1.generateMessage(user.name, message.text));
        }
        callback();
    });
    socket.on('join', function (params, callback) {
        if (!validation_1.isRealString(params['?name']) || !validation_1.isRealString(params.room)) {
            return callback("Name and room name are required");
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params['?name'], params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', message_1.generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', message_1.generateMessage('Admin', params['?name'] + " has joined"));
        callback();
    });
    socket.on('disconnect', function () {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', message_1.generateMessage('Admin', user.name + " has left the chat"));
        }
        console.log('User was disconnected');
    });
});
app.use(express_1.default.static(publicPath));
server.listen(port, function () {
    console.log("Server listening to port " + port);
});
