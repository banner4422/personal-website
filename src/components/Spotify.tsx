import AnimatedBars from './AnimatedBars';
import SpotifyLogo from './SpotifyLogo';
import { getNowPlaying } from '../lib/spotify';

export default async function Spotify() {
  const data = await getNowPlaying();

  return (
    <div className="flex flex-row-reverse items-center sm:flex-row mb-2 space-x-0 sm:space-x-2 w-full px-5 pb-2 sm:pb-0 sm:px-0">
      {data.isPlaying ? (
        <AnimatedBars />
      ) : (
        <SpotifyLogo />
      )}
      <div className="inline-flex flex-col sm:flex-row w-full max-w-full truncate">
        {data.isPlaying ? (
          <a
            className="text-gray-800 dark:text-gray-200 font-medium max-w-max truncate"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        ) : (
          <p className="text-gray-800 dark:text-gray-200 font-medium">
            Not Playing
          </p>
        )}
        <span className="mx-2 text-gray-500 dark:text-gray-300 hidden sm:block">
          {' – '}
        </span>
        <p className="text-gray-500 dark:text-gray-300 max-w-max truncate">
          {data.isPlaying ? data.artist : 'Spotify'}
        </p>
      </div>
    </div>
  );
}