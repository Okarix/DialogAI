'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function Home() {
	const [prompt, setPrompt] = useState('');
	const [answer, setAnswer] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const req = await axios.post('http://localhost:5000/chat', {
				message: prompt,
			});
			const response = req.data;
			setAnswer(response);
		} catch (error) {
			console.error('Error fetching data:', error);
			setAnswer('There was an error processing your request.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-col w-full min-h-screen'>
			<header className='bg-primary text-primary-foreground py-6 px-4 md:px-6'>
				<h1 className='text-3xl font-bold'>DialogAI</h1>
			</header>
			<main className='flex-1 py-12 px-4 md:px-6'>
				<div className='mb-8'>
					<h2 className='text-xl font-semibold mb-4'>Enter your question</h2>
					<div className='flex space-x-2'>
						<Input
							type='text'
							value={prompt}
							onChange={e => setPrompt(e.target.value)}
							placeholder='Enter your question'
							className='flex-1 px-4 py-2 border rounded-lg'
						/>
						<Button
							onClick={handleSubmit}
							className='px-4 py-2 bg-primary text-primary-foreground rounded-lg'
							disabled={isLoading}
						>
							{isLoading ? 'Loading...' : 'Send'}
						</Button>
					</div>
				</div>
				<div>
					<h2 className='text-xl font-semibold mb-4 text-center'>Answer</h2>
					{isLoading ? <p>Loading...</p> : answer.length === 0 ? <p className='text-center'>Enter your question</p> : <ReactMarkdown>{answer.response}</ReactMarkdown>}
				</div>
			</main>
		</div>
	);
}
