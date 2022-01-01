import { Song } from './song'
import Account from './account'
import Playlist from './playlist'

export type OngoingPlaylist ={
  id?: number,
  pool_size: number,
  created_at?: Date,
  updated_at?: Date,
  account?: Account,
  spotify_playlist?: Playlist,
  playing_song?: Song,
  voting_songs: Song[],
  remaining_songs: Song[],
}
