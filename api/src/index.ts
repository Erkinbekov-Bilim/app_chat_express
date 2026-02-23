import express from 'express';
import cors from 'cors';
import { PORT } from './constants/constants.js';
import chatRouter from './routes/chat.routes.js';
import type { Request, Response } from 'express';
import chatRepository from './repositories/chat.repository.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/messages', chatRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'not found' });
});

const run = async () => {
  await chatRepository.init();

  app.listen(PORT, () => {
    console.log(PORT);
  });
};

run();
