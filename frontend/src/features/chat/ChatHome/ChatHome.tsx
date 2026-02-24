import Box from '@mui/material/Box';
import ChatForm from '../components/ChatForm/ChatForm';
import Messages from '../components/Messages/Messages';

const ChatHome = () => {
  return (
    <Box component="section">
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '750px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Messages />
          <ChatForm />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatHome;
