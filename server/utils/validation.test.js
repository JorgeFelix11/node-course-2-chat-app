"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expect_1 = __importDefault(require("expect"));
var validation_js_1 = require("./validation.js");
describe('isRealString', function () {
    it('should reject non-string values', function () {
        var res = validation_js_1.isRealString(4);
        expect_1.default(res).toBe(false);
    });
    it('should reject string with only spaces', function () {
        var res = validation_js_1.isRealString('    ');
        expect_1.default(res).toBe(false);
    });
    it('should allow strings with non-space characters', function () {
        var res = validation_js_1.isRealString('   Jorge    felix   ');
        expect_1.default(res).toBe(true);
    });
});
