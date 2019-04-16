"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Users = /** @class */ (function () {
    function Users() {
        this.users = [];
    }
    Users.prototype.addUser = function (id, name, room) {
        var user = { id: id, name: name, room: room };
        this.users.push(user);
        return user;
    };
    Users.prototype.removeUser = function (id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(function (user) { return user.id !== id; });
        }
        return user;
        // let userRemoved = this.users.filter((user) => user.id === id);
        // let usersNotRemoved = this.users.filter((user) => user.id !== id);
        // this.users = usersNotRemoved;
        // return userRemoved[0];
    };
    Users.prototype.getUser = function (id) {
        var user = this.users.filter(function (user) { return user.id === id; });
        return user[0];
    };
    Users.prototype.getUserList = function (room) {
        var users = this.users.filter(function (user) { return user.room === room; });
        var namesArray = users.map(function (user) { return user.name; });
        return namesArray;
    };
    return Users;
}());
exports.Users = Users;
