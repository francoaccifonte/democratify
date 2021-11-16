import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Song } from '../../types/song'
import { Client } from '../../backend/models/client'

export const fetchOngoingPlaylist = createAsyncThunk('playlists/ongoing',
  async (data: object = {}, thunkApi: any) => {
    const token: any = thunkApi.getState().account.token
    const client = new Client(token);
    const response = await client.ongoingPlaylist.list();
    return response.json();
})

interface CurrentPlaylistState {
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
  extraReducers: (builder) => {
    builder.addCase(fetchOngoingPlaylist.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.songs = action.payload.songs;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setId, setCandidatePoolSize, incrementPoolSize, decrementPoolSize, parseFromBackend, parseFromPlaylistReorderer } = currentPlaylistSlice.actions

export default currentPlaylistSlice.reducer