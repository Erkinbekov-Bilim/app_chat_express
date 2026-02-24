import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IMessageMutation } from '../../types/chat/messageMutation.type';
import { axiosApi } from '../../api/axiosApi';

export const postNewMessage = createAsyncThunk<void, IMessageMutation>(
  'chat/postNewMessage',
  async (message) => {
    await axiosApi.post<IMessageMutation>('messages', message);
  },
);
