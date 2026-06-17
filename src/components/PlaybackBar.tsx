import React, { useRef, useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, 
  Volume2, VolumeX, Volume1, Mic2, ListMusic, Info, Heart
} from 'lucide-react';
import { Track, RepeatMode } from '../types';

interface PlaybackBarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  isLiked: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onToggleLike: () => void;
  showQueue: boolean;
  setShowQueue: (show: boolean) => void;
  showLyrics: boolean;
  setShowLyrics: (show: boolean) => void;
  showRightPanel: boolean;
  setShowRightPanel: (show: boolean) => void;
}

export default function PlaybackBar({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  shuffle,
  repeat,
  isLiked,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat,
  onToggleLike,
  showQueue,
  setShowQueue,
  showLyrics,
  setShowLyrics,
  showRightPanel,
  setShowRightPanel,
}: PlaybackBarProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);
  const [isHoveringProgress, setIsHoveringProgress] = useState(false);
  const [isHoveringVolume, setIsHoveringVolume] = useState(false);

  // Formats time in seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    onSeek(percentage * duration);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current) return;
    const rect = volumeBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    onVolumeChange(percentage);
  };

  // Icon corresponding to the volume percentage
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="w-5 h-5 text-gray-400 group-hover:text-white" />;
    if (volume < 0.3) return <Volume1 className="w-5 h-5 text-gray-400 group-hover:text-white" />;
    return <Volume2 className="w-5 h-5 text-gray-400 group-hover:text-white" />;
  };

  const currentPercentage = duration ? (currentTime / duration) * 100 : 0;
  const currentVolumePercentage = isMuted ? 0 : volume * 100;

  return (
    <div className="h-20 bg-[#181818] border-t border-neutral-900 px-4 flex items-center justify-between select-none fixed bottom-0 left-0 right-0 z-50">
      {/* 1. Track Info (Left Panel) */}
      <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
        {currentTrack ? (
          <>
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-14 h-14 rounded object-cover cursor-pointer flex-shrink-0 hover:scale-[1.03] transition-transform shadow-md"
              onClick={() => setShowRightPanel(!showRightPanel)}
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex flex-col">
              <span 
                className="text-sm font-semibold text-white hover:underline cursor-pointer truncate"
                onClick={() => setShowRightPanel(!showRightPanel)}
              >
                {currentTrack.title}
              </span>
              <span className="text-xs text-gray-400 hover:underline hover:text-white cursor-pointer truncate">
                {currentTrack.artist}
              </span>
            </div>
            <button
              id="playback-like-btn"
              onClick={onToggleLike}
              className="p-1 text-gray-400 hover:text-white transition-all cursor-pointer flex-shrink-0"
              title={isLiked ? "Remove from Liked Songs" : "Save to Liked Songs"}
            >
              <Heart 
                className={`w-5 h-5 transition-transform active:scale-125 ${
                  isLiked ? 'fill-[#1db954] text-[#1db954]' : ''
                }`} 
              />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded bg-neutral-800 flex items-center justify-center shrink-0">
              <ListMusic className="w-6 h-6 text-gray-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-400">Select a song</span>
              <span className="text-xs text-gray-500 font-medium">Enjoy some lofi music</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Controls & Tracker (Center Panel) */}
      <div className="flex flex-col items-center gap-1.5 max-w-[45%] w-full flex-1">
        {/* Buttons Row */}
        <div className="flex items-center gap-5">
          {/* Shuffle */}
          <button
            id="playback-shuffle-btn"
            onClick={onToggleShuffle}
            title="Enable Shuffle"
            className={`p-1 transition-all cursor-pointer ${
              shuffle ? 'text-[#1db954] hover:text-[#1ed760]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shuffle className="w-4 h-4 active:scale-95" />
            {shuffle && <div className="w-1 h-1 bg-[#1db954] rounded-full mx-auto mt-0.5" />}
          </button>

          {/* Previous */}
          <button
            id="playback-prev-btn"
            onClick={onPrev}
            disabled={!currentTrack}
            title="Previous Song"
            className="p-1 text-gray-400 hover:text-white disabled:text-neutral-700 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <SkipBack className="w-5 h-5 fill-current active:scale-90" />
          </button>

          {/* Play/Pause Circle */}
          <button
            id="playback-play-toggle-btn"
            onClick={onTogglePlay}
            disabled={!currentTrack}
            title={isPlaying ? "Pause" : "Play"}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all text-center flex-shrink-0 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:scale-100 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-black" />
            ) : (
              <Play className="w-4 h-4 fill-black ml-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            id="playback-next-btn"
            onClick={onNext}
            disabled={!currentTrack}
            title="Next Song"
            className="p-1 text-gray-400 hover:text-white disabled:text-neutral-700 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <SkipForward className="w-5 h-5 fill-current active:scale-90" />
          </button>

          {/* Repeat */}
          <button
            id="playback-repeat-btn"
            onClick={onToggleRepeat}
            title={`Repeat: ${repeat}`}
            className={`p-1 transition-all relative cursor-pointer ${
              repeat !== 'off' ? 'text-[#1db954] hover:text-[#1ed760]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4 active:scale-95" />
            {repeat === 'one' && (
              <span className="absolute -top-1 -right-1.5 bg-[#1db954] text-black font-extrabold text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center scale-90 border border-[#181818]">
                1
              </span>
            )}
            {repeat !== 'off' && repeat !== 'one' && (
              <div className="w-1 h-1 bg-[#1db954] rounded-full mx-auto mt-0.5" />
            )}
          </button>
        </div>

        {/* Progress Timeline Row */}
        <div className="flex items-center gap-2 w-full text-xs text-gray-400">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>

          {/* Interactive Progress Bar */}
          <div
            id="playback-progress-container"
            ref={progressBarRef}
            onClick={handleProgressClick}
            onMouseEnter={() => setIsHoveringProgress(true)}
            onMouseLeave={() => setIsHoveringProgress(false)}
            className="flex-1 h-1 bg-neutral-600 rounded-full cursor-pointer relative group flex items-center"
          >
            <div
              className={`h-full rounded-full transition-all ${
                isHoveringProgress ? 'bg-[#1db954]' : 'bg-white'
              }`}
              style={{ width: `${currentPercentage}%` }}
            />
            {isHoveringProgress && (
              <div
                className="w-3 h-3 rounded-full bg-white absolute shadow border border-neutral-400"
                style={{ left: `calc(${currentPercentage}% - 6px)` }}
              />
            )}
          </div>

          <span className="w-10 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Volume and Extras (Right Panel) */}
      <div className="flex items-center gap-3 w-[30%] min-w-[180px] justify-end text-gray-400">
        {/* Toggle Lyrics */}
        <button
          id="toggle-lyrics-btn"
          onClick={() => {
            setShowLyrics(!showLyrics);
            if (showQueue) setShowQueue(false);
          }}
          title="Lyrics"
          className={`p-1.5 rounded-full hover:bg-neutral-800 transition-all cursor-pointer ${
            showLyrics ? 'text-[#1db954] hover:text-[#1ed760] bg-neutral-800' : 'hover:text-white'
          }`}
        >
          <Mic2 className="w-4 h-4 active:scale-90" />
        </button>

        {/* Toggle Queue */}
        <button
          id="toggle-queue-btn"
          onClick={() => {
            setShowQueue(!showQueue);
            if (showLyrics) setShowLyrics(false);
          }}
          title="Queue"
          className={`p-1.5 rounded-full hover:bg-neutral-800 transition-all cursor-pointer ${
            showQueue ? 'text-[#1db954] hover:text-[#1ed760] bg-neutral-800' : 'hover:text-white'
          }`}
        >
          <ListMusic className="w-4 h-4 active:scale-90" />
        </button>

        {/* Toggle Right Info Drawer */}
        <button
          id="toggle-panel-btn"
          onClick={() => setShowRightPanel(!showRightPanel)}
          title="Now Playing View"
          className={`p-1.5 rounded-full hover:bg-neutral-800 transition-all cursor-pointer ${
            showRightPanel ? 'text-[#1db954] hover:text-[#1ed760] bg-neutral-800' : 'hover:text-white'
          }`}
        >
          <Info className="w-4 h-4 active:scale-90" />
        </button>

        {/* Volume controls */}
        <div className="flex items-center gap-2 group/vol pl-1">
          <button 
            id="volume-mute-btn"
            onClick={onToggleMute} 
            className="p-1 cursor-pointer"
          >
            {getVolumeIcon()}
          </button>
          
          <div
            id="volume-container"
            ref={volumeBarRef}
            onClick={handleVolumeClick}
            onMouseEnter={() => setIsHoveringVolume(true)}
            onMouseLeave={() => setIsHoveringVolume(false)}
            className="w-20 h-1 bg-neutral-600 rounded-full cursor-pointer relative flex items-center"
          >
            <div
              className={`h-full rounded-full ${
                isHoveringVolume ? 'bg-[#1db954]' : 'bg-white'
              }`}
              style={{ width: `${currentVolumePercentage}%` }}
            />
            {isHoveringVolume && (
              <div
                className="w-3 h-3 rounded-full bg-white absolute shadow border border-neutral-400"
                style={{ left: `calc(${currentVolumePercentage}% - 6px)` }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
