import accountReducer from './slices/account_slice'
import currentPlaylistReducer from './slices/current_playlist_slice'
import playlistsReducer from './slices/playlists_slice'
import { combineReducers } from 'redux'


export const rootReducer = combineReducers({
  account: accountReducer,
  currentPlaylist: currentPlaylistReducer,
  playlists: playlistsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
