import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('accessToken');

export const getServices = createAsyncThunk(
  'services/getServices', async () => {
    const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/services', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data
  }
)

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.loading = true
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
      })
      .addCase(getServices.rejected, (state) => {
        state.loading = false
      })
  },
})

export default servicesSlice.reducer;