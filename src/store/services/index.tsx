import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios-setup';

export const getServices = createAsyncThunk(
  'services/getServices', async () => {
    const response = await axiosInstance.get('/services');

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