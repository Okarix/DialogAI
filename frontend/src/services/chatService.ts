import axios from 'axios';

export interface Chat {
	_id: string;
	userPrompt: string;
	response: string;
	createdAt: string;
}

export const fetchChats = async (): Promise<Chat[]> => {
	try {
		const response = await axios.get<Chat[]>('http://localhost:5000/api/chats');
		return response.data;
	} catch (error) {
		console.error('Failed to fetch chat history', error);
		return [];
	}
};
