import {TestBed} from '@angular/core/testing';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {TranslateService} from '@ngx-translate/core';
import {buildSettingsForm} from './settings-form';

class TranslateServiceStub {
  public use() {}
}

describe('Settings Form', () => {
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{
        provide: TranslateService,
        useClass: TranslateServiceStub
      }]
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
  });

  it('should call change translate when form change function is called', () => {
    expect.assertions(2);

    const useSpy = jest.spyOn(translate, 'use');
    const [languageForm] = buildSettingsForm(translate);

    languageForm.templateOptions.change({
      formControl: {
        value: 'fr'
      }
    } as FormlyFieldConfig);

    expect(useSpy).toHaveBeenCalledTimes(1);
    expect(useSpy).toHaveBeenCalledWith('fr');
  });
});
