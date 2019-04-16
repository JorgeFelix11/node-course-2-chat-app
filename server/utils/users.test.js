"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expect_1 = __importDefault(require("expect"));
var users_1 = require("./users");
describe('Users', function () {
    var users;
    beforeEach(function () {
        users = new users_1.Users();
        users.users = [{
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            }, {
                id: '2',
                name: 'Jorge',
                room: 'React Course'
            }, {
                id: '3',
                name: 'Amber',
                room: 'Node Course'
            }];
    });
    it('should add new user', function () {
        var users = new users_1.Users();
        var user = {
            id: "123",
            name: "Jorge",
            room: "The office fans"
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect_1.default(users.users).toEqual([user]);
    });
    it('should return names for node course', function () {
        var usersList = users.getUserList('Node Course');
        expect_1.default(usersList).toEqual(['Mike', 'Amber']);
    });
    it('should return names for react course', function () {
        var usersList = users.getUserList('React Course');
        expect_1.default(usersList).toEqual(['Jorge']);
    });
    it('should return the removed element', function () {
        var removed = users.removeUser('1');
        expect_1.default(removed).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
        expect_1.default(users.users).toEqual([
            {
                id: '2',
                name: 'Jorge',
                room: 'React Course'
            }, {
                id: '3',
                name: 'Amber',
                room: 'Node Course'
            }
        ]);
    });
    it('should not remove user', function () {
        var removed = users.removeUser('55');
        expect_1.default(users.users).toEqual([{
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            }, {
                id: '2',
                name: 'Jorge',
                room: 'React Course'
            }, {
                id: '3',
                name: 'Amber',
                room: 'Node Course'
            }]);
    });
    it('should find user', function () {
        var find = users.getUser('1');
        expect_1.default(find).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
    });
    it('should not find user', function () {
        var find = users.getUser('55');
        expect_1.default(find).toNotExist();
        expect_1.default(find).toNotEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
        expect_1.default(find).toNotEqual({
            id: '2',
            name: 'Jorge',
            room: 'React Course'
        });
        expect_1.default(find).toNotEqual({
            id: '3',
            name: 'Amber',
            room: 'Node Course'
        });
    });
});
