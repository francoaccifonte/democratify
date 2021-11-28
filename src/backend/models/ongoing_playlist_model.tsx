import BaseModel from './base_model'

class OngoingPlaylistModel extends BaseModel {
  modelName(): string {
    return('ongoing_playlists')
  }

  start(playlistId: number, songId?: number) {
    return this.post('', {
      spotify_playlist_id: playlistId,
      playling_song_id: songId,
    })
  }
}

export { OngoingPlaylistModel }
