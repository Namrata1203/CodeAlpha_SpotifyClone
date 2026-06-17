import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Heart, Search, Clock, Plus, Music, HelpCircle, 
  Trash2, Sparkles, Check, ChevronRight, Compass
} from 'lucide-react';
import { Track, Playlist } from '../types';

interface PlaylistViewProps {
  currentTab: string;
  playlists: Playlist[];
  selectedPlaylistId: string | null;
  allTracks: Track[];
  onSelectPlaylist: (id: string) => void;
  likedTrackIds: string[];
  onToggleLike: (trackId: string) => void;
  currentTrackId: string | null;
  isPlaying: boolean;
  onPlayTrack: (trackId: string, tracklistIds: string[]) => void;
  onTogglePlay: () => void;
  onAddTrackToPlaylist: (trackId: string, playlistId: string) => void;
  onRemoveTrackFromPlaylist: (trackId: string, playlistId: string) => void;
}

export default function PlaylistView({
  currentTab,
  playlists,
  selectedPlaylistId,
  allTracks,
  onSelectPlaylist,
  likedTrackIds,
  onToggleLike,
  currentTrackId,
  isPlaying,
  onPlayTrack,
  onTogglePlay,
  onAddTrackToPlaylist,
  onRemoveTrackFromPlaylist,
}: PlaylistViewProps) {
  const [greeting, setGreeting] = useState('Welcome');
  const [searchQuery, setSearchQuery] = useState('');
  const [customPlaylistSearch, setCustomPlaylistSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Set greeting based on local hour
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good morning');
    else if (hours < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Filter tracklist for main Search view
  const searchFilteredTracks = allTracks.filter(track => {
    const query = searchQuery.toLowerCase();
    const matchesQuery = track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query) ||
      (track.genre && track.genre.toLowerCase().includes(query));
    
    if (activeCategory) {
      const matchesCategory = track.genre?.toLowerCase() === activeCategory.toLowerCase();
      return matchesQuery && matchesCategory;
    }
    return matchesQuery;
  });

  // Unique playlist categories for browsing
  const searchCategories = [
    { name: 'Lofi', color: 'from-amber-600 to-yellow-500' },
    { name: 'Synthwave', color: 'from-pink-600 to-purple-600' },
    { name: 'Ambient', color: 'from-blue-600 to-indigo-700' },
    { name: 'Acoustic', color: 'from-emerald-600 to-teal-500' },
    { name: 'Cyberpunk', color: 'from-orange-600 to-red-500' },
    { name: 'Pop Punk', color: 'from-rose-500 to-orange-400' },
  ];

  // Helper to convert duration to text
  const formatDurationRaw = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Select playlist info to show
  let displayedPlaylist: Playlist | null = null;
  let displayedTracks: Track[] = [];
  let playlistTitle = '';
  let playlistDesc = '';
  let playlistCover = '';
  let playlistAccent = '#1db954';
  let isLikedPlaylist = false;

  if (currentTab === 'liked') {
    isLikedPlaylist = true;
    displayedTracks = allTracks.filter(t => likedTrackIds.includes(t.id));
    playlistTitle = 'Liked Songs';
    playlistDesc = 'Your personal shelf of favorite items and late-night lofi tracks.';
    playlistCover = 'https://picsum.photos/seed/likedheart/300/300';
    playlistAccent = '#4f46e5'; // Indigo
  } else if (currentTab === 'playlist' && selectedPlaylistId) {
    displayedPlaylist = playlists.find(p => p.id === selectedPlaylistId) || null;
    if (displayedPlaylist) {
      displayedTracks = allTracks.filter(t => displayedPlaylist!.trackIds.includes(t.id));
      playlistTitle = displayedPlaylist.name;
      playlistDesc = displayedPlaylist.description;
      playlistCover = displayedPlaylist.coverUrl || 'https://picsum.photos/seed/playlist/300/300';
      playlistAccent = displayedPlaylist.accentColor || '#1db954';
    }
  }

  // Format total playlist duration
  const totalDurationMin = Math.round(displayedTracks.reduce((acc, t) => acc + t.duration, 0) / 60);

  // Handle Play Playlist action click
  const handlePlayPlaylist = () => {
    if (displayedTracks.length === 0) return;
    const trackIds = displayedTracks.map(t => t.id);
    if (trackIds.includes(currentTrackId || '')) {
      onTogglePlay();
    } else {
      onPlayTrack(trackIds[0], trackIds);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1c1c1c] to-[#121212] overflow-y-auto pb-28 text-white h-full relative select-none">
      
      {/* 1. HOME TAB */}
      {currentTab === 'home' && (
        <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto">
          {/* Greeting Header */}
          <div>
            <h1 id="home-greeting" className="text-3xl font-extrabold tracking-tight mb-6">
              {greeting}
            </h1>

            {/* Quick Play Grid (2x4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {playlists.map((playlist) => {
                const isCurrentPlayingPlaylist = isPlaying && 
                  playlist.trackIds.includes(currentTrackId || '') && 
                  currentTrackId;

                return (
                  <div
                    key={playlist.id}
                    id={`home-grid-card-${playlist.id}`}
                    onClick={() => onSelectPlaylist(playlist.id)}
                    className="flex items-center bg-white/5 hover:bg-white/10 rounded-md overflow-hidden transition-all duration-300 group cursor-pointer relative pr-12 shadow"
                  >
                    <img
                      src={playlist.coverUrl}
                      alt={playlist.name}
                      className="w-20 h-20 object-cover flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-4 pl-3 flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{playlist.name}</p>
                      <p className="text-xs text-neutral-400 mt-0.5 font-medium truncate">
                        {playlist.trackIds.length} tracks
                      </p>
                    </div>

                    {/* Quick Play Hover Button */}
                    <button
                      id={`home-grid-play-btn-${playlist.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const playlistTracks = allTracks.filter(t => playlist.trackIds.includes(t.id));
                        if (playlistTracks.length > 0) {
                          if (currentTrackId && playlist.trackIds.includes(currentTrackId)) {
                            onTogglePlay();
                          } else {
                            onPlayTrack(playlistTracks[0].id, playlist.trackIds);
                          }
                        }
                      }}
                      className="absolute right-4 w-10 h-10 rounded-full bg-[#1db954] flex items-center justify-center text-black shadow-lg shadow-black/40 scale-0 group-hover:scale-100 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer z-10"
                    >
                      {isCurrentPlayingPlaylist ? (
                        <Pause className="w-5 h-5 fill-black" />
                      ) : (
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Made For You Section (Default Playlists Carousel) */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#1db954]" />
              Made For You
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {playlists.map((playlist) => {
                const isCurrentPlayingPlaylist = isPlaying && 
                  playlist.trackIds.includes(currentTrackId || '');

                return (
                  <div
                    key={playlist.id}
                    id={`home-mix-card-${playlist.id}`}
                    onClick={() => onSelectPlaylist(playlist.id)}
                    className="p-4 bg-[#181818] hover:bg-[#282828] rounded-md flex flex-col gap-3 group cursor-pointer transition-all duration-300 relative shadow-md shadow-black/10"
                  >
                    <div className="relative aspect-square">
                      <img
                        src={playlist.coverUrl}
                        alt={playlist.name}
                        className="w-full h-full object-cover rounded shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                      {/* Floating Play Icon */}
                      <button
                        id={`home-mix-play-${playlist.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (playlist.trackIds.length > 0) {
                            if (currentTrackId && playlist.trackIds.includes(currentTrackId)) {
                              onTogglePlay();
                            } else {
                              onPlayTrack(playlist.trackIds[0], playlist.trackIds);
                            }
                          }
                        }}
                        className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-[#1db954] text-black shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        {isCurrentPlayingPlaylist ? (
                          <Pause className="w-6 h-6 fill-black" />
                        ) : (
                          <Play className="w-6 h-6 fill-black ml-0.5" />
                        )}
                      </button>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-neutral-100 truncate pb-0.5">{playlist.name}</h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {playlist.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Individual Tracks section */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Recommended Radio</h2>
            <div className="bg-[#181818] rounded-lg p-5">
              <div className="flex flex-col gap-1">
                {allTracks.slice(0, 4).map((track, idx) => {
                  const isCurrent = currentTrackId === track.id;
                  const isTrackLiked = likedTrackIds.includes(track.id);

                  return (
                    <div
                      key={track.id}
                      id={`home-recommend-track-${track.id}`}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="w-4 text-center text-gray-500 font-semibold">{idx + 1}</span>
                        <div className="relative w-10 h-10 rounded overflow-hidden shadow-md shrink-0 flex-shrink-0">
                          <img
                            src={track.coverUrl}
                            alt={track.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            id={`home-recommend-play-${track.id}`}
                            onClick={() => onPlayTrack(track.id, allTracks.map(t => t.id))}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                          >
                            {isCurrent && isPlaying ? (
                              <Pause className="w-4 h-4 fill-white" />
                            ) : (
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            )}
                          </button>
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-semibold truncate ${isCurrent ? 'text-[#1db954]' : 'text-neutral-100'}`}>
                            {track.title}
                          </p>
                          <p className="text-xs text-neutral-400 truncate">{track.artist}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <span className="text-xs text-neutral-400 hidden sm:block">{track.album}</span>
                        <button
                          id={`home-recommend-like-${track.id}`}
                          onClick={() => onToggleLike(track.id)}
                          className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Heart className={`w-4 h-4 ${isTrackLiked ? 'fill-[#1db954] text-[#1db954]' : ''}`} />
                        </button>
                        <span className="text-xs text-neutral-400 w-10 text-right">{formatDurationRaw(track.duration)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SEARCH TAB */}
      {currentTab === 'search' && (
        <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto">
          {/* Header Search Box */}
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-4 top-3 text-gray-400" />
            <input
              id="search-input-field"
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-2.5 bg-[#242424] hover:bg-[#2a2a2a] focus:bg-[#242424] rounded-full border-none outline-none text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-white transition-all"
            />
            {searchQuery && (
              <button
                id="search-clear-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3 text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filtering Active state info */}
          {activeCategory && (
            <div id="search-active-cat-pill" className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-1.5 rounded-full text-xs text-[#1db954] font-bold w-fit border border-[#1db954]">
              <span>Genre: {activeCategory}</span>
              <button 
                id="search-active-cat-close"
                onClick={() => setActiveCategory(null)} 
                className="text-white hover:text-red-500 font-extrabold ml-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Results State vs Browse Cards */}
          {searchQuery || activeCategory ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Search Results</h2>
              {searchFilteredTracks.length > 0 ? (
                <div className="bg-[#181818] rounded-md p-4">
                  <div className="flex flex-col">
                    {searchFilteredTracks.map((track, index) => {
                      const isCurrent = currentTrackId === track.id;
                      const isTrackLiked = likedTrackIds.includes(track.id);

                      return (
                        <div
                          key={track.id}
                          id={`search-item-${track.id}`}
                          onDoubleClick={() => onPlayTrack(track.id, searchFilteredTracks.map(t => t.id))}
                          className="flex items-center justify-between p-3 rounded-md hover:bg-neutral-800 transition-all group cursor-pointer"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <span className="w-5 text-center text-gray-500 text-sm">{index + 1}</span>
                            <div className="w-10 h-10 rounded overflow-hidden shadow shrink-0 relative">
                              <img
                                src={track.coverUrl}
                                alt={track.title}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <button
                                id={`search-item-play-${track.id}`}
                                onClick={() => onPlayTrack(track.id, searchFilteredTracks.map(t => t.id))}
                                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                              >
                                {isCurrent && isPlaying ? (
                                  <Pause className="w-4 h-4 fill-white" />
                                ) : (
                                  <Play className="w-4 h-4 fill-white ml-0.5" />
                                )}
                              </button>
                            </div>
                            <div className="min-w-0">
                              <p className={`text-sm font-semibold truncate ${isCurrent ? 'text-[#1db954]' : 'text-neutral-100'}`}>
                                {track.title}
                              </p>
                              <p className="text-xs text-neutral-400 truncate">{track.artist}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <span className="text-xs text-neutral-400 hidden md:block">{track.album}</span>
                            
                            {/* Playlist selector picker dropdown */}
                            <div className="relative group/custom relative">
                              <button
                                id={`search-add-playlist-btn-${track.id}`}
                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:text-[#1db954] hover:bg-white/5 rounded text-neutral-400 transition"
                                title="Add to playlist"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              
                              {/* Overlay Dropdown */}
                              <div className="absolute right-0 top-6 hidden group-hover/custom:block bg-[#282828] border border-neutral-700 rounded shadow-xl py-1 w-48 z-20 text-neutral-300 font-medium text-xs">
                                <div className="px-2.5 py-1 text-[10px] uppercase tracking-wide text-neutral-500 font-bold">Add to Playlist:</div>
                                {playlists.filter(p => p.isCustom).map(p => (
                                  <button
                                    key={p.id}
                                    id={`search-add-to-${p.id}`}
                                    onClick={() => onAddTrackToPlaylist(track.id, p.id)}
                                    className="w-full text-left px-3 py-1.5 hover:bg-neutral-700 hover:text-white flex items-center justify-between"
                                  >
                                    <span className="truncate">{p.name}</span>
                                    {p.trackIds.includes(track.id) && <Check className="w-3.5 h-3.5 text-[#1db954]" />}
                                  </button>
                                ))}
                                {playlists.filter(p => p.isCustom).length === 0 && (
                                  <div className="px-3 py-2 text-gray-500 text-[10px]">No custom playlists yet</div>
                                )}
                              </div>
                            </div>

                            <button
                              id={`search-item-like-${track.id}`}
                              onClick={() => onToggleLike(track.id)}
                              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <Heart className={`w-4 h-4 ${isTrackLiked ? 'fill-[#1db954] text-[#1db954]' : ''}`} />
                            </button>
                            <span className="text-xs text-neutral-400 w-10 text-right">{formatDurationRaw(track.duration)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 bg-[#181818] rounded-md border border-neutral-800">
                  <HelpCircle className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-300 font-semibold mb-1">No songs match "{searchQuery}"</p>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto">Double check spelling or try a different keyword or active genre category.</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-5 tracking-tight flex items-center gap-2">
                <Compass className="w-6 h-6 text-[#1db954]" />
                Browse all categories
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {searchCategories.map((cat, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`h-40 rounded-lg p-4 bg-gradient-to-br ${cat.color} hover:scale-[1.03] active:scale-95 transition-all cursor-pointer relative overflow-hidden shadow-lg group`}
                  >
                    <span id={`category-${cat.name}`} className="font-extrabold text-lg leading-tight tracking-tight block max-w-[80%] break-words">
                      {cat.name}
                    </span>
                    {/* Tiny rotating element behind card */}
                    <div className="absolute right-[-20px] bottom-[-10px] w-20 h-20 bg-black/20 rounded-full scale-110 rotate-[25deg] group-hover:rotate-[35deg] transition-transform duration-300 flex items-center justify-center text-white/5 p-4 uppercase font-black tracking-wider text-xs">
                      {cat.name.slice(0, 3)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. PLAYLISTS DETAIL TAB OR LIKED TAB */}
      {(currentTab === 'playlist' || currentTab === 'liked') && (
        <div className="w-full">
          {/* Header Hero Area with matching gradient accent */}
          <div 
            className="h-72 md:h-80 flex items-end p-8 gap-6 transition-all duration-300 relative"
            style={{ backgroundImage: `linear-gradient(to bottom, ${playlistAccent}70, #121212)` }}
          >
            {/* Cover art block */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded shadow-2xl overflow-hidden shrink-0 group relative">
              {playlistCover ? (
                <img
                  src={playlistCover}
                  alt={playlistTitle}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                  <Music className="w-16 h-16 text-gray-500" />
                </div>
              )}
            </div>

            {/* Info text stack */}
            <div className="flex flex-col gap-1 md:gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#1db954]">
                {displayedPlaylist?.isCustom ? 'Custom Playlist' : 'Playlist'}
              </span>
              <h1 id="playlist-title-label" className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-tight">
                {playlistTitle}
              </h1>
              <p className="text-xs md:text-sm text-gray-300 font-medium leading-relaxed max-w-xl">
                {playlistDesc}
              </p>
              
              <div className="text-xs text-neutral-300 font-semibold flex items-center gap-1.5 mt-1">
                <span className="hover:underline text-white cursor-pointer hover:text-green-400">SpotifyClone</span>
                <span>•</span>
                <span>{displayedTracks.length} {displayedTracks.length === 1 ? 'song' : 'songs'}</span>
                {displayedTracks.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-neutral-400">about {totalDurationMin} min</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Grid Row */}
          <div className="px-8 py-6 bg-transparent flex items-center gap-6">
            {displayedTracks.length > 0 ? (
              <button
                id="playlist-play-all-btn"
                onClick={handlePlayPlaylist}
                className="w-14 h-14 rounded-full bg-[#1db954] flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition duration-200 cursor-pointer"
                title="Play Playlist"
              >
                {isPlaying && displayedTracks.map(t => t.id).includes(currentTrackId || '') ? (
                  <Pause className="w-6 h-6 fill-black text-black" />
                ) : (
                  <Play className="w-6 h-6 fill-black text-black ml-0.5" />
                )}
              </button>
            ) : (
              <div className="text-xs text-gray-500 border border-dashed border-neutral-700 rounded p-2 px-4">
                Add tracks to activate.
              </div>
            )}
          </div>

          {/* Tracks Table */}
          <div className="px-8 pb-10">
            {displayedTracks.length > 0 ? (
              <div className="w-full">
                {/* Table Header */}
                <div className="flex items-center text-xs uppercase text-gray-400 border-b border-white/5 pb-2 px-4 mb-3 font-bold tracking-wider">
                  <span className="w-8 text-center shrink-0">#</span>
                  <span className="flex-1 pl-4">Title</span>
                  <span className="w-1/4 pl-4 hidden md:block">Album / Genre</span>
                  <span className="w-24 text-right shrink-0 pr-4">
                    <Clock className="w-4 h-4 ml-auto" />
                  </span>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col gap-0.5">
                  {displayedTracks.map((track, idx) => {
                    const isTrackCurrent = currentTrackId === track.id;
                    const isTrackLiked = likedTrackIds.includes(track.id);

                    return (
                      <div
                        key={track.id}
                        id={`playlist-row-${track.id}`}
                        onDoubleClick={() => onPlayTrack(track.id, displayedTracks.map(t => t.id))}
                        className={`flex items-center p-3 rounded hover:bg-white/10 group/row cursor-pointer transition-all ${
                          isTrackCurrent ? 'bg-white/5' : ''
                        }`}
                      >
                        {/* Number / Individual Play Trigger */}
                        <div className="w-8 text-center text-gray-400 font-bold shrink-0 text-sm relative">
                          <span className="group-hover/row:opacity-0 block">{idx + 1}</span>
                          <button
                            id={`playlist-btn-play-${track.id}`}
                            onClick={() => onPlayTrack(track.id, displayedTracks.map(t => t.id))}
                            className="absolute inset-0 items-center justify-center hidden group-hover/row:flex text-white cursor-pointer hover:text-[#1db954]"
                          >
                            {isTrackCurrent && isPlaying ? (
                              <Pause className="w-4 h-4 fill-white" />
                            ) : (
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            )}
                          </button>
                        </div>

                        {/* Covered image and Title stack */}
                        <div className="flex-1 flex items-center gap-4 pl-4 min-w-0">
                          <img
                            src={track.coverUrl}
                            alt={track.title}
                            className="w-10 h-10 object-cover rounded shadow"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <p className={`text-sm font-semibold truncate ${isTrackCurrent ? 'text-[#1db954]' : 'text-neutral-100'}`}>
                              {track.title}
                            </p>
                            <p className="text-xs text-neutral-400 group-hover/row:text-white transition-colors truncate">
                              {track.artist}
                            </p>
                          </div>
                        </div>

                        {/* Genre / Album Stack */}
                        <div className="w-1/4 pl-4 text-xs font-semibold text-gray-400 hidden md:block truncate">
                          {track.album}
                        </div>

                        {/* Controls + Duration */}
                        <div className="w-24 flex items-center justify-end shrink-0 gap-3 pr-4">
                          {/* Delete from custom playlist if isCustom */}
                          {displayedPlaylist?.isCustom && (
                            <button
                              id={`playlist-btn-remove-${track.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveTrackFromPlaylist(track.id, displayedPlaylist!.id);
                              }}
                              className="opacity-0 group-hover/row:opacity-100 p-1 text-gray-400 hover:text-red-500 rounded transition"
                              title="Remove from this playlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            id={`playlist-btn-like-${track.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleLike(track.id);
                            }}
                            className="opacity-0 group-hover/row:opacity-100 focus:opacity-100 hover:scale-105 text-gray-400 hover:text-white transition cursor-pointer"
                            title="Like Track"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isTrackLiked ? 'fill-[#1db954] text-[#1db954] opacity-100' : ''}`} />
                          </button>

                          <span className="text-xs text-gray-400 font-medium">
                            {formatDurationRaw(track.duration)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 border border-neutral-800 rounded bg-[#181818]">
                <Music className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-300">Nothing here yet</p>
                <p className="text-xs text-gray-500 mt-1 mb-5">Start by liking tracks or adding them using the controls below.</p>
              </div>
            )}

            {/* Custom Playlist Search and Add Segment (ONLY FOR CUSTOM PLAYLISTS) */}
            {displayedPlaylist?.isCustom && (
              <div className="mt-12 pt-8 border-t border-white/5">
                <h3 className="text-xl font-bold mb-1">Let's find something for your playlist</h3>
                <p className="text-xs text-gray-400 mb-4 font-semibold">Search our entire collection to add tracks to your list.</p>

                {/* Sub search input */}
                <div className="relative w-full max-w-sm mb-4">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    id="playlist-subsearch"
                    type="text"
                    placeholder="Search for tracks..."
                    value={customPlaylistSearch}
                    onChange={(e) => setCustomPlaylistSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-[#2c2c2c] rounded-md text-xs border border-transparent outline-none focus:border-neutral-500 text-white"
                  />
                </div>

                {/* mini filtered track list */}
                <div className="flex flex-col gap-1 max-w-2xl bg-[#141414] rounded-md p-2">
                  {allTracks
                    .filter(t => {
                      if (!customPlaylistSearch) return true;
                      return t.title.toLowerCase().includes(customPlaylistSearch.toLowerCase()) || 
                             t.artist.toLowerCase().includes(customPlaylistSearch.toLowerCase());
                    })
                    // Filter out tracks already in the playlist
                    .filter(t => !displayedPlaylist!.trackIds.includes(t.id))
                    .slice(0, 4)
                    .map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between p-2 rounded hover:bg-neutral-800 text-xs transition"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={track.coverUrl}
                            alt=""
                            className="w-8 h-8 rounded object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-semibold text-white">{track.title}</p>
                            <p className="text-gray-400 text-[10px]">{track.artist}</p>
                          </div>
                        </div>

                        <button
                          id={`playlist-add-btn-${track.id}`}
                          onClick={() => onAddTrackToPlaylist(track.id, displayedPlaylist!.id)}
                          className="flex items-center gap-1 bg-white hover:bg-[#e0e0e0] active:scale-95 text-black font-extrabold text-[10px] px-3 py-1 rounded-full transition cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  {allTracks.filter(t => !displayedPlaylist!.trackIds.includes(t.id)).length === 0 && (
                    <div className="text-center py-4 text-xs text-gray-500 font-semibold">
                      All available songs have been added to this list!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
