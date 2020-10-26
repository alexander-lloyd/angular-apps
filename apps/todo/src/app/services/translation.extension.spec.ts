import {FormlyFieldConfig} from '@ngx-formly/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';
import {registerTranslateExtension, TranslateExtension} from './translation.extension';

class TranslateServiceStub {
  public stream() {}
}

describe('TranslationExtension', () => {
  let translateService: TranslateService;
  let extension: TranslateExtension;

  beforeEach(() => {
    translateService = new TranslateServiceStub() as unknown as TranslateService;
    extension = new TranslateExtension(translateService);
  });

  it('should be truthy', () => {
    expect.assertions(1);
    expect(extension).toBeTruthy();
  });

  it('should prepopulate a field', async () => {
    expect.assertions(4);
    const field: FormlyFieldConfig = {
      templateOptions: {
        translate: true,
        label: 'label'
      }
    };

    const translation = 'translation';
    const translateStreamSpy = jest.spyOn(translateService, 'stream')
      .mockImplementation(() => of(translation));

    extension.prePopulate(field);

    expect(field.templateOptions._translated).toBeTruthy();
    expect(field.expressionProperties).toBeTruthy();
    const translated = await (field.expressionProperties['templateOptions.label'] as Observable<string>).toPromise();
    expect(translated).toBe(translation);
    expect(translateStreamSpy).toHaveBeenCalledWith(field.templateOptions.label);
  });

  it('shouldn\'t populate a field without translate field', () => {
    expect.assertions(3);
    const field: FormlyFieldConfig = {
      templateOptions: {
        label: 'label'
      }
    };

    extension.prePopulate(field);

    expect(field.templateOptions._translated).toBeFalsy();
    expect(field.templateOptions.label).toBe('label');
    expect(field.expressionProperties).toBeFalsy();
  });

  it('shouldn\'t populate a field without translate field 2', () => {
    expect.assertions(2);
    const field: FormlyFieldConfig = {};

    extension.prePopulate(field);

    expect(field.templateOptions).toBeFalsy();
    expect(field.expressionProperties).toBeFalsy();
  });

  it('should define module', () => {
    expect.assertions(2);

    const translation = of('form field required');
    jest.spyOn(translateService, 'stream')
      .mockReturnValue(translation);

    const moduleDefinition = registerTranslateExtension(translateService);

    expect(moduleDefinition).toBeTruthy();
    const message = (moduleDefinition.validationMessages[0].message as () => string)();
    expect(message).toBe(translation);
  });
});
