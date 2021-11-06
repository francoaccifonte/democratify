import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import PlaylistModel from '../../backend/models/playlist_model'

export const fetchPlaylists = createAsyncThunk('playlists/list',
  async (data: object = {}, thunkApi) => {
    const client = new PlaylistModel();
    return client.list();
})

type Playlist = {
  id: number
  name: string
  description: string,
  external_url: string,
}

interface PlaylistsState {
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
  name: 'currentPlaylist',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => { state.count = action.payload },
  },
  extraReducers(builder) {
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      console.log(action.payload);
      // state.count = action.payloasd;
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