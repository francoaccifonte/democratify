import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { Votation } from '../../types/votation'
import client from '../../backend/models/'

export const fetchVotation = createAsyncThunk('votations/show',
  async (data: {id: number, token?: string}, thunkApi: any) => {
    const response = await client.votations.show(data.id, data.token);
    return response.json();
})

export const castVote = createAsyncThunk('votations/castVote',
  async (data: {accountId: number, candidateId: number, token?: string}, thunkApi: any) => {
    const votationIds = localStorage.getItem("votation_ids")?.split(",") || [];
    const currentVotationId = thunkApi.getState().votations.votation.id;
    if (votationIds.includes(currentVotationId.toString())) {
      return Promise.reject("Vote already casted");
    }
    const response = await client.votations.castVote(data.accountId, data.candidateId, data.token);
    return response.json();
})

type VotationState = {
  votation: Votation,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: VotationState = {
  votation: { id: undefined },
  status: 'idle',
}

export const votationsSlice = createSlice({
  name: 'votations',
  initialState,
  reducers: {
    resetStatus: (state, action: PayloadAction<string>) => {
      state.status = 'idle';
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchVotation.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.votation = action.payload;
    })
    .addCase(fetchVotation.rejected, (state, action) => {
      state.status = 'rejected';
    })
    .addCase(fetchVotation.pending, (state, action) => {
      state.status = 'pending';
    })
    builder.addCase(castVote.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      var votationIds = localStorage.getItem("votation_ids")?.split(",") || [];
      votationIds = [action.payload.id].concat(votationIds)
      localStorage.setItem("votation_ids", votationIds.join(","))
    })
    .addCase(castVote.rejected, (state, action) => {
      state.status = 'rejected';
    })
    .addCase(castVote.pending, (state, action) => {
      state.status = 'pending';
    })
  }
})

// Action creators are generated for each case reducer function
export const { resetStatus } = votationsSlice.actions

export default votationsSlice.reducer
