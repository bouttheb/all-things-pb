/* eslint-disable @next/next/no-img-element */
import { ALBUMS, SPOTIFY_ARTIST_URL, APPLE_MUSIC_ARTIST_URL } from "@/lib/data/albums";

export default function MusicSection() {
  return (
    <section id="music" className="site-section">
      <h2 className="section-heading">The Music of Benjamin Robinson</h2>
      <p className="text-center max-w-[680px] mx-auto -mt-2 mb-10 text-[1rem] leading-[1.75] text-[var(--color-subtle)] font-light">
        These songs were born from real seasons of prayer, worship, and personal surrender. Each one was written to draw listeners closer to the presence of God.
      </p>

      {/* Album grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-6">
        {ALBUMS.map((album) => (
          <div key={album.name} className="flex flex-col">
            <div className="relative rounded-md overflow-hidden aspect-square cursor-pointer group transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
              <img
                src={album.image}
                alt={album.name}
                className="w-full h-full object-cover block"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <span
                  className="text-[0.72rem] font-semibold text-white leading-tight"
                >
                  {album.name}
                </span>
              </div>
            </div>
            <div className="flex gap-1.5 justify-center pt-2.5">
              <a
                href={album.spotifyUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.06] text-[var(--color-ink)] text-[0.68rem] font-medium tracking-[0.02em] no-underline transition-all hover:bg-[#1DB954] hover:text-white"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                Spotify
              </a>
              <a
                href={album.appleMusicUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.06] text-[var(--color-ink)] text-[0.68rem] font-medium tracking-[0.02em] no-underline transition-all hover:bg-[#FC3C44] hover:text-white"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0 0 19.32.089C18.518-.005 17.718 0 16.912 0H7.076c-.805 0-1.604-.004-2.402.092a5.034 5.034 0 0 0-2.24.79C1.32 1.617.575 2.616.26 3.927a9.238 9.238 0 0 0-.24 2.18c-.028.557-.037 1.113-.04 1.67v8.447c.003.556.012 1.113.04 1.67.043.734.14 1.467.24 2.19.317 1.31 1.062 2.31 2.18 3.043a5.022 5.022 0 0 0 2.254.8c.798.098 1.598.093 2.402.093h9.836c.805 0 1.604.004 2.402-.093a5.034 5.034 0 0 0 2.24-.79c1.114-.734 1.859-1.733 2.174-3.044.1-.722.197-1.455.24-2.19.028-.556.037-1.112.04-1.67V7.793c-.003-.556-.012-1.113-.04-1.67zM17.32 17.086c0 .32-.025.632-.092.942a2.132 2.132 0 0 1-1.662 1.665c-.309.065-.625.092-.942.093-.5.003-.99-.052-1.47-.18a2.42 2.42 0 0 1-1.107-.635 1.504 1.504 0 0 1-.422-.942 1.532 1.532 0 0 1 .37-1.12c.275-.32.619-.52 1.013-.635.44-.133.892-.21 1.344-.27.38-.054.754-.107 1.13-.18.19-.036.37-.09.52-.22.15-.132.2-.302.2-.5V8.786a.505.505 0 0 0-.11-.35.51.51 0 0 0-.336-.145c-.12-.013-.24-.004-.36.013l-5.27.908c-.03.005-.06.012-.09.02a.486.486 0 0 0-.37.493v8.25c0 .32-.024.633-.09.943a2.134 2.134 0 0 1-1.664 1.664 4.53 4.53 0 0 1-.942.093c-.5.003-.99-.052-1.47-.18a2.42 2.42 0 0 1-1.107-.635A1.504 1.504 0 0 1 5.17 19a1.532 1.532 0 0 1 .37-1.12 2.27 2.27 0 0 1 1.013-.636c.44-.132.892-.21 1.344-.27.38-.053.754-.106 1.13-.18.19-.036.37-.09.52-.22.15-.13.2-.3.2-.498V7.476c0-.217.035-.432.12-.632a.96.96 0 0 1 .582-.518c.168-.058.34-.093.515-.12l6.22-1.072c.18-.03.363-.054.548-.053.386.003.698.165.86.52.063.14.09.29.09.443V17.086z"/></svg>
                Apple
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* View all buttons */}
      <div className="flex gap-3 justify-center flex-wrap">
        <a
          href={SPOTIFY_ARTIST_URL}
          target="_blank"
          rel="noopener"
          className="view-all-link"
        >
          All Music on Spotify
        </a>
        <a
          href={APPLE_MUSIC_ARTIST_URL}
          target="_blank"
          rel="noopener"
          className="view-all-link"
        >
          Apple Music
        </a>
      </div>
    </section>
  );
}
