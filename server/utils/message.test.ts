import expect from 'expect';
import {generateMessage, IResponseMessage} from './message'

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from: string = 'Jorge';
    let text: string = "Some message";
    let message: IResponseMessage = generateMessage(from, text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text})
  })
})