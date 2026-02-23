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

  async addMessage(messageData: IMessageMutation) {
    const date: Date = new Date();
    const id = crypto.randomUUID();
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