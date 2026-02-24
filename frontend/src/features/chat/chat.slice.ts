import { createSlice } from '@reduxjs/toolkit';
import type { IMessage } from '../../types/chat/message.type';
import { getMessages, getNewMessages, postNewMessage } from './chat.api';

export interface IChatState {
  messages: IMessage[];
  loading: {
    fetchLoading: boolean;
    sendLoading: boolean;
  };
  isError: boolean;
}

const initialState: IChatState = {
  messages: [],
  loading: {
    fetchLoading: false,
    sendLoading: false,
  },
  isError: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postNewMessage.pending, (state) => {
      state.loading.sendLoading = true;
      state.isError = false;
    });
    builder.addCase(postNewMessage.fulfilled, (state) => {
      state.loading.sendLoading = false;
      state.isError = false;
    });
    builder.addCase(postNewMessage.rejected, (state) => {
      state.loading.sendLoading = false;
      state.isError = true;
    });

    builder.addCase(getMessages.pending, (state) => {
      state.loading.fetchLoading = true;
      state.isError = false;
    });
    builder.addCase(getMessages.fulfilled, (state, { payload: messages }) => {
      state.loading.fetchLoading = false;
      state.isError = false;
      state.messages = messages;
    });
    builder.addCase(getMessages.rejected, (state) => {
      state.loading.fetchLoading = false;
      state.isError = true;
    });

    builder.addCase(getNewMessages.pending, (state) => {
      state.loading.fetchLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getNewMessages.fulfilled,
      (state, { payload: newMessages }) => {
        state.loading.fetchLoading = false;
        state.isError = false;
        state.messages = [...state.messages, ...newMessages];
      },
    );
    builder.addCase(getNewMessages.rejected, (state) => {
      state.loading.fetchLoading = false;
      state.isError = true;
    });
  },
});

export const chatReducer = chatSlice.reducer;
