import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import { getSaldo } from '../balance';

interface TopupType {
  top_up_amount: number
}

const token = Cookies.get('accessToken');

export const topup = createAsyncThunk(
  'topup/topup',
  async ({ top_up_amount }: TopupType, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/topup', { top_up_amount }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const message = response.data.message

      dispatch(getSaldo())

      toast.success(message);

      return response.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

const topUpSlice = createSlice({
  name: 'topup',
  initialState: {
    loading: false,
    data: [],
    params: {},
    loadingRegister: false,
  },
  reducers: {
    logout: (state) => {
      state.data = [];
      state.params = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(topup.pending, (state) => {
        state.loading = true
      })
      .addCase(topup.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(topup.rejected, (state) => {
        state.loading = false
      })
  },
})

export default topUpSlice.reducer;