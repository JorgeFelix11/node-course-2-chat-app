"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateMessage = function (from, text) {
    return {
        from: from,
        text: text,
        createdAt: new Date().getTime()
    };
};
exports.generateMessage = generateMessage;
var generateLocationMessage = function (from, latitude, longitude) {
    return {
        from: from,
        url: "https://www.google.com/maps?q=" + latitude + "," + longitude,
        createdAt: new Date().getTime()
    };
};
exports.generateLocationMessage = generateLocationMessage;
