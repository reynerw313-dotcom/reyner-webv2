// ============================================================
// PLAYLIST DATA – SINGLE SOURCE OF TRUTH
// Setiap track memiliki ID unik, title, artist, cover, dan audio URL.
// ============================================================

// ------ LOCAL TRACKS ------
const LOCAL_TRACKS = [
    { id: 'local-01', type: 'local', name: 'Shape of You',              artist: 'Ed Sheeran',              url: 'https://archive.org/download/fave2/Ed%20Sheeran%20-%20Shape%20of%20You.mp3',  img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop', duration: '3:53', durationSeconds: 233 },
    { id: 'local-02', type: 'local', name: 'Perfect',                   artist: 'Ed Sheeran',              url: 'https://archive.org/download/fave2/Ed%20Sheeran%20-%20Perfect.mp3',  img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop', duration: '4:23', durationSeconds: 263 },
    { id: 'local-03', type: 'local', name: 'Sugar',                     artist: 'Maroon 5',                url: 'https://archive.org/download/fave2/Maroon%205%20-%20Sugar.mp3',  img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=150&h=150&fit=crop', duration: '3:55', durationSeconds: 235 },
    { id: 'local-04', type: 'local', name: 'Blank Space',               artist: 'Taylor Swift',            url: 'https://archive.org/download/fave2/Taylor%20Swift%20-%20Blank%20Space.mp3',  img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop', duration: '3:51', durationSeconds: 231 },
    { id: 'local-05', type: 'local', name: 'Starboy',                   artist: 'The Weeknd',              url: 'https://archive.org/download/fave2/The%20Weeknd%20-%20Starboy.mp3',  img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop', duration: '3:50', durationSeconds: 230 },
    { id: 'local-06', type: 'local', name: 'I Like Me Better',          artist: 'Lauv',                    url: 'https://archive.org/download/fave2/Lauv%20-%20I%20Like%20Me%20Better.mp3',  img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=150&h=150&fit=crop', duration: '3:17', durationSeconds: 197 },
    { id: 'local-07', type: 'local', name: 'Attention',                 artist: 'Charlie Puth',            url: 'https://archive.org/download/fave2/Charlie%20Puth%20-%20Attention.mp3',  img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=150&h=150&fit=crop', duration: '3:28', durationSeconds: 208 },
    { id: 'local-08', type: 'local', name: 'Stay',                      artist: 'Zedd & Alessia Cara',     url: 'https://archive.org/download/fave2/Zedd%20Alessia%20Cara%20-%20Stay.mp3',  img: 'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=150&h=150&fit=crop', duration: '3:30', durationSeconds: 210 },
    { id: 'local-09', type: 'local', name: 'Royals',                    artist: 'Lorde',                   url: 'https://archive.org/download/fave2/Lorde%20-%20Royals.mp3',  img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=150&h=150&fit=crop', duration: '3:10', durationSeconds: 190 },
    { id: 'local-10', type: 'local', name: 'Stitches',                  artist: 'Shawn Mendes',            url: 'https://archive.org/download/fave2/Shawn%20Mendes%20-%20Stitches.mp3', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&h=150&fit=crop', duration: '3:26', durationSeconds: 206 },
    { id: 'local-11', type: 'local', name: 'Let Me Love You',           artist: 'DJ Snake & Justin Bieber',url: 'https://archive.org/download/fave2/DJ%20Snake%20ft.%20Justin%20Bieber%20-%20Let%20Me%20Love%20You.mp3', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=150&h=150&fit=crop', duration: '3:25', durationSeconds: 205 },
    { id: 'local-12', type: 'local', name: 'New Rules',                 artist: 'Dua Lipa',                url: 'https://archive.org/download/fave2/Dua%20Lipa%20-%20New%20Rules.mp3', img: 'https://images.unsplash.com/photo-1482440308425-276ad0f28b19?w=150&h=150&fit=crop', duration: '3:29', durationSeconds: 209 },
    { id: 'local-13', type: 'local', name: "God's Plan",                artist: 'Drake',                   url: 'https://archive.org/download/fave2/Drake-GodsPlan.mp3', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop', duration: '3:18', durationSeconds: 198 },
    { id: 'local-14', type: 'local', name: 'Dilemma',                   artist: 'Nelly ft. Kelly Rowland', url: 'https://archive.org/download/fave2/Nelly%20ft%20Kelly%20Rowland%20-%20Dilemma.mp3', img: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=150&h=150&fit=crop', duration: '4:49', durationSeconds: 289 },
    { id: 'local-15', type: 'local', name: 'Rockstar',                  artist: 'Post Malone ft. 21 Savage',url: 'https://archive.org/download/fave2/PostMaloneFt.21Savage-Rockstar.mp3',img: 'https://images.unsplash.com/photo-1525683879097-c8172944b207?w=150&h=150&fit=crop', duration: '3:38', durationSeconds: 218 },
    { id: 'local-16', type: 'local', name: 'Symphony',                  artist: 'Clean Bandit ft. Zara Larsson',url: 'https://archive.org/download/fave2/Clean%20Bandit%20feat.%20Zara%20Larsson%20-%20Symphony.mp3',img: 'https://images.unsplash.com/photo-1452421820064-e70a9ef8a66b?w=150&h=150&fit=crop', duration: '4:05', durationSeconds: 245 },
    { id: 'local-17', type: 'local', name: 'Hotline Bling',             artist: 'Drake',                   url: 'https://archive.org/download/fave2/Drake%20-%20Hotline%20Bling.mp3',  img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=150&h=150&fit=crop', duration: '4:27', durationSeconds: 267 },
    { id: 'local-18', type: 'local', name: 'Counting Stars',            artist: 'OneRepublic',             url: 'https://archive.org/download/fave2/OneRepublic%20-%20Counting%20Stars.mp3',  img: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=150&h=150&fit=crop', duration: '4:17', durationSeconds: 257 },
    { id: 'local-19', type: 'local', name: 'Cheap Thrills',             artist: 'Sia',                     url: 'https://archive.org/download/fave2/Sia%20-%20Cheap%20Thrills.mp3',  img: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=150&h=150&fit=crop', duration: '3:44', durationSeconds: 224 },
    { id: 'local-20', type: 'local', name: 'Dive',                      artist: 'Ed Sheeran',              url: 'https://archive.org/download/fave2/Ed%20Sheeran%20-%20Dive.mp3',  img: 'https://images.unsplash.com/photo-1484755560695-a4c740285a1b?w=150&h=150&fit=crop', duration: '3:58', durationSeconds: 238 },
    { id: 'local-21', type: 'local', name: 'Galway Girl',               artist: 'Ed Sheeran',              url: 'https://archive.org/download/fave2/Ed%20Sheeran%20-%20Galway%20Girl.mp3',  img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop', duration: '2:50', durationSeconds: 170 },
    { id: 'local-22', type: 'local', name: 'I Feel It Coming',          artist: 'The Weeknd',              url: 'https://archive.org/download/fave2/The%20Weeknd%20%20-%20I%20feel%20it%20coming.mp3',  img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=150&h=150&fit=crop', duration: '4:29', durationSeconds: 269 },
    { id: 'local-23', type: 'local', name: '24K Magic',                 artist: 'Bruno Mars',              url: 'https://archive.org/download/fave2/Bruno%20Mars%20-%2024K%20Magic.mp3',  img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=150&h=150&fit=crop', duration: '3:46', durationSeconds: 226 },
    { id: 'local-24', type: 'local', name: "That's What I Like",        artist: 'Bruno Mars',              url: 'https://archive.org/download/fave2/Bruno%20Mars%20-%20That%E2%80%99s%20What%20I%20Like.mp3',  img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop', duration: '3:26', durationSeconds: 206 },
    { id: 'local-25', type: 'local', name: 'Feels',                     artist: 'Calvin Harris ft. Katy Perry',url: 'https://archive.org/download/fave2/Calvin%20Harris%20-%20Feels%20ft.%20Pharrell%20Williams%20Katy%20P%20-%20Feels.mp3',img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&h=150&fit=crop', duration: '3:43', durationSeconds: 223 },
    { id: 'local-26', type: 'local', name: 'Rollin',                    artist: 'Calvin Harris',           url: 'https://archive.org/download/fave2/Calvin%20Harris%20-%20Rollin.mp3', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=150&h=150&fit=crop', duration: '4:30', durationSeconds: 270 },
    { id: 'local-27', type: 'local', name: 'Slide',                     artist: 'Calvin Harris',           url: 'https://archive.org/download/fave2/Calvin%20Harris%20-%20Slide.mp3', img: 'https://images.unsplash.com/photo-1482440308425-276ad0f28b19?w=150&h=150&fit=crop', duration: '3:50', durationSeconds: 230 },
    { id: 'local-28', type: 'local', name: 'This Is What You Came For', artist: 'Calvin Harris ft. Rihanna',url: 'https://archive.org/download/fave2/Calvin%20Harris%20ft.%20Rihanna%20-%20This%20is%20what%20you%20came%20for%20%281%29.mp3',img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop', duration: '3:52', durationSeconds: 232 },
    { id: 'local-29', type: 'local', name: 'Fresh Eyes',                artist: 'Andy Grammer',            url: 'https://archive.org/download/fave2/Andy%20Grammer%20-%20Fresh%20Eyes.mp3', img: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=150&h=150&fit=crop', duration: '3:18', durationSeconds: 198 },
    { id: 'local-30', type: 'local', name: 'Break Free',                artist: 'Ariana Grande',           url: 'https://archive.org/download/fave2/Ariana%20Grande%20-%20Break%20Free.mp3', img: 'https://images.unsplash.com/photo-1525683879097-c8172944b207?w=150&h=150&fit=crop', duration: '3:59', durationSeconds: 239 },
    { id: 'local-31', type: 'local', name: 'Honeymoon Avenue',          artist: 'Ariana Grande',           url: 'https://archive.org/download/fave2/Ariana%20Grande%20-%20Honeymoon%20Avenue.mp3', img: 'https://images.unsplash.com/photo-1452421820064-e70a9ef8a66b?w=150&h=150&fit=crop', duration: '5:39', durationSeconds: 339 },
    { id: 'local-32', type: 'local', name: 'Side To Side',              artist: 'Ariana Grande ft. Nicki Minaj',url: 'https://archive.org/download/fave2/Ariana%20Grande%20-%20Side%20To%20Side%20ft.%20Nicki%20Minaj.mp3',img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=150&h=150&fit=crop', duration: '3:46', durationSeconds: 226 },
    { id: 'local-33', type: 'local', name: 'Tattooed Heart',            artist: 'Ariana Grande',           url: 'https://archive.org/download/fave2/Ariana%20Grande%20-%20Tattooed%20Heart.mp3',  img: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=150&h=150&fit=crop', duration: '3:14', durationSeconds: 194 },
    { id: 'local-34', type: 'local', name: 'All I Ever Need',           artist: 'Austin Mahone',           url: 'https://archive.org/download/fave2/Austin%20Mahone%20-%20All%20I%20Ever%20Need.mp3',  img: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=150&h=150&fit=crop', duration: '3:33', durationSeconds: 213 },
    { id: 'local-35', type: 'local', name: 'Rolex',                     artist: 'Ayo and Teo',             url: 'https://archive.org/download/fave2/Ayo%20and%20Teo%20-%20Rolex.mp3',  img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=150&h=150&fit=crop', duration: '3:49', durationSeconds: 229 },
    { id: 'local-36', type: 'local', name: 'Mine',                      artist: 'Bazzi',                   url: 'https://archive.org/download/fave2/Bazzi-Mine.mp3',  img: 'https://images.unsplash.com/photo-1484755560695-a4c740285a1b?w=150&h=150&fit=crop', duration: '2:11', durationSeconds: 131 },
    { id: 'local-37', type: 'local', name: 'River',                     artist: 'Bishop Briggs',           url: 'https://archive.org/download/fave2/BishopBriggs-River.mp3',  img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop', duration: '3:35', durationSeconds: 215 },
    { id: 'local-38', type: 'local', name: 'No Diggity',                artist: 'Blackstreet ft. Dr. Dre', url: 'https://archive.org/download/fave2/BlackstreetFt.Dr.DreQueenPen-NoDiggity.mp3',  img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=150&h=150&fit=crop', duration: '5:04', durationSeconds: 304 },
    { id: 'local-39', type: 'local', name: 'Wild Thoughts',             artist: 'DJ Khaled ft. Rihanna',   url: 'https://archive.org/download/fave2/DJ%20Khaled%20ft.%20Rihanna%20Bryson%20Tiller%20-%20Wild%20Thoughts.mp3',  img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=150&h=150&fit=crop', duration: '3:24', durationSeconds: 204 },
    { id: 'local-40', type: 'local', name: "I'm the One",               artist: 'DJ Khaled ft. Justin Bieber',url: 'https://archive.org/download/fave2/Dj%20Khaled%20-%20Im%20the%20One.mp3',img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop', duration: '4:48', durationSeconds: 288 },
    { id: 'local-41', type: 'local', name: 'One Dance',                 artist: 'Drake',                   url: 'https://archive.org/download/fave2/Drake%20-%20One%20Dance.mp3',  img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=150&h=150&fit=crop', duration: '2:54', durationSeconds: 174 },
    { id: 'local-42', type: 'local', name: 'With You',                  artist: 'Chris Brown',             url: 'https://archive.org/download/fave2/Chris%20Brown%20-%20With%20you.mp3', img: 'https://images.unsplash.com/photo-1525683879097-c8172944b207?w=150&h=150&fit=crop', duration: '4:12', durationSeconds: 252 },
    { id: 'local-43', type: 'local', name: 'Levitating',                artist: 'Dua Lipa',                url: 'https://archive.org/download/fave2/Dua%20Lipa%20-%20Levitating.mp3', img: 'https://images.unsplash.com/photo-1482440308425-276ad0f28b19?w=150&h=150&fit=crop', duration: '3:23', durationSeconds: 203 },
    { id: 'local-44', type: 'local', name: 'Watermelon Sugar',          artist: 'Harry Styles',            url: 'https://archive.org/download/fave2/Harry%20Styles%2520-%2520Watermelon%2520Sugar.mp3', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop', duration: '2:54', durationSeconds: 174 },
    { id: 'local-45', type: 'local', name: 'Dynamite',                  artist: 'BTS',                     url: 'https://archive.org/download/soundcloud-922487527/BTS%20-%20Dynamite%20%28Night%20Tempo%20%27Shiny%20Disco%27%20Remix%29.mp3', img: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=150&h=150&fit=crop', duration: '3:19', durationSeconds: 199 },
    { id: 'local-46', type: 'local', name: 'Butter',                    artist: 'BTS',                     url: 'https://archive.org/download/kpopreqnew/BTS%20%28%EB%B0%A9%ED%83%84%EC%86%8C%EB%85%84%EB%8B%A8%29%20%27Butter%27%20Official%20MV.mp3', img: 'https://images.unsplash.com/photo-1452421820064-e70a9ef8a66b?w=150&h=150&fit=crop', duration: '2:45', durationSeconds: 165 },
    { id: 'local-47', type: 'local', name: 'Stay With Me',              artist: 'Sam Smith',               url: 'https://archive.org/download/hitzone-best-of-2014/Hitzone%20Best%20Of%202014/CD2/10%20Sam%20Smith%20-%20Stay%20With%20Me.mp3', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=150&h=150&fit=crop', duration: '2:52', durationSeconds: 172 },
    { id: 'local-48', type: 'local', name: 'Writing on the Wall',       artist: 'Sam Smith',               url: 'https://archive.org/download/fave2/Sam%20Smith%2520-%2520Writing%2527s%2520On%2520The%2520Wall.mp3', img: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=150&h=150&fit=crop', duration: '3:39', durationSeconds: 219 },
    { id: 'local-49', type: 'local', name: 'Slow Hands',                artist: 'Niall Horan',             url: 'https://archive.org/download/fave2/Niall%20Horan%20-%20Slow%20Hands.mp3',  img: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=150&h=150&fit=crop', duration: '3:22', durationSeconds: 202 },
    { id: 'local-50', type: 'local', name: 'Too Much to Ask',           artist: 'Niall Horan',             url: 'https://archive.org/download/fave2/Niall%2520Horan%2520-%2520Too%2520Much%2520To%2520Ask.mp3',  img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=150&h=150&fit=crop', duration: '3:43', durationSeconds: 223 },
];

// Initialize global array for user uploaded custom tracks in runtime
window.customTracks = window.customTracks || [];

// Backward-compat references
const PLAYLISTS = LOCAL_TRACKS;
const DEFAULT_SPOTIFY_PLAYLISTS = [];

// ============================================================
// DATA GETTERS
// ============================================================
function getLocalTracks() {
    const custom = window.customTracks || [];
    return [...LOCAL_TRACKS, ...custom];
}

function getSpotifyTracks() {
    return []; // Spotify removed
}

function getAllTracks() {
    return getLocalTracks();
}

// Backward-compatible placeholders
function extractSpotifyTrackId(url) { return null; }
function isValidSpotifyUrl(url) { return false; }
function isDuplicateSpotifyTrack(spotifyId) { return false; }
function addCustomSpotifyTrack(track) { return null; }

window.PlaylistData = {
    LOCAL_TRACKS,
    DEFAULT_SPOTIFY_TRACKS: [],
    PLAYLISTS,
    DEFAULT_SPOTIFY_PLAYLISTS,
    getLocalTracks,
    getSpotifyTracks,
    getAllTracks,
    extractSpotifyTrackId,
    isValidSpotifyUrl,
    isDuplicateSpotifyTrack,
    addCustomSpotifyTrack
};

// ============================================================
// PLAYLIST PAGE MANAGER
// ============================================================
const PlaylistManager = {
    init() {
        const container = document.getElementById('playlist-container');
        if (!container) return; // Not on playlist page

        this.renderAddSongButton();
        container.innerHTML = '';

        // --- LOCAL PLAYLIST SECTION ---
        const localHeader = document.createElement('div');
        localHeader.className = 'col-span-full mt-2 mb-2 border-b border-slate-800/80 pb-2';
        localHeader.innerHTML = '<h2 class="text-xl font-bold text-white flex items-center gap-2"><i class="fa-solid fa-folder text-blue-400"></i> Local Playlist</h2>';
        container.appendChild(localHeader);

        const tracks = getLocalTracks();
        if (tracks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'col-span-full py-8 text-center text-slate-500 text-sm';
            emptyState.textContent = 'Belum ada lagu di Local Playlist.';
            container.appendChild(emptyState);
        } else {
            tracks.forEach(track => {
                container.appendChild(this.createSongCard(track));
            });
        }
    },

    /**
     * Creates a card element for a single track.
     */
    createSongCard(track) {
        const el = document.createElement('div');
        el.className = 'group bg-slate-900/60 p-4 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 hover:-translate-y-1';
        el.dataset.trackId = track.id;
        el.dataset.trackType = 'local';

        const title    = track.name    || 'Unknown Title';
        const cover    = track.img     || 'https://picsum.photos/seed/unknown/150/150';
        const artist   = track.artist  || 'Unknown Artist';
        const duration = track.duration || '0:00';

        el.innerHTML =
            '<div class="flex items-center gap-4 min-w-0 pointer-events-none">' +
                '<div class="w-16 h-16 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0 relative">' +
                    '<img src="' + cover + '" alt="' + title + '" class="w-full h-full object-cover">' +
                    '<div class="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">' +
                        '<i class="fa-solid fa-play text-white text-xl"></i>' +
                    '</div>' +
                '</div>' +
                '<div class="min-w-0">' +
                    '<h3 class="text-white font-bold text-base truncate w-40 sm:w-56" title="' + title + '">' + title + '</h3>' +
                    '<p class="text-slate-400 text-xs mt-1 truncate w-40 sm:w-56" title="' + artist + '">' + artist + '</p>' +
                '</div>' +
            '</div>' +
            '<div class="flex items-center gap-3 shrink-0 pointer-events-none">' +
                '<span class="text-slate-500 font-mono text-xs hidden sm:block">' + duration + '</span>' +
                (track.isCustom ? 
                '<button class="delete-btn w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:bg-red-650 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg" style="pointer-events:auto;" title="Hapus Lagu">' +
                    '<i class="fa-solid fa-trash-can text-xs"></i>' +
                '</button>' : '') +
                '<button class="play-btn w-9 h-9 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg" style="pointer-events:auto;">' +
                    '<i class="fa-solid fa-play text-xs ml-0.5"></i>' +
                '</button>' +
            '</div>';

        // Click on card triggers playSong
        el.addEventListener('click', (e) => {
            const isDeleteBtn = e.target.closest('.delete-btn');
            if (isDeleteBtn) {
                e.stopPropagation();
                this.deleteSong(track.id);
            } else {
                e.stopPropagation();
                this.playSong(track.id);
            }
        });

        return el;
    },

    playSong(trackId) {
        console.log('[PlaylistManager] playSong:', trackId);
        if (window.GlobalPlayer) {
            window.GlobalPlayer.playTrack(trackId);
        } else {
            console.warn('[PlaylistManager] GlobalPlayer not ready');
        }
    },

    async deleteSong(trackId) {
        if (!confirm('Apakah Anda yakin ingin menghapus lagu ini secara permanen?')) return;
        
        // Stop audio if currently playing this track
        if (window.GlobalPlayer && window.GlobalPlayer.currentTrack && window.GlobalPlayer.currentTrack.id === trackId) {
            window.GlobalPlayer.stopPlayback();
        }

        try {
            // Delete from IndexedDB
            if (window.MusicDB) {
                await window.MusicDB.delete(trackId);
            }

            // Revoke Blob URL to free memory
            const trackObj = window.customTracks.find(t => t.id === trackId);
            if (trackObj && trackObj.url && trackObj.url.startsWith('blob:')) {
                URL.revokeObjectURL(trackObj.url);
            }

            // Remove from runtime memory array
            window.customTracks = window.customTracks.filter(t => t.id !== trackId);

            // Re-render components
            this.init();
            if (window.GlobalPlayer) {
                window.GlobalPlayer.renderDrawerPlaylist();
            }

            // Show Toast Success
            if (window.GlobalPlayer && typeof window.GlobalPlayer.showToast === 'function') {
                window.GlobalPlayer.showToast('Lagu berhasil dihapus.');
            } else {
                alert('Lagu berhasil dihapus.');
            }
        } catch (e) {
            console.error('Delete song error:', e);
            alert('Gagal menghapus lagu dari database.');
        }
    },

    renderAddSongButton() {
        let btn = document.getElementById('btn-add-song');
        if (!btn) {
            const header = document.querySelector('#playlist-page-header');
            if (!header) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'flex justify-end mb-4';
            wrapper.innerHTML =
                '<button id="btn-add-song" type="button" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black bg-[#1DB954] hover:bg-[#1ed760] border border-[#1DB954]/30 shadow-lg shadow-[#1DB954]/20 transition-all duration-300 hover:-translate-y-0.5">' +
                    '<span class="text-base leading-none">+</span> Tambah Lagu' +
                '</button>';
            header.appendChild(wrapper);
            btn = wrapper.querySelector('#btn-add-song');
        }

        if (btn && !btn.dataset.bound) {
            btn.dataset.bound = 'true';
            btn.addEventListener('click', () => {
                if (typeof openAddSongAuth === 'function') {
                    openAddSongAuth();
                }
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => PlaylistManager.init());
window.addEventListener('pageChanged', () => PlaylistManager.init());
window.PlaylistManager = PlaylistManager;
