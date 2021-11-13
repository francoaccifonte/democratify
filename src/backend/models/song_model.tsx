import BaseModel from './base_model';

class SongModel extends BaseModel {
  modelName(): string {
    return 'Song';
  }
}

export { SongModel }
