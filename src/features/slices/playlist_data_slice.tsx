import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import Playlist from '../../types/playlist'
import client from '../../backend/models'

export const fetchPlaylist = createAsyncThunk('playlist/show',
  async (data: {id: number}, thunkApi: any) => {
    const response = await client.playlists.show(data.id)
    return response.json()
  })

type PlaylistDataState = {
  count: number,
  playlists: {[id: number]: Playlist},
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
}

const initialState: PlaylistDataState = {
  count: 0,
  playlists: [],
  status: 'idle'
}

export const playlistDataSlice = createSlice({
  name: 'availablePlaylists',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => { state.count = action.payload }
  },
  extraReducers (builder) {
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      const newState = {
        ...state.playlists
      }
      newState[action.payload.id] = action.payload
      state.playlists = newState
      state.count = action.payload.length
    })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.status = 'rejected'
      })
      .addCase(fetchPlaylist.pending, (state, action) => {
        state.status = 'pending'
      })
  }
})

// Action creators are generated for each case reducer function
export const { setCount } = playlistDataSlice.actions

export default playlistDataSlice.reducer
