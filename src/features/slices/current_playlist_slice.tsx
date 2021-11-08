import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Song } from '../../backend/models/song_model'

interface CurrentPlaylistState { // can be a type in stead of an interface ( so | could be used)
  id: number,
  totalTracks: number,
  candidatePoolSize: number,
  songs: Song[],
}

const initialState: CurrentPlaylistState = {
  id: -1,
  totalTracks: -1,
  candidatePoolSize: 3,
  songs: [],
}

export const currentPlaylistSlice = createSlice({
  name: 'currentPlaylist',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => { state.id = action.payload },
    setCandidatePoolSize: (state, action: PayloadAction<number>) => { state.candidatePoolSize = action.payload },
    incrementPoolSize: (state) => { state.candidatePoolSize += 1 },
    decrementPoolSize: (state) => { state.candidatePoolSize = Math.max(0, state.candidatePoolSize -1) },
    parseFromBackend: (state, action: PayloadAction<any[]>) => {
      state.totalTracks = action.payload.length;
      state.songs = action.payload;
    },
    parseFromPlaylistReorderer: (state, action: PayloadAction<any[]>) => {
      state.songs = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setId, setCandidatePoolSize, incrementPoolSize, decrementPoolSize, parseFromBackend, parseFromPlaylistReorderer } = currentPlaylistSlice.actions

export default currentPlaylistSlice.reducer