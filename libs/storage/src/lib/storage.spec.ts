import {storage} from './storage';

describe('storage', () => {
  it('should work', () => {
    expect.assertions(1);
    expect(storage()).toStrictEqual('storage');
  });
});
