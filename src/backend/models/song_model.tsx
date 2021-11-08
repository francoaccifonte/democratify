import BaseModel from './base_model';

export type Song ={
  id: number;
  title: string;
  artist: string;
  album: string;
  year?: number;
  genre?: string;
}

class SongModel extends BaseModel {
  modelName(): string {
    return 'Song';
  }
}

export { SongModel }
