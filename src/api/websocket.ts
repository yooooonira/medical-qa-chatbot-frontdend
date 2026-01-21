// api/websocket.ts
let socket: WebSocket | null = null;

import.meta.env.VITE_WS_URL

const WS_URL =
  import.meta.env.VITE_WS_URL ?? "ws://localhost:8000/ws/inference";

type MessageHandler = (data: any) => void;
type ErrorHandler = (e: Event) => void;

export function connectWS(
  onMessage: MessageHandler,
  onError?: ErrorHandler,
  onOpen?: () => void,
  onClose?: () => void
) {
  // 이미 열려 있으면 onOpen 호출만 하고 종료
  if (socket && socket.readyState === WebSocket.OPEN) {
    onOpen?.();
    return;
  }

  // 연결 중이면 새로 만들지 않음
  if (socket && socket.readyState === WebSocket.CONNECTING) {
    return;
  }

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("[WS] connected");
    onOpen?.();
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch {
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
