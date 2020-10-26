/* eslint-disable max-lines-per-function */
import {FormlyFieldConfig} from '@ngx-formly/core';
import {TranslateService} from '@ngx-translate/core';

/**
 * Build the settings form.
 *
 * @param translate Translate Service.
 * @returns Settings form.
 */
export function buildSettingsForm(translate: TranslateService): FormlyFieldConfig[] {
  return [
    {
      key: 'language',
      type: 'select',
      templateOptions: {
        required: true,
        translate: true,
        label: 'TODO.SETTINGS.LANGUAGE',
        change: (field: FormlyFieldConfig) => translate.use(field.formControl.value),
        options: [
          {
            label: 'English',
            value: 'en'
          },
          {
            label: 'French',
            value: 'fr'
          }
        ]
      }
    }
  ];
}
