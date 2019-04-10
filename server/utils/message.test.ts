import expect from 'expect';
import {generateMessage, IResponseMessage, generateLocationMessage} from './message'

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from: string = 'Jorge';
    let text: string = "Some message";
    let message: IResponseMessage = generateMessage(from, text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text})
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Deb';
    var latitude = 15;
    var longitude = 19;
    var url = 'https://www.google.com/maps?q=15,192';
    var message = generateLocationMessage(from, latitude, longitude);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
})