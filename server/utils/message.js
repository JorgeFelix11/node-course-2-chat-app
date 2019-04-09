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
