import 'dotenv/config';
import express from 'express';
import { logger } from './logger';
import http from 'http';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import WebSocket from 'ws';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(`${API_KEY}`);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
	ws.on('message', async message => {
		const userPrompt = JSON.parse(message).message;

		try {
			const result = await model.generateContentStream([userPrompt]);

			for await (const chunk of result.stream) {
				const chunkText = chunk.text();
				ws.send(JSON.stringify({ response: chunkText }));
			}
		} catch (error) {
			console.error(error);
			ws.send(JSON.stringify({ error: 'Error connecting to Gemini API' }));
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server runs at http://localhost:${PORT}`);
});
