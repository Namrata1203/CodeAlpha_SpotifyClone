import React, { useEffect, useRef, useState } from 'react';
import { Mic, VolumeX, Flame } from 'lucide-react';
import { Track } from '../types';

interface LyricsViewProps {
  currentTrack: Track | null;
  currentTime: number;
  isPlaying: boolean;
  onSeek: (time: number) => void;
}

export default function LyricsView({
  currentTrack,
  currentTime,
  isPlaying,
  onSeek,
}: LyricsViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Set up sync highlight lines
  useEffect(() => {
    if (!currentTrack || !currentTrack.lyricsTimeline) return;
    
    const timeline = currentTrack.lyricsTimeline;
    let indexToSelect = 0;
    
    // Find the latest timestamp that is <= the current playback time
    for (let i = 0; i < timeline.length; i++) {
      if (currentTime >= timeline[i]) {
        indexToSelect = i;
      } else {
        break;
      }
    }
    
    setActiveIndex(indexToSelect);
  }, [currentTime, currentTrack]);

  // Center active lyric automatically with smooth scroll
  useEffect(() => {
    if (!containerRef.current) return;
    
    const activeElement = containerRef.current.querySelector('[data-active="true"]');
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex]);

  if (!currentTrack) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#121212] select-none text-center h-full">
        <Mic className="w-16 h-16 text-gray-600 mb-4 animate-bounce" />
        <h2 className="text-xl font-bold text-gray-300">Lyrics display mode</h2>
        <p className="text-xs text-gray-500 max-w-sm mt-1 leading-relaxed">
          Select or double click a lofi or synth track, then hit start to sync up visual scrolling lyrics!
        </p>
      </div>
    );
  }

  const accentColor = currentTrack.accentColor || '#1db954';

  return (
    <div 
      className="flex-1 overflow-y-auto pb-32 flex flex-col relative h-full transition-all duration-500 ease-out"
      style={{ backgroundImage: `linear-gradient(to bottom, ${accentColor}dd, #121212)` }}
    >
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-3xl mx-auto px-8 py-16 w-full flex-1 flex flex-col z-10 select-none relative">
        {/* Track Title banner */}
        <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-10 w-full">
          <img
            src={currentTrack.coverUrl}
            alt=""
            className="w-16 h-16 rounded shadow-lg object-shrink shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0">
            <h1 className="text-2xl font-black tracking-tight text-white truncate">{currentTrack.title}</h1>
            <p className="text-sm font-semibold text-neutral-300 truncate">{currentTrack.artist}</p>
          </div>
          <div className="ml-auto bg-black/40 px-3 py-1 rounded-full text-xs text-[#1db954] font-bold flex items-center gap-1.5 border border-[#1db954]/20">
            <Flame className="w-3.5 h-3.5 fill-current animate-pulse text-[#1db954]" />
            <span>Synced</span>
          </div>
        </div>

        {/* Scrollable lyrics core stack */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto flex flex-col gap-8 pr-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {currentTrack.lyrics.map((line, idx) => {
            const isActive = idx === activeIndex;
            const isPlayed = idx < activeIndex;

            return (
              <p
                key={idx}
                id={`lyric-line-${idx}`}
                data-active={isActive ? "true" : "false"}
                onClick={() => {
                  if (currentTrack.lyricsTimeline) {
                    const seekTime = currentTrack.lyricsTimeline[idx];
                    onSeek(seekTime);
                  }
                }}
                className={`text-2xl md:text-3xl font-black tracking-tight cursor-pointer transition-all duration-300 origin-left hover:scale-[1.01] hover:text-white ${
                  isActive 
                    ? 'text-white scale-[1.03] select-text drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)] opacity-100' 
                    : isPlayed
                      ? 'text-neutral-400 opacity-60'
                      : 'text-neutral-500 opacity-30'
                }`}
              >
                {line}
              </p>
            );
          })}
        </div>

        <div className="text-[10px] text-gray-500 text-center mt-10 uppercase tracking-widest font-black">
          Click lines to scrub/seek playback directly • Lyrics synced by SpotifyClone
        </div>
      </div>
    </div>
  );
}
