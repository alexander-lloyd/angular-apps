export type SpotifyState = {
  playing: boolean;
  // The current playing song.
  current: {
    name: string;
  } | null;
};
