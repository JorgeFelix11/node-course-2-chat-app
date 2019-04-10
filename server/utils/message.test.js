"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expect_1 = __importDefault(require("expect"));
var message_1 = require("./message");
describe('generateMessage', function () {
    it('should generate correct message object', function () {
        var from = 'Jorge';
        var text = "Some message";
        var message = message_1.generateMessage(from, text);
        expect_1.default(message.createdAt).toBeA('number');
        expect_1.default(message).toInclude({ from: from, text: text });
    });
});
describe('generateLocationMessage', function () {
    it('should generate correct location object', function () {
        var from = 'Deb';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,192';
        var message = message_1.generateLocationMessage(from, latitude, longitude);
        expect_1.default(message.createdAt).toBeA('number');
        expect_1.default(message).toInclude({ from: from, url: url });
    });
});
