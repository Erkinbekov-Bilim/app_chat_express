import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../app/hooks/reduxHooks';
import { getMessages } from '../../chat.api';
import {
  selectIsError,
  selectLoading,
  selectMessages,
} from '../../chat.selectors';
import MessageItem from '../MessageItem/MessageItem';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { CSSProperties } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';

const customScrollBarStyle: CSSProperties = {
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
  '&::-webkit-scrollbar-track': {
    background: indigo[100],
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: indigo[500],
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: indigo[700],
  },
};

const Messages = () => {
  const dispatch = useAppDispatch();
  const { fetchLoading } = useAppSelector(selectLoading);
  const isError = useAppSelector(selectIsError);
  const messages = useAppSelector(selectMessages);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  const renderContent = () => {
    if (fetchLoading) {
      return <CircularProgress />;
    }

    if (!fetchLoading && messages.length === 0) {
      return (
        <Typography variant="h5" component={'p'}>
          {' '}
          No messages
        </Typography>
      );
    }

    if (isError) {
      return (
        <Typography variant="h5" component={'p'} color="error">
          Error
        </Typography>
      );
    }

    return (
      <>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </>
    );
  };

  return (
    <Box
      sx={{
        height: '650px',
        overflow: 'hidden',
        overflowY: 'scroll',
        padding: 2,
        border: 1,
        borderColor: 'primary.main',
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        ...customScrollBarStyle,
      }}
    >
      {renderContent()}
    </Box>
  );
};

export default Messages;
