import {storiesOf} from '@storybook/angular';

import {ButtonComponent} from './button.component';

storiesOf('Button Component', module)
  .add('Primary', () => ({
    moduleMetadata: {
      declarations: [ButtonComponent]
    },
    template: '<al-button type="primary">Success</al-button>'
  }))
  .add('Primary Disabled', () => ({
    moduleMetadata: {
      declarations: [ButtonComponent]
    },
    template: '<al-button type="primary" disabled="true">Success</al-button>'
  }))
  .add('Secondary', () => ({
    moduleMetadata: {
      declarations: [ButtonComponent]
    },
    template: '<al-button type="secondary">Success</al-button>'
  }))
  .add('Secondary Disabled', () => ({
    moduleMetadata: {
      declarations: [ButtonComponent]
    },
    template: '<al-button type="secondary" disabled="true">Success</al-button>'
  }));
