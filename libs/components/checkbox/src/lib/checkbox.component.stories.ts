import {boolean, select} from '@storybook/addon-knobs';

import {CheckboxComponent} from './checkbox.component';

export default {
  title: 'CheckboxComponent',
  component: CheckboxComponent
};

export const checkbox = () => ({
  moduleMetadata: {
    imports: []
  },
  props: {
    checked: boolean('Checked', true),
    type: select('Type', {
      'Primary': 'primary',
      'Secondary': 'secondary'
    }, 'primary'),
    disabled: boolean('Disabled', false)
  }
});

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  props: {
    type: 'primary'
  }
});

export const secondary = () => ({
  moduleMetadata: {
    imports: []
  },
  props: {
    type: 'secondary'
  }
});

export const primaryDisabled = () => ({
  moduleMetadata: {
    imports: []
  },
  props: {
    type: 'primary',
    disabled: true
  }
});

export const secondaryDisabled = () => ({
  moduleMetadata: {
    imports: []
  },
  props: {
    type: 'secondary',
    disabled: true
  }
});
