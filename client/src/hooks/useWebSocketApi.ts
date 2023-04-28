import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

type Message = {
  type: string;
  data: Record<string, unknown>;
};

export const useWebSocketApi = (
  url: string,
  handlers: ((message: Message) => void | undefined)[],
) => {
  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(url);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    const json = lastJsonMessage as Message;
    if (!lastJsonMessage) return;
    handlers.find((handler) => handler(json));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);
  const send = (message: string) => sendMessage(message);
  return { send, connectionStatus };
};
