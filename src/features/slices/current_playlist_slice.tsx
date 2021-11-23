import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Song } from '../../types/song'
import client from '../../backend/models/'

export const fetchOngoingPlaylist = createAsyncThunk('playlists/ongoing',
  async (data: object = {}, thunkApi: any) => {
    const response = await client.ongoingPlaylist.list();
    return response.json();
  }
)

export const startOngoingPlaylist = createAsyncThunk('playlists/start',
  async (data: {playlistId: number, songId?: number}, thunkApi: any) => {
    const response = await client.ongoingPlaylist.start(data.playlistId, data.songId);
    return response.json();
  }
)

type CurrentPlaylistState = {
  id: number | undefined,
  totalTracks: number | undefined,
  candidatePoolSize: number,
  songs: Song[],
  playingSong: Song | undefined,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: CurrentPlaylistState = {
  id: undefined,
  totalTracks: undefined,
  candidatePoolSize: 3,
  songs: [],
  playingSong: undefined,
  status: 'idle',
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
      state.status = 'fulfilled'
      state.id = action.payload.id;
      state.songs = action.payload.songs;
      state.playingSong = action.payload.playing_song;
    })
    .addCase(fetchOngoingPlaylist.pending, (state, action) => {
      state.status = 'pending'
    })
    .addCase(fetchOngoingPlaylist.rejected, (state, action) => {
      state.status = 'rejected'
    })

    .addCase(startOngoingPlaylist.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.id = action.payload.id;
      state.songs = action.payload.songs;
      state.playingSong = action.payload.playing_song;
    })
    .addCase(startOngoingPlaylist.pending, (state, action) => {
      state.status = 'pending'
    })
    .addCase(startOngoingPlaylist.rejected, (state, action) => {
      state.status = 'rejected'
    })
  }
})

// Action creators are generated for each case reducer function
export const { setId, setCandidatePoolSize, incrementPoolSize, decrementPoolSize, parseFromBackend, parseFromPlaylistReorderer } = currentPlaylistSlice.actions

export default currentPlaylistSlice.reducer