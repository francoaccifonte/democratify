import { Song } from './song'

type Playlist = {
  id: number
  name: string
  description: string,
  external_url: string,
  cover_art_url: string,
  sample_songs?: Song[],
  spotify_songs: Song[],
}

export default Playlist
