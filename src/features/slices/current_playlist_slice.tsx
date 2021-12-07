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

export const updateInBackend = createAsyncThunk('playlists/update',
  async (data: {songs: Song[]}, thunkApi: any) => {
    const { id } = thunkApi.getState().currentPlaylist.remainingSongs;
    const candidatePoolSize = thunkApi.getState().currentPlaylist.candidatePoolSize;
    const response = await client.ongoingPlaylist.reorder(id, data.songs, candidatePoolSize);
    return response.json();
  }
)

type CurrentPlaylistState = {
  id: number | undefined,
  totalTracks: number | undefined,
  candidatePoolSize: number,
  playingSong: Song | undefined,
  votingSongs: Song[],
  remainingSongs: Song[],
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: CurrentPlaylistState = {
  id: undefined,
  totalTracks: undefined,
  candidatePoolSize: 3,
  votingSongs: [],
  remainingSongs: [],
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
    decrementPoolSize: (state) => { state.candidatePoolSize = Math.max(2, state.candidatePoolSize -1) },
    parseFromPlaylistReorderer: (state, action: PayloadAction<Song[]>) => {
      state.remainingSongs = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOngoingPlaylist.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.id = action.payload.id;
      state.playingSong = action.payload.playing_song;
      state.votingSongs = action.payload.voting_songs;
      state.remainingSongs = action.payload.remaining_songs;
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
      state.playingSong = action.payload.playing_song;
      state.votingSongs = action.payload.voting_songs;
      state.remainingSongs = action.payload.remaining_songs;
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
export const { setId, setCandidatePoolSize, incrementPoolSize, decrementPoolSize, parseFromPlaylistReorderer } = currentPlaylistSlice.actions

export default currentPlaylistSlice.reducer