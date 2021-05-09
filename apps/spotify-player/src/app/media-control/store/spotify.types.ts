export type CurrentTrackState = {
  name: string;
  progress: number;
  total: number;
};

export type SpotifyState = {
  playing: boolean;
  // The current playing song.
  current: CurrentTrackState | null;
};

export type GlobalState = {
  spotify: SpotifyState
};
