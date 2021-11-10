import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import Client from '../../backend/models/'
import Account from '../../types/account'

export const authenticate = createAsyncThunk('account/authenticate',
  async (data: { email: string, password: string }, thunkApi: any) => {
    const token: any = thunkApi.getState().account.token
    const client = new Client(token);
    return client.account.authenticate(data.email, data.password);
})

type AccountState = Account & {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: AccountState = {
  id: undefined,
  token: undefined,
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
    }
  },
  extraReducers(builder) {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.id = action.payload.id;
      state.token = action.payload.token;
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
