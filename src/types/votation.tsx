import { Song } from './song'

export type Candidate = {
  id: number,
  votes?: number,
  created_at?: Date,
  updated_at?: Date,
  account_id?: number,
  ongoing_playlist_id?: number,
  spotify_playlist_song_id?: number,
  votation_id?: number,
  spotify_song?: Song
}

export type Votation = {
  id?: number,
  in_progress?: boolean,
  queued?: boolean,
  scheduled_close_for?: string | Date,
  scheduled_end_at?: string | Date,
  scheduled_end_for?: string | Date,
  scheduled_start_at?: string | Date,
  scheduled_start_for?: string | Date,
  started_at?: string | Date,
  created_at?: string | Date,
  updated_at?: string | Date,
  account_id?: number,
  ongoing_playlist_id?: number,
  votation_candidates?: Candidate[]
}
