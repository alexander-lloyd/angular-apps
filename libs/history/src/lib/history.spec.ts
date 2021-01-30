import {history} from './history';

describe('history', () => {
  it('should work', () => {
    expect.assertions(1);
    expect(history()).toStrictEqual('history');
  });
});
