import { Request, Response } from 'express';
import Chat from '../models/Chat';

export const getChats = async (req: Request, res: Response) => {
	try {
		const chats = await Chat.find().sort({ createdAt: -1 });
		res.json(chats);
	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch chats' });
	}
};

export const getChatById = async (req: Request, res: Response) => {
	try {
		const chat = await Chat.findById(req.params.id);
		if (!chat) {
			return res.status(404).json({ error: 'Chat not found' });
		}
		res.json(chat);
	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch chat' });
	}
};
