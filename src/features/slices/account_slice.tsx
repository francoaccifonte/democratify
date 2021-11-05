import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import AccountModel from '../../backend/models/account_model'

export const authenticate = createAsyncThunk('account/authenticate',
  async (data: { email: string, password: string }, thunkApi) => {
    const client = new AccountModel();
    return client.authenticate(data.email, data.password);
})

interface AccountState { // can be a type in stead of an interface ( so | could be used)
  id: number,
  token: string,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: AccountState = {
  id: -1,
  token: '',
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
