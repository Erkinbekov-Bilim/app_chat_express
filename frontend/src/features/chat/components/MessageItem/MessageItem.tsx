import { type FC } from 'react';
import type { IMessage } from '../../../../types/chat/message.type';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { indigo } from '@mui/material/colors';
import { formatDateTime } from './formaDate';

interface IMessageItemProps {
  message: IMessage;
}

const MessageItem: FC<IMessageItemProps> = ({ message }) => {
  const formateDateTime: string = formatDateTime(message.datetime);
  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'primary.main',
        borderRadius: 5,
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          component={'p'}
          sx={{
            width: 100,
            backgroundColor: indigo[900],
            borderRadius: 5,
            color: indigo[50],
            textAlign: 'center',
          }}
        >
          {message.author}
        </Typography>
        <Typography>{formateDateTime}</Typography>
      </Box>
      <p>{message.message}</p>
    </Box>
  );
};

export default MessageItem;
