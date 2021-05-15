import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {MediaControlModule} from '../media-control.module';
import {CurrentlyPlayingObject, RepeatState} from './types';

/**
 * Interact with the Spotify Player API.
 *
 * You must use an HTTP interceptor to add the access token header.
 */
@Injectable({
  providedIn: MediaControlModule
})
export class SpotifyPlayerAPIService {
  private spotifyPlayerApiUrl = 'https://api.spotify.com/v1/me';

  /**
   * Constructor.
   *
   * @param http HttpClient.
   */
  public constructor(private http: HttpClient) {}

  /**
   * Get information about the user’s current playback state,
   * including track or episode, progress, and active device.
   *
   * @returns Observable containing the current playback object.
   */
  public getCurrentPlayback$(): Observable<CurrentlyPlayingObject | null> {
    return this.http.get<CurrentlyPlayingObject>(`${this.spotifyPlayerApiUrl}/player`);
  }

  /**
   * Get the object currently being played on the user’s Spotify account.
   *
   * @returns Observable containing the current playback object.
   */
  public getCurrentTrack$(): Observable<CurrentlyPlayingObject> {
    return this.http.get<CurrentlyPlayingObject>(`${this.spotifyPlayerApiUrl}/currently-playing`);
  }

  /**
   * Start a new context or resume current playback on the user’s
   * active device.
   *
   * @returns Empty Observable.
   */
  public resume$(): Observable<null> {
    return this.http.put<null>(`${this.spotifyPlayerApiUrl}/player/play`, {});
  }

  /**
   * Pause playback on the user’s account.
   *
   * @returns Empty Observable.
   */
  public pause$(): Observable<null> {
    return this.http.put<null>(`${this.spotifyPlayerApiUrl}/player/pause`, {});
  }

  /**
   * Skips to previous track in the user’s queue.
   *
   * @returns Empty Observable.
   */
  public previousTrack$(): Observable<null> {
    return this.http.post<null>(`${this.spotifyPlayerApiUrl}/player/previous`, {});
  }

  /**
   * Skips to next track in the user’s queue.
   *
   * @returns Empty Observable.
   */
  public skipTrack$(): Observable<null> {
    return this.http.post<null>(`${this.spotifyPlayerApiUrl}/player/next`, {});
  }

  /**
   * Seeks to the given position in the user’s currently playing track.
   *
   * @param positionMs The position in milliseconds to seek to.
   * @returns Empty Observable.
   */
  public seekPosition$(positionMs: number): Observable<null> {
    return this.http.put<null>(`${this.spotifyPlayerApiUrl}/player/seek?position_ms=${positionMs}`, {});
  }

  /**
   * Set the repeat mode for the user’s playback.
   * Options are: repeat-track, repeat-context, off.
   *
   * @param state The repeat type. 'track', 'context', 'off'.
   * @returns Empty Observable.
   */
  public toggleRepeat$(state: RepeatState): Observable<null> {
    return this.http.put<null>(`${this.spotifyPlayerApiUrl}/player/repeat?state=${state}`, {});
  }

  /**
   * Toggle shuffle on or off for user’s playback.
   *
   * @param shuffle Boolean true to turn on shuffle.
   * @returns Empty Observable.
   */
  public toggleShuffle$(shuffle: boolean): Observable<null> {
    return this.http.put<null>(`${this.spotifyPlayerApiUrl}/player/shuffle?state=${shuffle}`, {});
  }

  /**
   * Set the volume for the user’s current playback device.
   *
   * @param volume The volume to set. Must be a value from
   * 0 to 100 inclusive.
   * @returns Empty Observable.
   */
  public setVolume$(volume: number): Observable<null> {
    return this.http.put<null>(`${this.spotifyPlayerApiUrl}/player/volume?volume_percent=${volume}`, {});
  }
}
