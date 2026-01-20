// api/websocket.ts
let socket: WebSocket | null = null;

const WS_URL = import.meta.env.VITE_WS_URL ?? "ws://localhost:8000/ws/inference";

type MessageHandler = (data: any) => void;
type ErrorHandler = (e: Event) => void;

export function connectWS(
  onMessage: MessageHandler,
  onError?: ErrorHandler,
  onOpen?: () => void,
  onClose?: () => void
) {
  // 중복 연결 방지
  if (socket && socket.readyState === WebSocket.OPEN) return;

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("[WS] connected");
    onOpen?.();
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (e) {
      console.error("[WS] invalid message", event.data);
    }
  };

  socket.onerror = (e) => {
    console.error("[WS] error", e);
    onError?.(e);
  };

  socket.onclose = () => {
    console.log("[WS] disconnected");
    socket = null;
    onClose?.();
  };
}

export function sendQuestion(question: string) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.warn("[WS] send failed: not connected");
    return;
  }

  socket.send(
    JSON.stringify({
      type: "question",
      content: question,
    })
  );
}
