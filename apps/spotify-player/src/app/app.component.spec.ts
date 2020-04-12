import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
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
}


describe('AppComponent', () => {
  beforeEach(async(() => {
    jest.resetAllMocks();
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{
        provide: OAuthService,
        useClass: OAuthServiceStub
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    expect.assertions(1);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should try login', async () => {
    expect.assertions(2);
    const oAuthService = TestBed.inject(OAuthService);
    const tryLoginSpy = jest.spyOn(oAuthService, 'tryLogin')
      .mockImplementation(() => Promise.resolve(false));
    const initImplicitFlowSpy = jest.spyOn(oAuthService, 'initImplicitFlow');

    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();

    expect(tryLoginSpy).toHaveBeenCalledTimes(1);
    expect(initImplicitFlowSpy).toHaveBeenCalledTimes(1);
  });
});
