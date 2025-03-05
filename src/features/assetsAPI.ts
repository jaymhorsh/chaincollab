import api from '@/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface uploaAssetProps {
  name: string;
  staticMP4: boolean;
  creatorId: string;
}
export const requestAssetUpload = createAsyncThunk(
  'assets/requestAssetUpload',
  async ({ name, staticMP4 = true, creatorId }: uploaAssetProps) => {
    const response = await api.post('/asset/request-upload', {
      name,
      staticMP4,
      creatorId: {
        type: 'Unverified',
        value: creatorId,
      },
    });
    return response.data;
  },
);

export const getAssets = createAsyncThunk('assets/getAssets', async () => {
  const response = await api.get('/asset');
  return response.data;
});
