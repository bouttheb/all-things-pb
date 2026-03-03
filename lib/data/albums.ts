export interface Album {
  name: string;
  image: string;
  spotifyUrl: string;
  appleMusicUrl: string;
}

export const ALBUMS: Album[] = [
  {
    name: "You Are So Beautiful",
    image: "/images/album-1.jpg",
    spotifyUrl:
      "https://open.spotify.com/album/2z7gSVneQC7z8ZKApYOwKC?si=5oh904wuR8SnBafaz7jHow",
    appleMusicUrl:
      "https://music.apple.com/us/album/you-are-so-beautiful-single/1873725162",
  },
  {
    name: "Majestic",
    image: "/images/album-2.jpg",
    spotifyUrl:
      "https://open.spotify.com/album/62cWNda1C5hmJBeyweTh5t?si=YxLKgr2GT12g-Oq4MB6GHA",
    appleMusicUrl:
      "https://music.apple.com/us/album/majestic/1873445594?i=1873445595",
  },
  {
    name: "Let Us Exalt His Name",
    image: "/images/album-3.jpg",
    spotifyUrl:
      "https://open.spotify.com/album/08L6HbCawKIKdh6ihKYSW1?si=mC1yDWmiS2mg5ErVG56mOQ",
    appleMusicUrl:
      "https://music.apple.com/us/album/let-us-exalt-his-name/1869230081?i=1869230083",
  },
  {
    name: "All of the Days of My Life",
    image: "/images/album-4.jpg",
    spotifyUrl:
      "https://open.spotify.com/album/6qzC5qXD293S5dGo2iXEzT?si=185IhSSbTMSq2Fj_avvT-w",
    appleMusicUrl:
      "https://music.apple.com/us/album/all-of-the-days-of-my-life/1871913827?i=1871913828",
  },
  {
    name: "Shield Around Me",
    image: "/images/album-5.jpg",
    spotifyUrl:
      "https://open.spotify.com/album/38N9JJBZ62zjeXd1IjHG4r?si=uleXt0twSqK5COADZo9whg",
    appleMusicUrl:
      "https://music.apple.com/us/album/shield-around-me/1866798369?i=1866798373",
  },
];

export const SPOTIFY_ARTIST_URL =
  "https://open.spotify.com/artist/1GOMYzeFhHS3hT5e9rBhu7?si=DHQhvuwXT4CR_Hrv8I8tvw";

export const APPLE_MUSIC_ARTIST_URL =
  "https://music.apple.com/us/artist/benjamin-robinson/1577422057";
