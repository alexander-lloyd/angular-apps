
import {ButtonComponent} from './button.component';

export default {
  title: 'Button Component'
};


export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: ButtonComponent,
  props: {
    type: 'primary'
  }
});

export const secondary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: ButtonComponent,
  props: {
    type: 'secondary'
  }
});
