import { createAsyncThunk } from '@reduxjs/toolkit';
import { InputCreatorIdType } from 'livepeer/models/components';
import api from '../utils/api'; // Assuming you have an axios instance setup

interface CreateLivestreamProps {
  streamName: string;
  record: boolean;
  creatorId: string;
}

interface UpdateLivestreamProps {
  id: string;
  data: {
    streamName?: string;
    record?: boolean;
    creatorId?: string;
  };
}
export const createLivestream = createAsyncThunk(
  'streams/createLivestream',
  async ({ streamName, record, creatorId }: CreateLivestreamProps) => {
    const response = await api.post('/stream', {
      name: streamName,
      record,
      creatorId: {
        type: InputCreatorIdType.Unverified,
        value: creatorId,
      },
    });
    return response.data;
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
  async ({ id, data }: UpdateLivestreamProps) => {
    const response = await api.put(`/stream/${id}`, data);
    return response.data;
  },
);
//
export const terminateStream = createAsyncThunk('streams/terminateStream', async (id: string) => {
  await api.delete(`/stream/${id}/terminate`);
  return id;
});

