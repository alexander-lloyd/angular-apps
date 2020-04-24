export type SpotifyState = {
  playing: boolean;
  // The current playing song.
  current: {
    name: string;
    progress: number;
    total: number;
  } | null;
};
