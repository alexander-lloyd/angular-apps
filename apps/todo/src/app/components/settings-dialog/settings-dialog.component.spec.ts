import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MemoizedSelector} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {of} from 'rxjs';

import * as selectors from '../../store/todo.selectors';
import {SettingsService} from '../../services/settings.service';
import {GlobalState} from '../../store/todo.types';
import {DEFAULT_SETTINGS, Settings} from '../../types/settings.type';
import {SettingsDialogComponent} from './settings-dialog.component';

const translations = {};


class DialogRefStub {
  public close() {}
}

class SettingsServiceStub {
  public getSettings() {
    return of({
      language: 'en'
    });
  }

  public saveSettings() {}
}

describe('SettingsDialogComponent', () => {
  const initialState: GlobalState = {
    todo: {
      todos: [],
      settings: DEFAULT_SETTINGS
    }
  };
  let component: SettingsDialogComponent;
  let fixture: ComponentFixture<SettingsDialogComponent>;
  let loader: HarnessLoader;
  let mockStore: MockStore;
  let mockSelectSettingsSelector: MemoizedSelector<GlobalState, Settings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsDialogComponent],
      imports: [
        FormsModule,
        FormlyMaterialModule,
        FormlyModule.forRoot(),
        MatDialogModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        TranslateTestingModule.withTranslations('en', translations)
      ],
      providers: [
        {
          provide: SettingsService,
          useClass: SettingsServiceStub
        },
        provideMockStore({initialState}),
        {
          provide: MatDialogRef,
          useClass: DialogRefStub
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    mockStore = TestBed.inject(MockStore);
    mockSelectSettingsSelector = mockStore.overrideSelector(
      selectors.selectSettings,
      DEFAULT_SETTINGS
    );
  });

  it('should create', () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });

  it('should show settings from store', () => {
    expect.assertions(1);
    const model: Settings = {
      language: 'fr'
    };

    mockSelectSettingsSelector.setResult(model);
    mockStore.refreshState();
    fixture.detectChanges();

    expect(component.model).toStrictEqual(model);
  });

  it('should submit action when save button is pressed', async () => {
    expect.assertions(2);

    const dialogRef = TestBed.inject(MatDialogRef);
    jest.spyOn(dialogRef, 'close').mockImplementation(() => {});
    const onSubmitSpy = jest.spyOn(component, 'onSubmit');

    const saveButton = await loader.getHarness(MatButtonHarness.with({
      selector: '[data-id=al-todo-settings-save]'
    }));
    await saveButton.click();

    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    expect(onSubmitSpy).toHaveBeenLastCalledWith(DEFAULT_SETTINGS);
  });

  it('should close the dialog when save is pressed', async () => {
    expect.assertions(2);

    const dialogRef = TestBed.inject(MatDialogRef);
    const closeDialogSpy = jest.spyOn(dialogRef, 'close').mockImplementation(() => {});
    const submitFormSpy = jest.spyOn(component, 'onSubmit');

    const saveButton = await loader.getHarness(MatButtonHarness.with({
      selector: '[data-id=al-todo-settings-save]'
    }));
    await saveButton.click();

    expect(closeDialogSpy).toHaveBeenCalledTimes(1);
    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

  it('should close the dialog when cancel button is pressed', async () => {
    expect.assertions(2);

    const dialogRef = TestBed.inject(MatDialogRef);
    const closeDialogSpy = jest.spyOn(dialogRef, 'close').mockImplementation(() => {});
    const submitFormSpy = jest.spyOn(component, 'onSubmit');

    const cancelButton = await loader.getHarness(MatButtonHarness.with({
      selector: '[data-id=al-todo-settings-cancel]'
    }));
    await cancelButton.click();

    expect(closeDialogSpy).toHaveBeenCalledTimes(1);
    expect(submitFormSpy).toHaveBeenCalledTimes(0);
  });
});
