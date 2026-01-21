import { useEffect, useState } from "react";
import { connectWS, sendQuestion } from "@/api/websocket";

export function useChatSocket() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    connectWS(
      // onMessage
      (data) => {
        if (data.type === "answer") {
          setMessages((prev) => [...prev, data.content]);
          setIsLoading(false);
        }

        if (data.type === "error") {
          setError(data.content);
          setIsLoading(false);
        }
      },

      // onError
      () => {
        setError("WebSocket 연결 오류");
        setIsConnected(false);
        setIsLoading(false);
      },

      // ✅ onOpen (이게 핵심)
      () => {
        setIsConnected(true);
      },

      // onClose
      () => {
        setIsConnected(false);
        setIsLoading(false);
      }
    );
  }, []);

  const sendMessage = (question: string) => {
    if (!isConnected || isLoading) return;

    setIsLoading(true);
    setError(null);
    sendQuestion(question);
  };

  return {
    messages,
    isConnected,
    isLoading,
    error,
    sendMessage,
  };
}