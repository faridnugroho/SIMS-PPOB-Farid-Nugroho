import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('accessToken');

export const getSaldo = createAsyncThunk(
  'balance/getSaldo', async () => {
    const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/balance', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

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