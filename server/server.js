"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var app = express_1.default();
var port = process.env.PORT || 3000;
var publicPath = path_1.default.join(__dirname, '../public');
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
io.on('connection', function (socket) {
    console.log('New user connected');
    socket.emit('newMessage', { from: 'jorge', text: 'Dummy text', createdAt: 123 });
    socket.on('createMessage', function (message) {
        console.log('createMessage', message);
    });
    socket.on('disconnect', function () {
        console.log('User was disconnected');
    });
});
app.use(express_1.default.static(publicPath));
server.listen(port, function () {
    console.log("Server listening to port " + port);
});
