import 'dotenv/config';
import express from 'express';
import { logger } from './logger';
import http from 'http';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(`${API_KEY}`);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.post('/chat', async (req, res) => {
	const userPrompt = req.body.message;

	try {
		const result = await model.generateContent(userPrompt);
		const response = await result.response;
		const text = response.text();

		res.json({ response: text });
	} catch (error) {
		console.error(error);
		res.status(500).send('Error connecting to Gemini API');
	}
});

server.listen(PORT, () => {
	console.log(`Server runs at http://localhost:${PORT}`);
});
