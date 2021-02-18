import {buildSettingsForm} from './settings-form';

describe('Settings Form', () => {
  it('should be truthy', () => {
    expect.assertions(1);
    expect(buildSettingsForm()).toBeTruthy();
  });
});
