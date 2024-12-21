const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN as string;

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token
    })
  });

  return response.json();
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
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const artist = song.item.artists.map((_artist: { name: any; }) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return {
    album: album,
    albumImageUrl: albumImageUrl,
    artist: artist,
    isPlaying: isPlaying,
    songUrl: songUrl,
    title: title
  }
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};