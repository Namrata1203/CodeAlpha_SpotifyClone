export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  url: string;
  coverUrl: string;
  accentColor: string; // Hex color for the theme (e.g. '#1db954')
  lyrics: string[];
  lyricsTimeline?: number[]; // matching timestamps in seconds for each lyric line
  bio?: string;
  artistCoverUrl?: string;
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  trackIds: string[];
  isCustom?: boolean;
  accentColor: string;
}

export type RepeatMode = 'off' | 'all' | 'one';

export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  currentTrackId: string | null;
  queue: string[]; // List of upcoming track IDs
  history: string[]; // Track IDs played previously
}
