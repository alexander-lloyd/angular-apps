import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {Component} from '@angular/core';
import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {OAuthService, AuthConfig} from 'angular-oauth2-oidc';

import {AppComponent} from './app.component';

class OAuthServiceStub {
  public configure(config: AuthConfig): void {
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

@Component({
  selector: 'al-media-control',
  template: ''
})
class MediaComponentStub {}


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    jest.resetAllMocks();
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MediaComponentStub
      ],
      imports: [
        FontAwesomeModule,
        MatButtonModule,
        MatProgressSpinnerModule
      ],
      providers: [{
        provide: OAuthService,
        useClass: OAuthServiceStub
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    app.ngOnInit();
    loader = TestbedHarnessEnvironment.loader(fixture);
  }));

  it('should create the app', () => {
    expect.assertions(1);
    expect(app).toBeTruthy();
  });

  it('should show login button', async () => {
    expect.assertions(1);
    const button = await loader.getHarness(MatButtonHarness.with({
      text: 'Login in with Spotify'
    }));
    expect(button).not.toBeNull();
  });

  it('should try login', async () => {
    expect.assertions(1);
    const oAuthService = TestBed.inject(OAuthService);
    const initImplicitFlowSpy = jest.spyOn(oAuthService, 'initImplicitFlow');

    const button = await loader.getHarness(MatButtonHarness.with({
      text: 'Login in with Spotify'
    }));

    await button.click();

    expect(initImplicitFlowSpy).toHaveBeenCalledTimes(1);
  });

  it('should show media component is already logged in', async () => {
    expect.assertions(2);
    const oAuthService = TestBed.inject(OAuthService);
    const hasValidAccessTokenSpy = jest.spyOn(oAuthService, 'hasValidAccessToken')
      .mockImplementation(() => true);

    // Recreate Component
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(hasValidAccessTokenSpy).toHaveBeenCalledTimes(1);
    expect(fixture.debugElement.nativeElement.querySelector('al-media-control')).not.toBeNull();
  });
});
