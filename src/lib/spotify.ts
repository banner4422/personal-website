const client_id = import.meta.env.SPOTIFY_CLIENT_ID as string;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET as string;
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN as string;

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

let cachedAccessToken: string | null = null;
let tokenExpiryTime: number | null = null;

export const getAccessToken = async () => {
  const currentTime = Date.now();

  // Check if the token is cached and still valid
  if (cachedAccessToken && tokenExpiryTime && currentTime < tokenExpiryTime) {
    return cachedAccessToken;
  }

  // Fetch a new token if not cached or expired
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  const data = await response.json();

  // Cache the token and its expiry time
  cachedAccessToken = data.access_token;
  tokenExpiryTime = currentTime + data.expires_in * 1000; // expires_in is in seconds, convert to milliseconds

  return cachedAccessToken;
};

export interface NowPlayingSong {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export const getNowPlaying = async (): Promise<NowPlayingSong> => {
  const accessToken = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    cache: 'no-store'
  });

  if (response.status === 204 || response.status > 400) {
    return {
      album: '',
      albumImageUrl: '',
      artist: '',
      isPlaying: false,
      songUrl: '',
      title: ''
    };
  }

  const song = await response.json();

  if (song.item === null) {
    return {
      album: '',
      albumImageUrl: '',
      artist: '',
      isPlaying: false,
      songUrl: '',
      title: ''
    };
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((artist: { name: string }) => artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return {
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title
  }
};

export const getTopTracks = async () => {
  const accessToken = await getAccessToken();

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};