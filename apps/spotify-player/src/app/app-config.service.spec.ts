import {APP_BASE_HREF} from '@angular/common';
import {TestBed} from '@angular/core/testing';
import {AuthConfigService} from './app-config.service';

describe('AppConfigService', () => {
  const href = 'http://localhost:4200';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: href
        },
        AuthConfigService
      ]
    });
  });

  it('should set correct href', () => {
    expect.assertions(1);

    const service = TestBed.inject(AuthConfigService);
    const config = service.getConfig();

    expect(config.redirectUri).toBe(href);
  });
});
