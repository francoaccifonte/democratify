import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CurrentPlaylistState { // can be a type in stead of an interface ( so | could be used)
  id: number,
  totalTracks: number,
  candidatePoolSize: number,
}

const initialState: CurrentPlaylistState = {
  id: -1,
  totalTracks: -1,
  candidatePoolSize: 3,
}

export const currentPlaylistSlice = createSlice({
  name: 'currentPlaylist',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => { state.id = action.payload },
    setCandidatePoolSize: (state, action: PayloadAction<number>) => { state.candidatePoolSize = action.payload },
    incrementPoolSize: (state) => { state.candidatePoolSize += 1 },
    decrementPoolSize: (state) => { state.candidatePoolSize = Math.max(0, state.candidatePoolSize -1) },
  },
})

// Action creators are generated for each case reducer function
export const { setId, setCandidatePoolSize, incrementPoolSize, decrementPoolSize } = currentPlaylistSlice.actions

export default currentPlaylistSlice.reducer