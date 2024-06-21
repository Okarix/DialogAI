import 'dotenv/config';
import http from 'http';
import WebSocket from 'ws';
import app from './index';
import connectDB from './db';
import model from './utils/Gemini';
import Chat from './models/Chat';

const PORT = process.env.PORT || 3000;

connectDB();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
	ws.on('message', async message => {
		const userPrompt = JSON.parse(message.toString()).message;

		try {
			const result = await model.generateContentStream([userPrompt]);

			let fullResponse = '';
			for await (const chunk of result.stream) {
				const chunkText = chunk.text();
				fullResponse += chunkText;
				ws.send(JSON.stringify({ response: chunkText }));
			}

			const chat = new Chat({ userPrompt, response: fullResponse });
			await chat.save();
		} catch (error) {
			console.error(error);
			ws.send(JSON.stringify({ error: 'Error connecting to Gemini API' }));
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server runs at http://localhost:${PORT}`);
});
