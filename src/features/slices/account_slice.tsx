import fetchOngoingPlaylist from './current_playlist_slice'
import fetchPlaylists from './playlists_slice'

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../backend/models/'
import Account from '../../types/account'

export const authenticate = createAsyncThunk('account/authenticate',
  async (loginData: { email?: string, password?: string, token?: string }, thunkApi: any) => {
    const loginAction = async (data: typeof loginData) => {
      if (data.email && data.password) {
        return client.account.authenticate(data.email, data.password);
      } else if (data.token) {
        client.token = data.token;
        return client.account.me();
      }
      throw new Error('Unexpected login event occured');
    }
    
    const resultPromise = Promise.resolve(await loginAction(loginData));

    resultPromise.then((result) => {
      // I think this was a hack, im not removing the comments yet but i might have to
      // thunkApi.dispatch(fetchOngoingPlaylist);
      // thunkApi.dispatch(fetchPlaylists);
    })
    return resultPromise
})

type AccountState = Account & {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: AccountState = {
  id: undefined,
  token: undefined,
  tokenExpiration: undefined,
  status: 'idle',
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      client.token = action.payload;
      state.token = action.payload;
    },
    setTokenExpiration: (state, action: PayloadAction<string>) => {
      state.tokenExpiration = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.id = action.payload.id;
      state.token = action.payload.token;
      localStorage.setItem('account_token', action.payload.token);
    })
    .addCase(authenticate.rejected, (state, action) => {
      state.status = 'rejected';
      state.id = -1;
      state.token = undefined;
    })
    .addCase(authenticate.pending, (state, action) => {
      state.status = 'pending';
    })
  }
})

export const { setAccountId, setToken } = accountSlice.actions

export default accountSlice.reducer
