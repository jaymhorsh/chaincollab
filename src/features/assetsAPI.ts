import api from '@/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const requestAssetUpload = createAsyncThunk(
    'assets/requestAssetUpload',
    async () => {
      // This call returns both a direct URL (url) and a tus endpoint (tusEndpoint)
      const response = await api.post('/asset/request-upload', null);
      return response.data;
    },
  );
  
  export const getAssets = createAsyncThunk(
    'assets/getAssets',
    async () => {
      const response = await api.get('/asset');
      return response.data;
    },
  );