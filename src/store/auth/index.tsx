import axios from 'axios';
import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterForm {
  email: string
  first_name: string
  last_name: string
  password: string
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/login', { email, password });

      const message = response.data.message

      toast.success(message);

      return response.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const registration = createAsyncThunk(
  'auth/register',
  async ({ email, first_name, last_name, password }: RegisterForm, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/registration', {
        email,
        first_name,
        last_name,
        password
      });

      const message = response.data.message

      toast.success(message);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Terjadi kesalahan';

        toast.error(message);

        return rejectWithValue({ message });
      }

      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
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

      document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;