import express from 'express';
import type { Request, Response } from 'express';
import type { IMessageMutation } from '../types/chat/messageMutation.type.js';
import { validateData } from '../utils/validateData.js';
import chatRepository from '../repositories/chat.repository.js';
import type { IMessage } from '../types/chat/messaage.type.js';

const chatRouter = express.Router();

chatRouter.get('/', async (req: Request, res: Response) => {
  const queryDate: string = req.query.datetime as string;
  const date: Date = new Date(queryDate);

  if (date.getDate()) {
    const messagesAfterDate: IMessage[] =
      chatRepository.getMessagesFromDate(queryDate);
    return res.json(messagesAfterDate);
  }

  if (isNaN(date.getDate()) && queryDate != undefined) {
    return res.status(400).json({
      error: 'date is incorrect',
    });
  }

  const messages: IMessage[] = chatRepository.getLastMessages(30);
  return res.json(messages);
});

chatRouter.post('/', async (req: Request, res: Response) => {
  const data: IMessageMutation = req.body;
  const correctMessageData: IMessageMutation = {
    message: data.message,
    author: data.author,
  };

  const isValidateData: boolean = validateData(
    data,
    Object.keys(correctMessageData),
  );

  if (!isValidateData) {
    const correctMessageDataFields: string[] = Object.keys(correctMessageData);
    return res.status(400).json({
      error: `${correctMessageDataFields.join(', ')} must be present in the request`,
    });
  }

  const savedMessageData: IMessage = await chatRepository.addMessage(correctMessageData);
  return res.json(savedMessageData);
});

export default chatRouter;
