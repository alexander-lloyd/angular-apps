import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {APP_BASE_HREF, DOCUMENT} from '@angular/common';
import {AppModule, oAuthStorageFactory, translateLoaderFactory} from './app.module';

describe('AppModule', () => {
  it('should have valid base url', () => {
    expect.assertions(1);

    const href = 'http://localhost:4200/';
    const getElementsByTagNameMock = jest.fn().mockImplementation(() => [{
      href
    }]);

    const document = {
      getElementsByTagName: getElementsByTagNameMock
    };

    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{
        provide: DOCUMENT,
        useValue: document
      }]
    });

    expect(TestBed.inject(APP_BASE_HREF)).toBe(href);
  });

  it('should get oauth storage', () => {
    expect.assertions(1);
    expect(oAuthStorageFactory()).toBeDefined();
  });

  it('should get translations loader', () => {
    expect.assertions(1);

    const httpClientMock = jest.fn() as unknown as HttpClient;
    const baseHref = 'https://localhost/base/href';

    expect(translateLoaderFactory(httpClientMock, baseHref)).toBeDefined();
  });
});
