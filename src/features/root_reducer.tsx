import currentPlaylistReducer from './slices/current_playlist_slice'
import accountReducer from './slices/account_slice'
import { combineReducers } from 'redux'


export const rootReducer = combineReducers({
  account: accountReducer,
  currentPlaylist: currentPlaylistReducer,
})

export type RootState = ReturnType<typeof rootReducer>
