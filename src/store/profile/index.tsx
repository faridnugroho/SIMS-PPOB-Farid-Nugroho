import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Dispatch } from 'redux'
import toast from 'react-hot-toast'
import axiosInstance from '@/utils/axios-setup';

interface UpdateProfileType {
  first_name: string
  last_name: string
}

interface Redux {
  dispatch: Dispatch<any>
}

interface UploadImagePayload {
  imageFile: File;
}

const token = Cookies.get('accessToken');

export const getProfile = createAsyncThunk(
  'profile/getProfile', async () => {
    const response = await axiosInstance.get('/profile');

    return response.data
  }
)

export const updateProfile = createAsyncThunk(
  'profile/updateProfile', async (data: UpdateProfileType, { dispatch }: Redux) => {
    const response = await axiosInstance.put('/profile/update', data)

    dispatch(getProfile())

    return response.data
  }
)

export const uploadImage = createAsyncThunk(
  'profile/uploadImage',
  async ({ imageFile }: UploadImagePayload, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await axiosInstance.put('/profile/image',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      dispatch(getProfile())

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Terjadi kesalahan';

        toast.error(message);

        return rejectWithValue({ message });
      }

      dispatch(getProfile())

      return rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
    data: [],
    uploadLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
      })
      .addCase(getProfile.rejected, (state) => {
        state.loading = false
      })

    builder
      .addCase(uploadImage.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadLoading = false;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadLoading = false;
      })
  },
})

export default profileSlice.reducer;