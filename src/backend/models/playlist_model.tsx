import BaseModel from './base_model'

class PlaylistModel extends BaseModel {
  modelName(): string {
    return('spotify_playlists')
  }
}

export default PlaylistModel