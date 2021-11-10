import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import Playlist from '../../types/playlist'
import Client from '../../backend/models/'

export const fetchPlaylists = createAsyncThunk('playlists/list',
  async (data: object = {}, thunkApi: any) => {
    const token: any = thunkApi.getState().account.token
    const client = new Client(token);
    const response = await client.playlists.list();
    return response.json();
})

type PlaylistsState = {
  count: number,
  playlists: Playlist[],
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
  updated_at: Date,
}

const initialState: PlaylistsState = {
  count: 0,
  playlists: [],
  status: 'idle',
  updated_at: new Date(1990, 1, 1, 0, 0, 0, 0),
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
