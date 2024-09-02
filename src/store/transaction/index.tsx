import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import { getSaldo } from '../balance';
import axiosInstance from '@/utils/axios-setup';

interface TopupType {
  total_amount: number
  service_code: string
  transaction_type: string
}

const token = Cookies.get('accessToken');

export const transaction = createAsyncThunk(
  'transaction/transaction',
  async (data: TopupType, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post('/transaction', data);

      const message = response.data.message

      dispatch(getSaldo())

      toast.success(message);

      return response.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const getTransactionHistory = createAsyncThunk(
  'transaction/getTransactionHistory', async ({ offset, limit }: { offset: number; limit: number }) => {
    const response = await axiosInstance.get('/transaction/history', {
      params: {
        offset,
        limit,
      }
    });

    return response.data
  }
)

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    loadingTransaction: false,
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(transaction.pending, (state) => {
        state.loadingTransaction = true
      })
      .addCase(transaction.fulfilled, (state, action) => {
        state.loadingTransaction = false
      })
      .addCase(transaction.rejected, (state) => {
        state.loadingTransaction = false
      })
    builder
      .addCase(getTransactionHistory.pending, (state) => {
        state.loading = true
      })
      .addCase(getTransactionHistory.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
      })
      .addCase(getTransactionHistory.rejected, (state) => {
        state.loading = false
      })
  },
})

export default transactionSlice.reducer;