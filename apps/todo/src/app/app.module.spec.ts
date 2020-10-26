import {DOCUMENT, APP_BASE_HREF} from '@angular/common';
import {TestBed} from '@angular/core/testing';
import {AppModule} from './app.module';

describe('AppModule', () => {
  it('should be truthy', () => {
    expect.assertions(1);
    expect(AppModule).toBeTruthy();
  });

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
});
