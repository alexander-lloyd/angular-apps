import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {SpotifyPlayerAPIServiceService} from './spotify-player-apiservice.service';

import * as currentlyPlayingObject from './currently-playing-object.response.json';
import {CurrentlyPlayingObject, RepeatState} from './types';

describe('SpotifyPlayerAPIServiceService', () => {
  let httpTestingController: HttpTestingController;
  let service: SpotifyPlayerAPIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpotifyPlayerAPIServiceService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SpotifyPlayerAPIServiceService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect.assertions(1);
    expect(service).toBeTruthy();
  });

  it('should get current playback', () => {
    expect.assertions(2);
    const mockResponse = currentlyPlayingObject as CurrentlyPlayingObject;

    service.getCurrentPlayback$().subscribe((response: CurrentlyPlayingObject) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpTestingController.expectOne('https://api.spotify.com/v1/me/player');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get current track', () => {
    expect.assertions(2);
    const mockResponse = currentlyPlayingObject as CurrentlyPlayingObject;

    service.getCurrentTrack$().subscribe((response: CurrentlyPlayingObject) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpTestingController.expectOne('https://api.spotify.com/v1/me/currently-playing');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should resume playback', () => {
    expect.assertions(3);
    const mockResponse = null;

    service.resume$().subscribe((response: null) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne('https://api.spotify.com/v1/me/player/play');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toStrictEqual({});
    req.flush(mockResponse);
  });

  it('should pause playback', () => {
    expect.assertions(3);
    const mockResponse = null;

    service.pause$().subscribe((response: null) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne('https://api.spotify.com/v1/me/player/pause');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toStrictEqual({});
    req.flush(mockResponse);
  });

  it('should skip to previous track', () => {
    expect.assertions(3);
    const mockResponse = null;

    service.previousTrack$().subscribe((response: null) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne('https://api.spotify.com/v1/me/player/previous');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toStrictEqual({});
    req.flush(mockResponse);
  });

  it('should skip track', () => {
    expect.assertions(3);
    const mockResponse = null;

    service.skipTrack$().subscribe((response: null) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne('https://api.spotify.com/v1/me/player/next');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toStrictEqual({});
    req.flush(mockResponse);
  });

  it('should seek to position in track', () => {
    expect.assertions(3);
    const mockResponse = null;
    const position = 1000;

    service.seekPosition$(position).subscribe((response: null) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne(`https://api.spotify.com/v1/me/player/seek?position_ms=${position}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toStrictEqual({});
    req.flush(mockResponse);
  });

  it.each([
    ['track'],
    ['context'],
    ['off']
  ])('should toggle repeat to %s', (repeatState: RepeatState) => {
    expect.assertions(3);
    const mockResponse = null;

    service.toggleRepeat$(repeatState).subscribe((response: null) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne(`https://api.spotify.com/v1/me/player/repeat?state=${repeatState}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toStrictEqual({});
    req.flush(mockResponse);
  });

  it.each([
    [true],
    [false]
  ])('should toggle shuffle to %b', (shuffle: boolean) => {
    expect.assertions(3);
    const mockResponse = null;

    service.toggleShuffle$(shuffle).subscribe((response: null) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne(`https://api.spotify.com/v1/me/player/shuffle?state=${shuffle}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toStrictEqual({});
    req.flush(mockResponse);
  });

  it('should change volume', () => {
    expect.assertions(3);
    const mockResponse = null;
    const volume = 100;

    service.setVolume$(volume).subscribe((response: null) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne(`https://api.spotify.com/v1/me/player/volume?state=${volume}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toStrictEqual({});
    req.flush(mockResponse);
  });
});

