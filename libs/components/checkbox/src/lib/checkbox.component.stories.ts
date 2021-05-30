import {boolean, select, text} from '@storybook/addon-knobs';
import {Meta, Story} from '@storybook/angular/types-6-0';

import {CheckboxComponent} from './checkbox.component';

export default {
  title: 'Components/Checkbox',
  component: CheckboxComponent
} as Meta;

export const checkbox: Story<CheckboxComponent> = () => ({
  moduleMetadata: {
    imports: []
  },
  props: {
    checked: boolean('Checked', true),
    type: select('Type', {
      'Primary': 'primary',
      'Secondary': 'secondary'
    }, 'primary'),
    disabled: boolean('Disabled', false),
    label: text('Checkbox Label', 'Checkbox Label')
  },
  template: `<al-checkbox [checked]="checked" [type]="type" [disabled]="disabled">{{ label }}</al-checkbox>`
});
