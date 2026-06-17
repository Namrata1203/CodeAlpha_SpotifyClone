import React from 'react';
import { Home, Search, Library, Plus, Heart, Music, Trash2 } from 'lucide-react';
import { Playlist } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: any) => void;
  playlists: Playlist[];
  selectedPlaylistId: string | null;
  onSelectPlaylist: (id: string) => void;
  onCreatePlaylist: () => void;
  onDeletePlaylist: (id: string) => void;
  likedCount: number;
}

export default function Sidebar({
  currentTab,
  setCurrentTab,
  playlists,
  selectedPlaylistId,
  onSelectPlaylist,
  onCreatePlaylist,
  onDeletePlaylist,
  likedCount,
}: SidebarProps) {
  return (
    <div className="w-64 bg-black p-3 flex flex-col gap-2 h-full shrink-0 select-none text-gray-300">
      {/* Navigation Block */}
      <div className="bg-[#121212] rounded-lg p-5 flex flex-col gap-4">
        {/* Spotify Logo */}
        <div 
          className="flex items-center gap-2 text-white font-bold text-xl cursor-pointer hover:scale-[1.02] transition-transform"
          onClick={() => { setCurrentTab('home'); }}
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#1db954]" id="spotify-logo">
            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5858 16.4243C16.3934 16.7368 15.986 16.8373 15.6736 16.6449C13.201 15.1322 10.1557 14.7958 6.5513 15.6206C6.1969 15.7018 5.845 15.4745 5.76383 15.1201C5.68266 14.7657 5.90999 14.4138 6.26439 14.3326C10.2078 13.4302 13.5824 13.8228 16.3652 15.534C16.6776 15.7265 16.7781 16.1339 16.5858 16.4243ZM17.9734 13.7259C17.728 14.1209 17.2114 14.2464 16.8164 14.001C14.1215 12.3435 9.9961 11.8596 6.8404 12.8184C6.3888 12.9556 5.91039 12.7001 5.7732 12.2485C5.63601 11.7969 5.8915 11.3185 6.3431 11.1813C9.9547 10.0841 14.5097 10.6309 17.5734 12.518C17.9685 12.761 18.0939 13.2775 17.9734 13.7259ZM18.0949 10.9329C15.1102 9.1595 10.1654 8.9959 7.3061 9.8637C6.8497 10.0023 6.36539 9.7423 6.22683 9.2859C6.08827 8.8295 6.34827 8.3452 6.80467 8.2066C10.1011 7.2045 15.561 7.3913 19.0118 9.4419C19.4241 9.6868 19.5593 10.2205 19.3144 10.6328C19.0695 11.0451 18.5358 11.1803 18.0949 10.9329Z" />
          </svg>
          <span className="text-white tracking-tight">Spotify<span className="text-[#1db954] text-xs align-super ml-0.5">Clone</span></span>
        </div>

        {/* Tab Items */}
        <nav className="flex flex-col gap-4 font-semibold text-sm">
          <button
            id="sidebar-home-btn"
            onClick={() => { setCurrentTab('home'); }}
            className={`flex items-center gap-4 transition-all duration-200 text-left w-full cursor-pointer hover:text-white ${
              currentTab === 'home' ? 'text-white' : 'text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>

          <button
            id="sidebar-search-btn"
            onClick={() => { setCurrentTab('search'); }}
            className={`flex items-center gap-4 transition-all duration-200 text-left w-full cursor-pointer hover:text-white ${
              currentTab === 'search' ? 'text-white' : 'text-gray-400'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </nav>
      </div>

      {/* Library Block */}
      <div className="bg-[#121212] rounded-lg p-4 flex-1 flex flex-col overflow-hidden">
        {/* Library Header */}
        <div className="flex items-center justify-between px-2 mb-4 text-gray-400">
          <div className="flex items-center gap-2 font-bold text-sm hover:text-white transition-colors cursor-pointer">
            <Library className="w-5 h-5" />
            <span>Your Library</span>
          </div>
          <button
            id="sidebar-create-playlist-btn"
            onClick={onCreatePlaylist}
            title="Create new playlist"
            className="p-1 hover:bg-[#1f1f1f] rounded-full hover:text-white transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Playlists List Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-1 pr-1">
          {/* Liked Songs Special Card */}
          <div
            id="sidebar-liked-songs"
            onClick={() => { setCurrentTab('liked'); }}
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer group transition-all ${
              currentTab === 'liked' ? 'bg-[#232323] text-white' : ''
            }`}
          >
            <div className="w-11 h-11 rounded bg-gradient-to-br from-[#450e74] to-[#c4b5fd] flex items-center justify-center shrink-0 shadow-md">
              <Heart className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm truncate text-white">Liked Songs</span>
              <span className="text-xs text-gray-400 font-medium">
                Playlist • {likedCount} {likedCount === 1 ? 'song' : 'songs'}
              </span>
            </div>
          </div>

          <div className="h-[1px] bg-neutral-800 my-2 mx-2" />

          {/* User Playlists */}
          {playlists.map((playlist) => {
            const isSelected = selectedPlaylistId === playlist.id && (currentTab === 'playlist');
            return (
              <div
                key={playlist.id}
                id={`sidebar-playlist-${playlist.id}`}
                onClick={() => onSelectPlaylist(playlist.id)}
                className={`flex items-center justify-between p-2 rounded-md group hover:bg-[#1a1a1a] cursor-pointer transition-all ${
                  isSelected ? 'bg-[#232323] text-green-500' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {playlist.coverUrl ? (
                    <img
                      src={playlist.coverUrl}
                      alt={playlist.name}
                      className="w-11 h-11 rounded object-cover shrink-0 shadow"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded bg-neutral-800 flex items-center justify-center shrink-0">
                      <Music className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className={`font-semibold text-sm truncate ${isSelected ? 'text-[#1db954]' : 'text-white'}`}>
                      {playlist.name}
                    </span>
                    <span className="text-xs text-gray-400 font-medium truncate">
                      Playlist • {playlist.trackIds.length} {playlist.trackIds.length === 1 ? 'track' : 'tracks'}
                    </span>
                  </div>
                </div>

                {playlist.isCustom && (
                  <button
                    id={`sidebar-delete-playlist-${playlist.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePlaylist(playlist.id);
                    }}
                    title="Delete playlist"
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-[#282828] rounded transition-all cursor-pointer mr-1 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}

          {playlists.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500 font-medium px-2">
              No playlists found. Create one by clicking the plus icon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
