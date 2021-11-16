import BaseModel from './base_model'

class OngoingPlaylistModel extends BaseModel {
  modelName(): string {
    return('ongoing_playlists')
  }
}

export { OngoingPlaylistModel }
