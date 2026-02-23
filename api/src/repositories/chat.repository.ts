import { readFile, writeFile } from 'fs/promises';
import type { IMessage } from '../types/chat/messaage.type.js';
import type { IMessageMutation } from '../types/chat/messageMutation.type.js';

const dbPath: string = './src/data/chatMessages.json';
let data: IMessage[] = [];

const chatRepository = {
  async init() {
    try {
      const fileContent = await readFile(dbPath);
      data = JSON.parse(fileContent.toString());
    } catch (error) {
      data = [];
      console.error(error);
    }
  },

  async getAll() {
    return data;
  },

  getLastMessages(limit: number) {
    const messages: IMessage[] = data.slice(-limit);
    const sortedMessages: IMessage[] = [...messages]
      .sort(
        (a, b) =>
          new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
      )
      .slice(0, limit);

    return sortedMessages;
  },

  getMessagesFromDate(datetime: string) {
    const dateMessageIndex: number = data.findIndex(
      (message) => message.datetime === datetime,
    );

    const messagesAfterDate: IMessage[] = data.slice(
      dateMessageIndex + 1,
      data.length + 1,
    );
    return messagesAfterDate;
  },

  async addMessage(messageData: IMessageMutation) {
    const date: Date = new Date();
    const id: string = crypto.randomUUID();
    const newMessageData: IMessage = {
      ...messageData,
      datetime: date.toISOString(),
      id,
    };

    data.push(newMessageData);
    await this.save();

    return newMessageData;
  },

  async save() {
    return writeFile(dbPath, JSON.stringify(data));
  },
};

export default chatRepository;
