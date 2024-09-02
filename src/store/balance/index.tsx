import axiosInstance from '@/utils/axios-setup';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getSaldo = createAsyncThunk(
  'balance/getSaldo', async () => {
    const response = await axiosInstance.get('/balance');

    return response.data
  }
)

const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSaldo.pending, (state) => {
        state.loading = true
      })
      .addCase(getSaldo.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
      })
      .addCase(getSaldo.rejected, (state) => {
        state.loading = false
      })
  },
})

export default balanceSlice.reducer;