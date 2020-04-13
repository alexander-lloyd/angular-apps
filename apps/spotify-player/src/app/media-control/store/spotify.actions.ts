import {createAction} from '@ngrx/store';

export const PAUSE = '[Spotify Player] [MediaController] Pause';
export const PAUSE_ERROR = '[Spotify Player] [MediaController] Pause Error';
export const PLAY = '[Spotify Player] [MediaController] Play';
export const PLAY_ERROR = '[Spotify Player] [MediaController] Play Error';

export const pause = createAction(PAUSE);
export const pauseErrorAction = createAction(PAUSE_ERROR);
export const play = createAction(PLAY);
export const playErrorAction = createAction(PLAY_ERROR);
