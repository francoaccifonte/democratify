import { AccountModel } from './account_model';
import { PlaylistModel } from './playlist_model';
import { SongModel } from './song_model';
import { OngoingPlaylistModel } from './ongoing_playlist_model';

class Client {
  token: string | undefined;
  account: AccountModel;
  playlists: PlaylistModel;
  ongoingPlaylist: OngoingPlaylistModel;
  songs: SongModel;

  constructor(token?: string) {
    this.token = token;
    this.account = new AccountModel(token);
    this.playlists = new PlaylistModel(token);
    this.ongoingPlaylist = new OngoingPlaylistModel(token);
    this.songs = new SongModel(token);
  }

  // TODO: Dry this up
  reloadModels(token?: string) {
    this.account = new AccountModel(token);
    this.playlists = new PlaylistModel(token);
    this.ongoingPlaylist = new OngoingPlaylistModel(token);
    this.songs = new SongModel(token);
  }

  setToken(token: string) {
    this.token = token;
    this.reloadModels(token);
  }
}

export { Client };
