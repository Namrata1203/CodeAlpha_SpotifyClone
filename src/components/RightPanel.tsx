import React, { useState } from 'react';
import { Sparkles, Check, Trash2, ListOrdered, Calendar } from 'lucide-react';
import { Track } from '../types';

interface RightPanelProps {
  currentTrack: Track | null;
  queue: Track[];
  onRemoveFromQueue?: (trackId: string) => void;
  onClearQueue: () => void;
  onPlayTrack: (trackId: string, tracklistIds: string[]) => void;
}

export default function RightPanel({
  currentTrack,
  queue,
  onRemoveFromQueue,
  onClearQueue,
  onPlayTrack,
}: RightPanelProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  if (!currentTrack) {
    return (
      <div className="w-80 bg-black border-l border-neutral-900 p-6 flex flex-col items-center justify-center text-center text-gray-500 select-none shrink-0 hidden lg:flex h-full pb-24">
        <ListOrdered className="w-12 h-12 text-neutral-800 mb-3 animate-pulse" />
        <h3 className="font-semibold text-neutral-400">Drawer information</h3>
        <p className="text-xs text-neutral-600 max-w-[200px] mt-1 leading-normal">
          Select and play any song to view details, artist biographies, and upcoming queue list.
        </p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-[#121212] border-l border-neutral-900 overflow-y-auto pb-28 flex flex-col gap-6 shrink-0 h-full p-4 text-white select-none hidden lg:flex">
      {/* Drawer Section Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <h2 className="text-sm font-bold tracking-tight text-neutral-200">Now Playing Detail</h2>
      </div>

      {/* Main Track info info card */}
      <div className="flex flex-col gap-3">
        <div className="relative aspect-square w-full rounded overflow-hidden shadow-lg group">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col">
          <span id="rightpanel-track-title" className="font-bold text-lg text-white truncate hover:underline cursor-pointer">{currentTrack.title}</span>
          <span className="text-xs text-gray-400 hover:underline cursor-pointer hover:text-white truncate">{currentTrack.artist}</span>
        </div>
      </div>

      {/* About The Artist section */}
      {currentTrack.bio && (
        <div className="bg-[#181818] rounded-md overflow-hidden shadow">
          {currentTrack.artistCoverUrl && (
            <div className="h-32 relative">
              <img
                src={currentTrack.artistCoverUrl}
                alt={currentTrack.artist}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
              <span className="absolute top-3 left-4 bg-black/40 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider text-neutral-300 backdrop-blur-sm">
                About Artist
              </span>
            </div>
          )}

          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span id="rightpanel-artist-name" className="font-extrabold text-sm">{currentTrack.artist}</span>
              <button
                id="rightpanel-follow-btn"
                onClick={() => setIsFollowing(!isFollowing)}
                className={`text-xs px-3 py-1 rounded-full font-bold transition flex items-center gap-1 cursor-pointer ${
                  isFollowing
                    ? 'border border-neutral-600 hover:border-white text-white bg-transparent'
                    : 'bg-white hover:bg-[#e0e0e0] text-black'
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Following</span>
                  </>
                ) : (
                  <span>Follow</span>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-semibold">
              {currentTrack.bio}
            </p>
          </div>
        </div>
      )}

      {/* Up Next in Queue list */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Upcoming Queue</h3>
          {queue.length > 0 && (
            <button
              id="clear-queue-btn"
              onClick={onClearQueue}
              className="text-[10px] text-gray-400 hover:text-red-500 font-extrabold flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Queue</span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2 max-h-56 overflow-y-auto no-scrollbar pr-1 bg-[#181818] rounded p-2">
          {queue.length > 0 ? (
            queue.map((track, i) => (
              <div
                key={`${track.id}-${i}`}
                className="flex items-center justify-between p-1.5 rounded hover:bg-neutral-800 transition text-xs cursor-pointer group"
                onClick={() => onPlayTrack(track.id, [track.id, ...queue.map(q => q.id)])}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-gray-500 font-bold w-4 text-center text-[10px]">{i + 1}</span>
                  <img
                    src={track.coverUrl}
                    alt=""
                    className="w-8 h-8 rounded object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white truncate">{track.title}</p>
                    <p className="text-gray-400 text-[10px] truncate">{track.artist}</p>
                  </div>
                </div>

                {onRemoveFromQueue && (
                  <button
                    id={`remove-from-queue-${track.id}-${i}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFromQueue(track.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-500 rounded transition"
                    title="Remove from queue"
                  >
                    <Trash2 className="w-3h-3" />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 text-[10px] font-bold">
              Queue is empty. Mix queue items using Search or Recommended tracks.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
