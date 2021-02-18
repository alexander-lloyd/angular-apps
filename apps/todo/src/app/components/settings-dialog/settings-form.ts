/* eslint-disable max-lines-per-function */
import {FormlyFieldConfig} from '@ngx-formly/core';

/**
 * Build the settings form.
 *
 * @param translate Translate Service.
 * @returns Settings form.
 */
export function buildSettingsForm(): FormlyFieldConfig[] {
  return [
    {
      key: 'language',
      type: 'select',
      templateOptions: {
        required: true,
        translate: true,
        label: 'TODO.SETTINGS.LANGUAGE',
        options: [
          {
            label: 'English',
            value: 'en'
          },
          {
            label: 'French',
            value: 'fr'
          }
        ],
        attributes: {
          'data-id': 'al-todo-settings-language-select'
        }
      }
    }
  ];
}
