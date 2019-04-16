import expect from 'expect';
import {Users} from './users';

describe('Users', () => {
  let users: any;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Jorge',
      room: 'React Course'
    },{
      id: '3',
      name: 'Amber',
      room: 'Node Course'
    }]
  })
  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: "123",
      name: "Jorge",
      room: "The office fans"
    }
    let resUser = users.addUser(user.id, user.name, user.room);
    
    expect(users.users).toEqual([user])
  })
  it('should return names for node course', () => {
    let usersList = users.getUserList('Node Course')
    expect(usersList).toEqual(['Mike', 'Amber'])
  })  
  it('should return names for react course', () => {
    let usersList = users.getUserList('React Course')
    expect(usersList).toEqual(['Jorge'])
  })
  it('should return the removed element', () => {
    let removed = users.removeUser('1');
    expect(removed).toEqual({
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    })
    expect(users.users).toEqual([
    {
      id: '2',
      name: 'Jorge',
      room: 'React Course'
    },{
      id: '3',
      name: 'Amber',
      room: 'Node Course'
    }])
  })
  it('should not remove user', () => {
    let removed = users.removeUser('55');
    expect(users.users).toEqual([{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Jorge',
      room: 'React Course'
    },{
      id: '3',
      name: 'Amber',
      room: 'Node Course'
    }])
  })
  it('should find user', () => {
    let find = users.getUser('1');
    expect(find).toEqual({
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    })
  })
  it('should not find user', () => {
    let find = users.getUser('55');
    expect(find).toNotExist()
    expect(find).toNotEqual({
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    })
    expect(find).toNotEqual({
      id: '2',
      name: 'Jorge',
      room: 'React Course'
    })
    expect(find).toNotEqual({
      id: '3',
      name: 'Amber',
      room: 'Node Course'
    })
  })
})