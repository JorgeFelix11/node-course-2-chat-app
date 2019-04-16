import expect from 'expect';
import {isRealString} from './validation.js';

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let res = isRealString(4);
    expect(res).toBe(false);
  });
  it('should reject string with only spaces', () => {
    let res = isRealString('    ');
    expect(res).toBe(false);
  });
  it('should allow strings with non-space characters', () => {
    let res = isRealString('   Jorge    felix   ');
    expect(res).toBe(true)
  })
})