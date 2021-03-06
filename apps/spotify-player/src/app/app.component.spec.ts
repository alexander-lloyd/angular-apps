import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {Component} from '@angular/core';
import {TestBed, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {provideMockStore} from '@ngrx/store/testing';
import {OAuthService, AuthConfig} from 'angular-oauth2-oidc';
import {TranslateTestingModule} from 'ngx-translate-testing';

import {AppComponent} from './app.component';
import {AuthConfigService} from './app-config.service';
import {initialState} from './media-control/store';

class OAuthServiceStub {
  public configure(_: AuthConfig): void {
  }

  public tryLogin(): Promise<boolean> {
    return Promise.resolve(true);
  }

  public initImplicitFlow(): void {
  }

  public hasValidAccessToken(): boolean {
    return false;
  }
}

class AuthConfigServiceStub {
  public getConfig(): AuthConfig {
    return {};
  }
}

@Component({
  selector: 'al-media-control',
  template: ''
})
class MediaComponentStub {}

const translations = {
  loginWithSpotify: 'Log In with Spotify'
};


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let loader: HarnessLoader;

  beforeEach(async () => {
    jest.resetAllMocks();
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MediaComponentStub
      ],
      imports: [
        FontAwesomeModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        TranslateTestingModule.withTranslations('en', translations)
      ],
      providers: [
        {
          provide: OAuthService,
          useClass: OAuthServiceStub
        },
        {
          provide: AuthConfigService,
          useClass: AuthConfigServiceStub
        },
        provideMockStore({initialState})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the app', () => {
    expect.assertions(1);
    expect(app).toBeTruthy();
  });

  it('should show login button', async () => {
    expect.assertions(1);

    const button = await loader.getHarness(MatButtonHarness.with({
      text: translations.loginWithSpotify
    }));
    expect(button).not.toBeNull();
  });

  it('should try login', async () => {
    expect.assertions(1);
    const oAuthService = TestBed.inject(OAuthService);
    const initImplicitFlowSpy = jest.spyOn(oAuthService, 'initImplicitFlow');

    const button = await loader.getHarness(MatButtonHarness.with({
      text: translations.loginWithSpotify
    }));

    await button.click();

    expect(initImplicitFlowSpy).toHaveBeenCalledTimes(1);
  });

  it('should show media component is already logged in', fakeAsync(() => {
    expect.assertions(2);
    const oAuthService = TestBed.inject(OAuthService);
    const hasValidAccessTokenSpy = jest.spyOn(oAuthService, 'hasValidAccessToken')
      .mockImplementation(() => true);

    // Recreate Component
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
    expect(hasValidAccessTokenSpy).toHaveBeenCalledTimes(1);
    expect(fixture.debugElement.nativeElement.querySelector('al-media-control')).not.toBeNull();
    app.ngOnDestroy();
  }));

  it('should call the periodic timer to update the store', fakeAsync(() => {
    expect.assertions(4);
    const oAuthService = TestBed.inject(OAuthService);
    const hasValidAccessTokenSpy = jest.spyOn(oAuthService, 'hasValidAccessToken')
      .mockImplementation(() => true);

    const updateStoreSpy = jest.spyOn(app, 'updateCurrentTrack');
    fixture.detectChanges();

    expect(hasValidAccessTokenSpy).toHaveBeenCalledTimes(1);
    expect(updateStoreSpy).toHaveBeenCalledTimes(0);
    tick(0);
    expect(updateStoreSpy).toHaveBeenCalledTimes(1);
    tick(1000);
    expect(updateStoreSpy).toHaveBeenCalledTimes(2);
    app.ngOnDestroy();
  }));
});
