import {ConfigOption, FormlyFieldConfig} from '@ngx-formly/core';
import {TranslateService} from '@ngx-translate/core';

/**
 * Translate Formly Extension.
 */
export class TranslateExtension {
  /**
   * Constructor
   *
   * @param translate TranslationService.
   */
  public constructor(
    private translate: TranslateService
  ) {}

  /**
   * Pre-populate a form field.
   *
   * @param field Formly field.
   */
  public prePopulate(field: FormlyFieldConfig): void {
    const to = field.templateOptions || {};
    if (!to.translate || to._translated) {
      return;
    }

    to._translated = true;
    field.expressionProperties = {
      ...field.expressionProperties || {},
      'templateOptions.label': this.translate.stream(to.label)
    };
  }
}

/**
 * Register translation extension.
 *
 * @param translate TranslateService.
 * @returns ??
 */
export function registerTranslateExtension(translate: TranslateService): ConfigOption {
  return {
    validationMessages: [
      {
        name: 'required',
        message() {
          return translate.stream('FORM.VALIDATION.REQUIRED');
        }
      }
    ],
    extensions: [{
      name: 'translate',
      extension: new TranslateExtension(translate)
    }]
  };
}
