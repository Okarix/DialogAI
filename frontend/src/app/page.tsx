'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import useWebSocket from 'react-use-websocket';

export default function Home() {
	const [prompt, setPrompt] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [streamingResponse, setStreamingResponse] = useState<string>('');

	const { sendMessage, lastMessage } = useWebSocket('ws://localhost:5000', {
		onOpen: () => console.log('WebSocket connection established'),
	});

	useEffect(() => {
		if (lastMessage !== null) {
			const { response, error } = JSON.parse(lastMessage.data);
			if (response) {
				setStreamingResponse(prev => prev + response);
				setIsLoading(false);
			} else if (error) {
				console.error(error);
				setIsLoading(false);
			}
		}
	}, [lastMessage]);

	const handleSubmit = () => {
		setIsLoading(true);
		setStreamingResponse('');
		sendMessage(JSON.stringify({ message: prompt }));
		setPrompt('');
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
				</div>
				{streamingResponse && (
					<div className='mt-4'>
						<p className='text-gray-800'>
							<ReactMarkdown>{streamingResponse}</ReactMarkdown>
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
