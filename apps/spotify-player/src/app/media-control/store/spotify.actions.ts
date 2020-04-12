import {createAction} from '@ngrx/store';

export const PAUSE = '[Spotify Player] [MediaController] Pause';
export const PLAY = '[Spotify Player] [MediaController] Play';

export const pause = createAction(PAUSE);
export const play = createAction(PLAY);
