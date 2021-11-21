import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import Playlist from '../../types/playlist'
import client from '../../backend/models/'

export const fetchPlaylists = createAsyncThunk('playlists/list',
  async (data: object = {}, thunkApi: any) => {
    const response = await client.playlists.list();
    return response.json();
})

type PlaylistsState = {
  count: number,
  playlists: Playlist[],
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
}

const initialState: PlaylistsState = {
  count: 0,
  playlists: [],
  status: 'idle',
}

export const playlistsSlice = createSlice({
  name: 'availablePlaylists',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => { state.count = action.payload },
  },
  extraReducers(builder) {
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.playlists = action.payload;
      state.count = action.payload.length;
    })
    .addCase(fetchPlaylists.rejected, (state, action) => {
      state.status = 'rejected';
    })
    .addCase(fetchPlaylists.pending, (state, action) => {
      state.status = 'pending';
    })
  }
})

// Action creators are generated for each case reducer function
export const { setCount } = playlistsSlice.actions

export default playlistsSlice.reducer
