"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = process.env.PORT || 3000;
var publicPath = path_1.default.join(__dirname, '../public');
app.use(express_1.default.static(publicPath));
console.log(__dirname + '/../public');
console.log(publicPath);
// app.get('/', (req,res) => {
//   res.send('<h1>Hello</h1>')
// })
app.listen(port, function () {
    console.log("Server listening to port " + port);
});
