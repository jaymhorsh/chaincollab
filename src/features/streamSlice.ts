import { createSlice } from '@reduxjs/toolkit';
import {
  createLivestream,
  getAllStreams,
  deleteStream,
  getStreamById,
  terminateStream,
  updateLivestream,
} from './streamAPI';

interface Stream {
  id: string;
  name: string;
  isActive: boolean;
  // other stream properties
}

interface StreamsState {
  streams: Stream[];
  loading: boolean;
  success: boolean;
  error: string | null;
  stream: any | null;
}

const initialState: StreamsState = {
  streams: [],
  stream: null,
  loading: false,
  error: null,
  success: false,
};

const streamsSlice = createSlice({
  name: 'streams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLivestream.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createLivestream.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.streams.push(action.payload);
      })
      .addCase(createLivestream.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message || 'Failed to create livestream';
      })
      .addCase(getAllStreams.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStreams.fulfilled, (state, action) => {
        state.loading = false;
        state.streams = action.payload;
      })
      .addCase(getAllStreams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch streams';
      })
      .addCase(deleteStream.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStream.fulfilled, (state, action) => {
        state.streams = state.streams.filter((stream) => stream.id !== action.payload);
      })
      .addCase(deleteStream.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete stream';
      })
      .addCase(getStreamById.pending, (state) => {
        state.loading = true;
      })
      // .addCase(getStreamById.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.stream = action.payload;
      //   // handle the fetched stream data
      // })
      .addCase(getStreamById.fulfilled, (state, action) => {
        state.loading = false;
        state.stream = action.payload;
        // Optionally, you can update the streams array with the fetched stream data
        const index = state.streams.findIndex((stream) => stream.id === action.payload.id);
        if (index !== -1) {
          state.streams[index] = action.payload;
        } else {
          state.streams.push(action.payload);
        }
      })
      .addCase(getStreamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch stream';
      })
      .addCase(terminateStream.fulfilled, (state, action) => {
        // Optionally, you can update the state to reflect the terminated session
        // For example, you might want to set a flag on the stream to indicate it's terminated
        const stream = state.streams.find((stream) => stream.id === action.payload);
        if (stream) {
          stream.isActive = false; // Assuming you have an isActive property
        }
      })
      .addCase(updateLivestream.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLivestream.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.streams.findIndex((stream) => stream.id === action.payload.id);
        if (index !== -1) {
          state.streams[index] = action.payload;
        }
      })
      .addCase(updateLivestream.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update livestream';
      });
  },
});

export default streamsSlice.reducer;
