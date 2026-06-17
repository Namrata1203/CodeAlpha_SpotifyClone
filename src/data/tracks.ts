import { Track, Playlist } from '../types';

export const INITIAL_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'Neon Horizon',
    artist: 'Synthwave Dreamers',
    album: 'Electric Highways',
    duration: 372, // 6:12
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverUrl: 'https://picsum.photos/seed/horizon3/300/300',
    accentColor: '#cf0a7c', // Hot pink Synthwave vibe
    genre: 'Synthwave',
    bio: 'Synthwave Dreamers is a duo hailing from Neo-Tokyo and Berlin. Combining 80s analog synthesizer grit with modern punchy compression, they create cinematic highway soundtracks for dark retro-futuristic evenings.',
    artistCoverUrl: 'https://picsum.photos/seed/synthwavebio/400/400',
    lyrics: [
      '♫ (Electric driving beat begins) ♫',
      'The neon lights are shining bright on the pavement',
      'Driving fast through the midnight canyon',
      'Analog waves wash over my head',
      'The digital skyline is calling our name',
      '♫ (Driving lead synth melody swells) ♫',
      'Can you feel the electric grid below us?',
      'No speed limits, just you and the frequency',
      'Leaving the old world far in the past',
      'We are the children of the cathode ray',
      '♫ (Heavy custom arpeggiator solo) ♫',
      'Into the horizon, we fuse with the dark',
      'Where the grid meets the ocean',
      'Endless electronic dreams',
      '♫ (Warm analog pad synth fades out) ♫'
    ],
    lyricsTimeline: [0, 15, 30, 48, 65, 80, 110, 132, 150, 172, 200, 245, 275, 310, 340]
  },
  {
    id: 'track-2',
    title: 'Solar Winds',
    artist: 'Astro Kid',
    album: 'Deep Space Odyssey',
    duration: 423, // 7:03
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverUrl: 'https://picsum.photos/seed/solarspace/300/300',
    accentColor: '#1d8cf8', // Cosmic Blue
    genre: 'Ambient Cosmic',
    bio: 'Astro Kid (aka Luke Vance) is a former aerospace engineer turned electronic music producer. His tracks use field recordings from vintage telemetry gear to craft deeply atmospheric spacemusic designs.',
    artistCoverUrl: 'https://picsum.photos/seed/astrobio/400/400',
    lyrics: [
      '♫ (Deep sub-space rumble and telemetry signals) ♫',
      'Sailing through cosmic dust and solar flares',
      'Locked in orbit, looking back at Earth',
      'A fragile blue dot floating in the black',
      'Drifting silent in the solar stream',
      '♫ (Atmospheric ambient pad pads down) ♫',
      'Weightless state of quiet contemplation',
      'No sound in the vacuum of space',
      'Only the stars singing their slow light',
      'We are but dust looking back at the sun',
      '♫ (Resonant synth filter sweeps up) ♫',
      'Voyager signals echo across eternity',
      'An endless journey through the voids',
      'Reaching out to find another life',
      '♫ (Quiet white noise static and fade out) ♫'
    ],
    lyricsTimeline: [0, 20, 45, 70, 95, 120, 155, 190, 220, 250, 290, 330, 365, 390, 410]
  },
  {
    id: 'track-3',
    title: 'Midnight Study',
    artist: 'Lofi Chill Beats',
    album: 'Focus Sessions Vol. 1',
    duration: 302, // 5:02
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverUrl: 'https://picsum.photos/seed/studyroom/300/300',
    accentColor: '#e0a96d', // Cozy yellow-gold lofi room color
    genre: 'Lofi Hip-Hop',
    bio: 'Lofi Chill Beats compiles late-night bedroom productions designed strictly for coding, study, and insomnia. Featuring dusty vinyl snaps and smooth jazz chords, this project is your best friend when the clock strikes 2 AM.',
    artistCoverUrl: 'https://picsum.photos/seed/lofibio/400/400',
    lyrics: [
      '♫ (Soft vinyl crackle and record needle drop) ♫',
      'Raindrops tapping on the windowpane',
      'Staring at the lines of glowing code',
      'A warm cup of coffee cooling down',
      'Quiet beats setting the steady pace',
      '♫ (Slow, jazzy fender-rhodes piano chime) ♫',
      'No rush, just step-by-step progress',
      'Letting the tension leave your shoulders',
      'The world is asleep, but we are creating',
      'Steady thoughts, calm mind',
      '♫ (Lazy saxophone refrain plays) ♫',
      'Breathe in the calm night air',
      'Every small line brings us closer',
      'Lost in the cozy warmth of lo-fi loops',
      '♫ (Fading out with vinyl dust and click) ♫'
    ],
    lyricsTimeline: [0, 10, 28, 45, 62, 80, 110, 130, 150, 180, 200, 230, 255, 280, 295]
  },
  {
    id: 'track-4',
    title: 'Summer Breeze',
    artist: 'Golden Hour Trio',
    album: 'Coastal Vibes',
    duration: 302, // 5:02
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    coverUrl: 'https://picsum.photos/seed/summersandy/300/300',
    accentColor: '#10b981', // Emerald sea green
    genre: 'Chilled House / Jazz',
    bio: 'The Golden Hour Trio combines clean acoustic electric guitar riffs, deep electronic basslines, and organic percussion. They perform on seaside stages, bringing relaxed beach sunset vibes into the digital realm.',
    artistCoverUrl: 'https://picsum.photos/seed/goldbio/400/400',
    lyrics: [
      '♫ (Acoustic guitar strums and waves crashing) ♫',
      'Sun setting low over the coastal highway',
      'Salty air rustling the palm tree leaves',
      'Warm sand still stuck under our feet',
      'Driving slow with the windows rolled down',
      '♫ (Upbeat hand drums and guitar groove enters) ♫',
      'Let the summer breeze carry all your worries away',
      'No plans, no schedules, just the tide that turns',
      'Gazing into the golden-orange reflections of the sea',
      'We are living for these golden summer cycles',
      '♫ (Bright melodic guitar solos and beach laughing) ♫',
      'Laughing in the dimming twilight',
      'Holding onto the fleeting seasonal heat',
      'These memories stay forever etched in sand',
      '♫ (Slow ocean waves crash and guitar notes echo) ♫'
    ],
    lyricsTimeline: [0, 12, 30, 48, 64, 80, 105, 125, 145, 175, 200, 235, 260, 280, 296]
  },
  {
    id: 'track-5',
    title: 'Rainy Afternoon',
    artist: 'Acoustic Cafe',
    album: 'Warm Coffee Shop Sessions',
    duration: 363, // 6:03
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    coverUrl: 'https://picsum.photos/seed/rainycoffee/300/300',
    accentColor: '#c084fc', // Cozy Lavender-purple
    genre: 'Acoustic Folk',
    bio: 'Acoustic Cafe is an indie collection recorded live in a small timber cabin in Oregon. Equipped with only a nylon guitar, a double bass, and a gentle cellist, they deliver direct, intimate acoustic music.',
    artistCoverUrl: 'https://picsum.photos/seed/cafebio/400/400',
    lyrics: [
      '♫ (Pitter-patter of rain and acoustic notes) ♫',
      'The clock strikes three in the dusty bookshop',
      'Sheltered from the grey city rainstorms',
      'Sipping cardamom tea of an autumn noon',
      'Reading old letters from forgotten friends',
      '♫ (Double bass and cello joins in unison) ♫',
      'Slow down and embrace the grey overcast sky',
      'There is poetry in the gloomy mist',
      'Muted streets, quiet alleys, slow steps',
      'A warm wooden fire crackling nearby',
      '♫ (Stripped down cello solo) ♫',
      'Let the grey rain paint the afternoon',
      'We are warm and cozy inside our little frame',
      'Sharing stories, keeping the chill outside',
      '♫ (Acoustic guitar soft ring, rain tap fades) ♫'
    ],
    lyricsTimeline: [0, 15, 35, 55, 75, 95, 125, 155, 185, 215, 245, 280, 310, 335, 355]
  },
  {
    id: 'track-6',
    title: 'Cyberpunk Alley',
    artist: 'Tokyo Overdrive',
    album: 'Neo-Shibuya Beats',
    duration: 318, // 5:18
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    coverUrl: 'https://picsum.photos/seed/cybercyber/300/300',
    accentColor: '#f59e0b', // Glowing neon amber
    genre: 'Cyberpunk Synth',
    bio: 'Tokyo Overdrive is a hyperactive producer collective making fast-paced synth music inspired by retro sci-fi video games, high-speed rail networks, and underground arcade clubs.',
    artistCoverUrl: 'https://picsum.photos/seed/tokyobio/400/400',
    lyrics: [
      '♫ (Fast cyberpunk hyper-drive baseline) ♫',
      'Drenched in the glare of holographic shopfronts',
      'Walking past the dark alleyways of the neon grid',
      'Cybernetic augmentations firing on all cylinders',
      'The speed of light is our slow lane',
      '♫ (Laser-like high-frequency synths blast) ♫',
      'Connected to the universal network database',
      'Downloading data codes directly into our minds',
      'No boundaries between organic and synthetic anymore',
      'Running from the security patrol drones',
      '♫ (Heavy electronic industrial drum solo) ♫',
      'Climbing over the metallic skyscrapers of the dark future',
      'Watching the flying cars drift under neon clouds',
      'We are the cybernetic rebels of the lower level',
      '♫ (Bass drop and heavy glitch-fuzz out) ♫'
    ],
    lyricsTimeline: [0, 11, 28, 44, 60, 75, 102, 120, 140, 160, 185, 222, 250, 285, 305]
  },
  {
    id: 'track-7',
    title: 'Kesariya (Acoustic Lofi)',
    artist: 'Arijit Singh Remix',
    album: 'Bollywood Lofi Sessions',
    duration: 342, // 5:42
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    coverUrl: 'https://picsum.photos/seed/kesariyasaffron/300/300',
    accentColor: '#f97316', // Warm saffron orange
    genre: 'Indian Lofi',
    bio: 'A delicate collection of late-night cozy Indian acoustics, blending traditional Indian flutes (Bansuri) with classic warm vinyl cracks and soulful Bollywood vocals.',
    artistCoverUrl: 'https://picsum.photos/seed/arijitbio/400/400',
    lyrics: [
      '♫ (Mellow acoustic guitar and background flute begins) ♫',
      'Mujhko itna bata de koi...',
      'Kaise tujhse dil na lagaye koi...',
      'Rabba ne tujhko banane mein...',
      'Kardi hai husn ki khaali tijoriyan...',
      '♫ (Soft electronic chill beats drop into a beautiful rhythm) ♫',
      'Kajre ki sihaai se likhi hai tune...',
      'Jaane kitno ki love storiyan...',
      'Kesariya tera ishq hai piya...',
      'Rang jaaun jo main haath lagaun...',
      '♫ (Soulful bamboo flute arpeggio fills the air) ♫',
      'Din beete saara teri fuzoon mein...',
      'Rain saari teri khair manaun...',
      'Kesariya tera ishq hai piya...',
      '♫ (Fading out with a warm Indian string notes) ♫'
    ],
    lyricsTimeline: [0, 10, 25, 42, 60, 78, 96, 115, 134, 155, 185, 215, 245, 275, 310]
  },
  {
    id: 'track-8',
    title: 'Tum Hi Ho (Cozy Strings)',
    artist: 'Mithoon & Cello Ens.',
    album: 'Midnight Melodies',
    duration: 362, // 6:02
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    coverUrl: 'https://picsum.photos/seed/tumhihopicture/300/300',
    accentColor: '#ec4899', // Romantic pink-rose
    genre: 'Indian Acoustic',
    bio: 'An emotional instrumental and vocal fusion highlighting rich cello textures, nylon-string acoustic guitars, and legendary romantic verses.',
    artistCoverUrl: 'https://picsum.photos/seed/mithoonbio/400/400',
    lyrics: [
      '♫ (Gentle piano keys and sustained cello pad) ♫',
      'Hum tere bin ab reh nahi sakte...',
      'Tere bina kya wajood mera...',
      'Tujhse juda agar ho jayenge...',
      'Toh khud se hi ho jayenge juda...',
      '♫ (Acoustic rhythm pattern kicks in softly) ♫',
      'Kyunki tum hi ho, ab tum hi ho...',
      'Zindagi ab tum hi ho...',
      'Chain bhi, mera dard bhi...',
      'Meri aashiqui ab tum hi ho...',
      '♫ (Warm violin duet peaks with harmony) ♫',
      'Tera mera rishta hai kaisa...',
      'Ek pal door gawara nahi...',
      'Har janam mein tujhko hi paana...',
      '♫ (Beautiful soft decay of live cello and keys) ♫'
    ],
    lyricsTimeline: [0, 15, 30, 48, 65, 82, 100, 120, 138, 160, 190, 220, 250, 280, 315]
  },
  {
    id: 'track-9',
    title: 'Chaiyya Chaiyya (Sufi Bass)',
    artist: 'A.R. Rahman Live Mix',
    album: 'Sufi Soul Beats',
    duration: 302, // 5:02
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    coverUrl: 'https://picsum.photos/seed/chaiyyah/300/300',
    accentColor: '#eab308', // Radiant sun yellow
    genre: 'Indian Sufi',
    bio: 'Inspired by the energetic train-top anthem of the late 90s, this version marries robust Punjabi Dhol beats, energetic sub-bass, and authentic Sufi philosophy.',
    artistCoverUrl: 'https://picsum.photos/seed/arrahmanbio/400/400',
    lyrics: [
      '♫ (Dashing hand drums and traditional clapping) ♫',
      'Jinke sar ho ishq ki chhaanv...',
      'Paanv ke neeche jannat hogi...',
      'Shaam raat gungunaaye na...',
      'Chal chaiyya chaiyya chaiyya chaiyya...',
      '♫ (High energy electronic synth-bass drop) ♫',
      'Chal chaiyya chaiyya chaiyya chaiyya...',
      'Saare ishq ki chhaon chal chaiyya...',
      'Chal chaiyya chaiyya...',
      'Kone kone mein khushboo hai gulab ki...',
      '♫ (Dazzling synthesizer hook melody) ♫',
      'Voh yaar hai jo khushboo ki tarah...',
      'Jiski baatein misri ki daliyaan...',
      'Chaiyya chaiyya chaiyya chal...',
      '♫ (Drums slowly dim to a peaceful clap) ♫'
    ],
    lyricsTimeline: [0, 12, 28, 44, 58, 75, 92, 110, 130, 150, 180, 210, 235, 260, 285]
  },
  {
    id: 'track-10',
    title: 'Kabira (Soulful Sunset)',
    artist: 'Tochi Raina Lounge',
    album: 'Soulful Whispers',
    duration: 345, // 5:45
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    coverUrl: 'https://picsum.photos/seed/kabirapic/300/300',
    accentColor: '#b91c1c', // Royal Ruby Red
    genre: 'Indian Folk',
    bio: 'A beautiful campfire rendition of the emotional song of departure and reunion, combining acoustic guitars, rustic hand percussions, and pristine vocal delays.',
    artistCoverUrl: 'https://picsum.photos/seed/kabirabio/400/400',
    lyrics: [
      '♫ (Acoustic guitar pick and gentle shaker rhythm) ♫',
      'Kaisi teri khudgarzi...',
      'Na dhoop chune na chhaanv...',
      'Ban gaya banjaara...',
      'Kuda se manga tera naam...',
      '♫ (Beautiful rich bassline lands with a snap) ♫',
      'Re Kabira maan jaa...',
      'Aaja tujhko pukarein teri parchhaiyan...',
      'Re Kabira maan jaa...',
      'Kaisi teri khudgarzi...',
      '♫ (Warm harmonium melody rolls softly in the back) ♫',
      'Sajid-bajid ke log aaye hai...',
      'Lejaane ko tera saaya...',
      'Kabira dhoondhe apna rasta...',
      '♫ (Soothing strings fade out into cricket sounds) ♫'
    ],
    lyricsTimeline: [0, 15, 30, 48, 66, 85, 105, 125, 145, 168, 195, 225, 255, 285, 315]
  }
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-all',
    name: 'All Tracks',
    description: 'All default music tracks in a single heavy-rotation mix.',
    coverUrl: 'https://picsum.photos/seed/allmix/300/300',
    trackIds: ['track-1', 'track-2', 'track-3', 'track-4', 'track-5', 'track-6', 'track-7', 'track-8', 'track-9', 'track-10'],
    accentColor: '#1db954' // Spotify Green
  },
  {
    id: 'playlist-chill',
    name: 'Chill Lofi & Cozy Beats',
    description: 'Perfect background tunes for writing React code, late-night study sessions, or relaxed afternoons.',
    coverUrl: 'https://picsum.photos/seed/chilllofi/300/300',
    trackIds: ['track-3', 'track-5', 'track-7'],
    accentColor: '#e0a96d' // Warm Cozy Orange/Gold
  },
  {
    id: 'playlist-neon',
    name: 'Synthwave & Cyberpunk Drive',
    description: 'Energetic, driving synthesizers for high-speed highway cruising and cyberpunk nights.',
    coverUrl: 'https://picsum.photos/seed/neonsynth/300/300',
    trackIds: ['track-1', 'track-6', 'track-2'],
    accentColor: '#cf0a7c' // Hot Pink
  },
  {
    id: 'playlist-coastal',
    name: 'Coastline Summer Chill',
    description: 'Relaxed acoustic strums, positive grooves, and ocean breeze vibes.',
    coverUrl: 'https://picsum.photos/seed/coastline/300/300',
    trackIds: ['track-4', 'track-5', 'track-8'],
    accentColor: '#10b981' // Emerald Sea Green
  },
  {
    id: 'playlist-indian',
    name: 'Bollywood & Indian Sessions',
    description: 'Beautiful, emotional, and soulful Indian lofi, acoustic folk, and Sufi songs synchronized beautifully.',
    coverUrl: 'https://picsum.photos/seed/desimusic/300/300',
    trackIds: ['track-7', 'track-8', 'track-9', 'track-10'],
    accentColor: '#f97316' // Saffron Warm Orange
  }
];
