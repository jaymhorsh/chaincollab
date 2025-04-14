import { createAsyncThunk } from '@reduxjs/toolkit';
import { InputCreatorIdType } from 'livepeer/models/components';
import api from '../utils/api'; // Assuming you have an axios instance setup
import axios from 'axios';
import { toast } from 'sonner';

interface CreateLivestreamProps {
  streamName: string;
  record: boolean;
  creatorId: string;
  paymentOption?: 'free' | 'one-time' | 'monthly';
  amount?: number;
  data?: any;
}

interface UpdateLivestreamProps {
  id: string;
  record?: boolean;
  creatorId?: string;
  name?: string;
  suspended?: boolean;
}

export const createLivestream = createAsyncThunk(
  'streams/createLivestream',
  async ({ streamName, record, creatorId, paymentOption, amount }: CreateLivestreamProps, { rejectWithValue }) => {
    try {
      // Step 1: Create the livestream
      const response = await api.post('/stream', {
        name: streamName,
        record,
        creatorId: {
          type: InputCreatorIdType.Unverified,
          value: creatorId,
        },
      });

      const { playbackId, streamKey, name } = response.data;

      // Step 2: Send the response data to another endpoint
      // const viewMode = paymentOption; // Use paymentOption as viewMode
      const data = {
        streamKey,
        playbackId,
        creatorId,
        viewMode: paymentOption,
        amount,
        streamName: name || streamName,
      };

      const secondResponse = await axios.post(`https://chaintv.onrender.com/api/streams/addstream`, { data });

      if (secondResponse.status === 200) {
        console.log('Data sent successfully:', secondResponse.data);
        toast.success('livestream added');
      } else if (secondResponse.status !== 200) {
        console.error('Error sending data:', secondResponse.data);
      } else {
        console.error('Unexpected response:', secondResponse);
      }
      return response.data;
    } catch (error: any) {
      console.log('Error creating livestream:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getAllStreams = createAsyncThunk('streams/getAllStreams', async () => {
  const response = await api.get('/stream');
  return response.data;
});

export const deleteStream = createAsyncThunk('streams/deleteStream', async (id: string) => {
  await api.delete(`/stream/${id}`);
  return id;
});

export const getStreamById = createAsyncThunk('streams/getStreamById', async (id: string) => {
  const response = await api.get(`/stream/${id}`);
  return response.data;
});

export const updateLivestream = createAsyncThunk(
  'streams/updateStream',
  async ({ id, record, creatorId, name }: UpdateLivestreamProps) => {
    const response = await api.patch(`/stream/${id}`, {
      name: name,
      record,
      // creatorId: {
      //   type: InputCreatorIdType.Unverified,
      //   value: creatorId,
      // },
    });
    return response.data;
  },
);
//
export const terminateStream = createAsyncThunk('streams/terminateStream', async (id: string) => {
  await api.delete(`/stream/${id}/terminate`);
  return id;
});
