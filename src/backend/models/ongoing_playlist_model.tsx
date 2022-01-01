import BaseModel from './base_model'
import { Song } from '../../types/song'

class OngoingPlaylistModel extends BaseModel {
  modelName (): string {
    return ('ongoing_playlists')
  }

  start (playlistId: number, songId?: number) {
    return this.post({
      spotify_playlist_id: playlistId,
      playling_song_id: songId
    })
  }

  reorder (id: number, songs: Song[], poolSize: number) {
    const body = {
      pool_size: poolSize,
      spotify_playlist_songs: songs.map((song, index) => {
        return (
          {
            id: song.id,
            index: index
          }
        )
      })
    }

    return this.put(id, body)
  }
}

export { OngoingPlaylistModel }
