import type { RootState } from '../../app/store';

export const selectMessages = (state: RootState) => state.chat.messages;
export const selectLoading = (state: RootState) => state.chat.loading;
export const selectIsError = (state: RootState) => state.chat.isError;
