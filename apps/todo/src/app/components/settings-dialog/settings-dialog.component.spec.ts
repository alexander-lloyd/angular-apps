import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MemoizedSelector} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {of} from 'rxjs';

import * as selectors from '../../store/todo.selectors';
import {SettingsService} from '../../services/settings.service';
import {VersionService} from '../../services/version.service';
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

class VersionServiceStub {
  public getBuildTime() {}
  public getCommitHash() {}
  public getVersion() {}
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
        },
        {
          provide: VersionService,
          useClass: VersionServiceStub
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

  it('should display build time, commit hash and version', () => {
    expect.assertions(3);
    const {debugElement} = fixture;

    const version = '1.0.0';
    const commitHash = 'abc';
    const buildTime = '2020-02-20';
    component.buildTime$ = of(buildTime);
    component.commitHash$ = of(commitHash);
    component.version$ = of(version);
    fixture.detectChanges();

    const buildTimeElement = debugElement.query(By.css('[data-id=al-todo-settings-build-time]')).nativeElement;
    const commitHashElement = debugElement.query(By.css('[data-id=al-todo-settings-commit-hash]')).nativeElement;
    const versionElement = debugElement.query(By.css('[data-id=al-todo-settings-version]')).nativeElement;

    expect(buildTimeElement.textContent).toBe(buildTime);
    expect(commitHashElement.textContent).toBe(commitHash);
    expect(versionElement.textContent).toBe(version);
  });
});
