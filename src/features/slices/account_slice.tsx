import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import Client from '../../backend/models/'
import Account from '../../types/account'

export const authenticate = createAsyncThunk('account/authenticate',
  async (data: { email?: string, password?: string, token?: string }, thunkApi: any) => {
    if (data.email && data.password) {
      const client = new Client();
      return client.account.authenticate(data.email, data.password);
    } else if (data.token) {
      const client = new Client(data.token);
      return client.account.me();
    }
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
      state.token = '';
    })
    .addCase(authenticate.pending, (state, action) => {
      state.status = 'pending';
    })
  }
})

export const { setAccountId, setToken } = accountSlice.actions

export default accountSlice.reducer
