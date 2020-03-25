import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {SpotifyPlayerAPIServiceService} from './spotify-player-apiservice.service';

describe('SpotifyPlayerAPIServiceService', () => {
  let service: SpotifyPlayerAPIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpotifyPlayerAPIServiceService]
    });
    service = TestBed.inject(SpotifyPlayerAPIServiceService);
  });

  it('should be created', () => {
    expect.assertions(1);
    expect(service).toBeTruthy();
  });
});

