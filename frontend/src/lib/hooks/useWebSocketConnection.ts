import useWebSocket from 'react-use-websocket';

export const useWebSocketConnection = (url: string, onOpen: () => void) => {
	return useWebSocket(url, { onOpen });
};
