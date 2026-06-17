import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_TRACKS, INITIAL_PLAYLISTS } from './data/tracks';
import { Track, Playlist, PlaybackState, RepeatMode } from './types';
import Sidebar from './components/Sidebar';
import PlaybackBar from './components/PlaybackBar';
import PlaylistView from './components/PlaylistView';
import LyricsView from './components/LyricsView';
import RightPanel from './components/RightPanel';

export default function App() {
  // 1. Core Playback State
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => {
    const savedVol = localStorage.getItem('spotify_volume');
    return savedVol !== null ? parseFloat(savedVol) : 0.5;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>('off');

  // 2. Playlists & Tracks Lists
  const [customPlaylists, setCustomPlaylists] = useState<Playlist[]>(() => {
    const savedPlaylists = localStorage.getItem('spotify_custom_playlists');
    if (savedPlaylists) {
      try {
        return JSON.parse(savedPlaylists);
      } catch (e) {
        console.error("Failed to parse custom playlists", e);
      }
    }
    return []; // Start empty
  });

  const [likedTrackIds, setLikedTrackIds] = useState<string[]>(() => {
    const savedLikes = localStorage.getItem('spotify_liked_tracks');
    if (savedLikes) {
      try {
        return JSON.parse(savedLikes);
      } catch (e) {
        console.error("Failed to parse liked tracks", e);
      }
    }
    // Default like first 2 tracks for a lively start
    return ['track-1', 'track-3'];
  });

  // 3. Navigation Controls
  const [currentTab, setCurrentTab] = useState<string>('home'); // home, search, playlist, liked, lyrics
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>('playlist-all');

  // 4. Queue / History State Management
  const [queue, setQueue] = useState<string[]>([]);
  const [currentPlaylistContext, setCurrentPlaylistContext] = useState<string[]>(
    INITIAL_TRACKS.map(t => t.id) // Default playing sequence
  );

  // 5. Visibility drawers
  const [showQueue, setShowQueue] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);

  // 6. Direct Audio HTML Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load all playlists (System Default + User Created Custom Playlists)
  const allPlaylists = [...INITIAL_PLAYLISTS, ...customPlaylists];
  const allTracks = INITIAL_TRACKS;

  // Sync volume with localStorage
  useEffect(() => {
    localStorage.setItem('spotify_volume', volume.toString());
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Sync liked tracks with localStorage
  useEffect(() => {
    localStorage.setItem('spotify_liked_tracks', JSON.stringify(likedTrackIds));
  }, [likedTrackIds]);

  // Sync custom playlists with localStorage
  useEffect(() => {
    localStorage.setItem('spotify_custom_playlists', JSON.stringify(customPlaylists));
  }, [customPlaylists]);

  // 1. Initialise HTML Audio Player on Mount
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = volume;
    audio.muted = isMuted;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleLoadStart = () => {
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('loadstart', handleLoadStart);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('loadstart', handleLoadStart);
    };
  }, []);

  // 2. Synchronize Audio Source, Playback State & Autoplay smoothly
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrackId) {
      const activeTrack = allTracks.find(t => t.id === currentTrackId);
      if (activeTrack) {
        // Only reload if the source URL has changed
        if (!audio.src || !audio.src.includes(activeTrack.url)) {
          audio.src = activeTrack.url;
          audio.load();
        }

        if (isPlaying) {
          // Play returns a promise that we must handle/catch to prevent unhandled abort warnings
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(err => {
              if (err.name === 'AbortError' || err.message?.includes('interrupted') || err.message?.includes('pause')) {
                console.log('Audio playback target shifted or paused safely.');
              } else {
                console.warn('Playback block or security gesture:', err);
              }
            });
          }
        } else {
          audio.pause();
        }
      }
    } else {
      audio.pause();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [currentTrackId, isPlaying]);

  // 3. Keep Audio 'ended' listener synchronized with current queues & playlist contexts (Avoid closures issue)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleAudioEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        handleNext();
      }
    };

    audio.addEventListener('ended', handleAudioEnded);
    return () => {
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [repeat, currentTrackId, queue, shuffle, currentPlaylistContext]);

  // Handle play/pause action changes
  const handleTogglePlay = () => {
    if (!currentTrackId && allTracks.length > 0) {
      // Default to playing the first song of all tracks
      setCurrentTrackId(allTracks[0].id);
      setIsPlaying(true);
      return;
    }
    setIsPlaying(prev => !prev);
  };

  // Skip backwards
  const handlePrev = () => {
    if (!audioRef.current || !currentTrackId) return;

    // If current time is past 3 seconds, restart current track
    if (currentTime > 3) {
      handleSeek(0);
      return;
    }

    // Find current index in track list context
    const index = currentPlaylistContext.indexOf(currentTrackId);
    if (index > 0) {
      setCurrentTrackId(currentPlaylistContext[index - 1]);
    } else if (repeat === 'all' && currentPlaylistContext.length > 0) {
      // wrap around to the end
      setCurrentTrackId(currentPlaylistContext[currentPlaylistContext.length - 1]);
    } else {
      handleSeek(0);
    }
  };

  // Skip forwards
  const handleNext = () => {
    if (!currentTrackId) return;

    // Check if queue has next items
    if (queue.length > 0) {
      const nextQueueId = queue[0];
      setQueue(prev => prev.slice(1));
      setCurrentTrackId(nextQueueId);
      setIsPlaying(true);
      return;
    }

    // Shuffle playback handles random picking
    if (shuffle && currentPlaylistContext.length > 1) {
      const filtered = currentPlaylistContext.filter(id => id !== currentTrackId);
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setCurrentTrackId(filtered[randomIndex]);
      setIsPlaying(true);
      return;
    }

    // Traditional linear playback skip
    const index = currentPlaylistContext.indexOf(currentTrackId);
    if (index >= 0 && index < currentPlaylistContext.length - 1) {
      setCurrentTrackId(currentPlaylistContext[index + 1]);
      setIsPlaying(true);
    } else if (repeat === 'all' && currentPlaylistContext.length > 0) {
      // Wrap around to start
      setCurrentTrackId(currentPlaylistContext[0]);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  // Music ending automations
  const handleSongEnded = () => {
    if (repeat === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Replay failed", e));
      }
    } else {
      handleNext();
    }
  };

  // User interactive scrub seek progress bar
  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // volume muting controls
  const handleToggleMute = () => {
    if (audioRef.current) {
      const mutedState = !isMuted;
      audioRef.current.muted = mutedState;
      setIsMuted(mutedState);
    }
  };

  // Like / Heart Track Toggle
  const handleToggleLike = (trackId: string) => {
    if (likedTrackIds.includes(trackId)) {
      setLikedTrackIds(prev => prev.filter(id => id !== trackId));
    } else {
      setLikedTrackIds(prev => [...prev, trackId]);
    }
  };

  // Creates custom empty playlist
  const handleCreatePlaylist = () => {
    const listName = prompt("Enter a name for your custom playlist:");
    if (!listName || listName.trim() === '') return;

    const newPlaylist: Playlist = {
      id: `playlist-custom-${Date.now()}`,
      name: listName.trim(),
      description: `A customized user curation matching your specific morning lofi blends.`,
      coverUrl: 'https://picsum.photos/seed/' + Math.random().toString() + '/300/300',
      trackIds: [],
      isCustom: true,
      accentColor: '#10b981' // Sea ocean green
    };

    setCustomPlaylists(prev => [...prev, newPlaylist]);
    setSelectedPlaylistId(newPlaylist.id);
    setCurrentTab('playlist');
  };

  // Delete custom playlist
  const handleDeletePlaylist = (playlistId: string) => {
    if (!confirm("Are you sure you want to delete this custom playlist?")) return;
    setCustomPlaylists(prev => prev.filter(p => p.id !== playlistId));
    if (selectedPlaylistId === playlistId) {
      setSelectedPlaylistId('playlist-all');
      setCurrentTab('home');
    }
  };

  // Add tracks to custom lists
  const handleAddTrackToPlaylist = (trackId: string, playlistId: string) => {
    setCustomPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        // Prevent adding duplicate tracks
        if (p.trackIds.includes(trackId)) return p;
        return { ...p, trackIds: [...p.trackIds, trackId] };
      }
      return p;
    }));
  };

  // Remove track from custom list
  const handleRemoveTrackFromPlaylist = (trackId: string, playlistId: string) => {
    setCustomPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        return { ...p, trackIds: p.trackIds.filter(id => id !== trackId) };
      }
      return p;
    }));
  };

  // Trigger song selection with tracks list queue context
  const handlePlayTrack = (trackId: string, tracklistIds: string[]) => {
    setCurrentPlaylistContext(tracklistIds);
    setCurrentTrackId(trackId);
    setIsPlaying(true);

    // Setup queue sequence for upcoming tracks
    const currentIndex = tracklistIds.indexOf(trackId);
    if (currentIndex >= 0) {
      const upcoming = tracklistIds.slice(currentIndex + 1);
      setQueue(upcoming);
    }
  };

  // Clear upcoming list
  const handleClearQueue = () => {
    setQueue([]);
  };

  // Toggle active tab selections directly
  const handleSelectPlaylist = (id: string) => {
    setSelectedPlaylistId(id);
    setCurrentTab('playlist');
    if (showLyrics) setShowLyrics(false);
  };

  const currentTrack = allTracks.find(t => t.id === currentTrackId) || null;
  const isCurrentTrackLiked = likedTrackIds.includes(currentTrackId || '');

  // Queue tracks mapped objects
  const queueTrackObjects = queue
    .map(id => allTracks.find(t => t.id === id))
    .filter((t): t is Track => !!t);

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans antialiased overflow-hidden">
      
      {/* Top Application Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Side Panel */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            if (tab === 'lyrics') setShowLyrics(true);
            else setShowLyrics(false);
          }}
          playlists={allPlaylists}
          selectedPlaylistId={selectedPlaylistId}
          onSelectPlaylist={handleSelectPlaylist}
          onCreatePlaylist={handleCreatePlaylist}
          onDeletePlaylist={handleDeletePlaylist}
          likedCount={likedTrackIds.length}
        />

        {/* Central Display Canvas */}
        <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
          {showLyrics ? (
            <LyricsView
              currentTrack={currentTrack}
              currentTime={currentTime}
              isPlaying={isPlaying}
              onSeek={handleSeek}
            />
          ) : (
            <PlaylistView
              currentTab={currentTab}
              playlists={allPlaylists}
              selectedPlaylistId={selectedPlaylistId}
              allTracks={allTracks}
              onSelectPlaylist={handleSelectPlaylist}
              likedTrackIds={likedTrackIds}
              onToggleLike={handleToggleLike}
              currentTrackId={currentTrackId}
              isPlaying={isPlaying}
              onPlayTrack={handlePlayTrack}
              onTogglePlay={handleTogglePlay}
              onAddTrackToPlaylist={handleAddTrackToPlaylist}
              onRemoveTrackFromPlaylist={handleRemoveTrackFromPlaylist}
            />
          )}
        </main>

        {/* Right Info Drawer (Toggleable) */}
        {showRightPanel && (
          <RightPanel
            currentTrack={currentTrack}
            queue={queueTrackObjects}
            onClearQueue={handleClearQueue}
            onPlayTrack={(trackId, tracklist) => handlePlayTrack(trackId, tracklist)}
          />
        )}
      </div>

      {/* Playback Controls (Bottom Footer) */}
      <PlaybackBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        shuffle={shuffle}
        repeat={repeat}
        isLiked={isCurrentTrackLiked}
        onTogglePlay={handleTogglePlay}
        onPrev={handlePrev}
        onNext={handleNext}
        onSeek={handleSeek}
        onVolumeChange={(val) => setVolume(val)}
        onToggleMute={handleToggleMute}
        onToggleShuffle={() => setShuffle(!shuffle)}
        onToggleRepeat={() => {
          setRepeat(prev => {
            if (prev === 'off') return 'all';
            if (prev === 'all') return 'one';
            return 'off';
          });
        }}
        onToggleLike={() => currentTrackId && handleToggleLike(currentTrackId)}
        showQueue={showQueue}
        setShowQueue={(show) => {
          setShowQueue(show);
          if (show) {
            setShowRightPanel(true);
          }
        }}
        showLyrics={showLyrics}
        setShowLyrics={(show) => {
          setShowLyrics(show);
          if (show) {
            setCurrentTab('lyrics');
          } else {
            setCurrentTab('home');
          }
        }}
        showRightPanel={showRightPanel}
        setShowRightPanel={setShowRightPanel}
      />
    </div>
  );
}
