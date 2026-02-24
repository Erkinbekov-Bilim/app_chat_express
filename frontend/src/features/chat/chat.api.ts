import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IMessageMutation } from '../../types/chat/messageMutation.type';
import { axiosApi } from '../../api/axiosApi';
import type { IMessage } from '../../types/chat/message.type';

export const postNewMessage = createAsyncThunk<void, IMessageMutation>(
  'chat/postNewMessage',
  async (message) => {
    await axiosApi.post<IMessageMutation>('messages', message);
  },
);

export const getMessages = createAsyncThunk<IMessage[], void>(
  'chat/getMessages',
  async () => {
    const { data } = await axiosApi.get<IMessage[]>('messages');
    return data;
  },
);
