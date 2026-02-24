import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import type { IMessageMutation } from '../../../../types/chat/messageMutation.type';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../../../app/hooks/reduxHooks';
import { postNewMessage } from '../../chat.api';

const ChatForm = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMessageMutation>({
    defaultValues: {
      message: '',
      author: '',
    },
  });

  const onSubmit = (data: IMessageMutation) => {
    dispatch(postNewMessage(data));
    reset({
      message: '',
      author: '',
    });
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            width={500}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
            gap={3}
          >
            <Controller
              name="author"
              control={control}
              rules={{
                required: "Author's name is required!",
                minLength: {
                  value: 3,
                  message: "Author's name must be at least 3 characters long!",
                },
                maxLength: {
                  value: 20,
                  message: "Author's name must be at most 20 characters long!",
                },
                validate: (value) =>
                  value.trim() !== '' || "Author's name is required!",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Author"
                  variant="outlined"
                  error={!!fieldState.error}
                />
              )}
            />
            {errors.author && (
              <Typography color="error">{errors.author.message}</Typography>
            )}

            <Controller
              name="message"
              control={control}
              rules={{
                required: 'message is required!',
                minLength: {
                  value: 1,
                  message: 'message must be at least 1 characters long!',
                },
                maxLength: {
                  value: 50,
                  message: 'message must be at most 20 characters long!',
                },
                validate: (value) =>
                  value.trim() !== '' || 'Message is required!',
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Message"
                  variant="outlined"
                  error={!!fieldState.error}
                />
              )}
            />
            {errors.message && (
              <Typography color="error">{errors.message.message}</Typography>
            )}

            <Button variant="contained" type="submit">
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ChatForm;
