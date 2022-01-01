import accountReducer from './slices/account_slice'
import currentPlaylistReducer from './slices/current_playlist_slice'
import playlistsReducer from './slices/playlists_slice'
import playlistDataReducer from './slices/playlist_data_slice'
import votationsReducer from './slices/votation_slice'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  account: accountReducer,
  currentPlaylist: currentPlaylistReducer,
  playlists: playlistsReducer,
  playlistData: playlistDataReducer,
  votations: votationsReducer
})

export type RootState = ReturnType<typeof rootReducer>
