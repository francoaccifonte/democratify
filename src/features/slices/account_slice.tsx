import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AccountState { // can be a type in stead of an interface ( so | could be used)
  id: number,
  token: string,
}

const initialState: AccountState = {
  id: -1,
  token: '',
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
})

// Action creators are generated for each case reducer function
export const { setAccountId, setToken } = accountSlice.actions

export default accountSlice.reducer
