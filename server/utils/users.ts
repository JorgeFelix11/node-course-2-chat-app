interface options {
  id?: string
  name?: string
  room?: string
}
class Users{
  users: options[]
  constructor(){
    this.users = []
  }
  addUser(id: string, name: string, room: string){
    let user = {id, name, room}
    this.users.push(user);
    return user;
  }
  removeUser(id: string){
    let user = this.getUser(id)
    if(user){
      this.users = this.users.filter((user) => user.id !== id)
    }
    return user;
    // let userRemoved = this.users.filter((user) => user.id === id);
    // let usersNotRemoved = this.users.filter((user) => user.id !== id);
    // this.users = usersNotRemoved;
    // return userRemoved[0];
  }
  getUser(id: string){
    let user = this.users.filter((user) => user.id === id);
    return user[0];
  }
  getUserList(room: string | undefined){
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);
    return namesArray;
  }

}
export {Users, options};