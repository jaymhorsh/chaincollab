// assetsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { getAssets, requestAssetUpload } from './assetsAPI';

interface Asset {
  id: string;
  name: string;
  // include additional fields as provided by Livepeer
}

interface AssetsState {
  assets: Asset[];
  loading: boolean;
  error: string | null;
}

const initialState: AssetsState = {
  assets: [],
  loading: false,
  error: null,
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.assets = action.payload;
      })
      .addCase(getAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(requestAssetUpload.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestAssetUpload.fulfilled, (state) => {
        state.loading = false;
        // Optionally update state here if you want to track the upload request status
      })
      .addCase(requestAssetUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to request asset upload';
      });
  },
});

export default assetsSlice.reducer;
