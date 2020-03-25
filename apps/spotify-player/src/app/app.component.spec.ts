import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
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
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
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
});
