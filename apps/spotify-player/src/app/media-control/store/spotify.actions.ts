import {createAction, props} from '@ngrx/store';
import {CurrentlyPlayingObject} from '../services/types';

export const NOOP = '[Spotify Player] [MediaController] Noop Action';
export const PAUSE = '[Spotify Player] [MediaController] Pause';
export const PAUSE_ERROR = '[Spotify Player] [MediaController] Pause Error';
export const PLAY = '[Spotify Player] [MediaController] Play';
export const PLAY_ERROR = '[Spotify Player] [MediaController] Play Error';
export const PREVIOUS = '[Spotify Player] [MediaController] Previous Track';
export const PREVIOUS_ERROR = '[Spotify Player] [MediaController] Previous Track Error';
export const SKIP = '[Spotify Player] [MediaController] Skip Track';
export const SKIP_ERROR = '[Spotify Player] [MediaController] Skip Track Error';
export const CURRENT_TRACK_REQUEST = '[Spotify Player] [MediaController] Current Track Request';
export const CURRENT_TRACK_SUCCESS = '[Spotify Player] [MediaController] Current Track Success';
export const CURRENT_TRACK_FAILURE = '[Spotify Player] [MediaController] Current Track Failure';

export const noop = createAction(NOOP);
export const pause = createAction(PAUSE);
export const pauseErrorAction = createAction(PAUSE_ERROR);
export const play = createAction(PLAY);
export const playErrorAction = createAction(PLAY_ERROR);
export const previousAction = createAction(PREVIOUS);
export const previousErrorAction = createAction(PREVIOUS_ERROR);
export const skipAction = createAction(SKIP);
export const skipErrorAction = createAction(SKIP_ERROR);
export const currentTrackRequest = createAction(CURRENT_TRACK_REQUEST);
export const currentTrackSuccess = createAction(CURRENT_TRACK_SUCCESS, props<CurrentlyPlayingObject | null>());
export const currentTrackFailure = createAction(CURRENT_TRACK_FAILURE);
