import BaseModel from './base_model'
import PlaylistFactory from './playlist_factory'

class PlaylistModel extends BaseModel {
  modelName(): string {
    return('playlists')
  }

  show(id: number) {
    const fafa = PlaylistFactory(id)
    return(
      fafa
    )
  }
}

export default PlaylistModel