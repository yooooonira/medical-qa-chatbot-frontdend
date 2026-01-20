import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useState } from "react";

function Chat() {
  const [input, setInput] = useState("");
  const {
    messages,
    isConnected,
    isLoading,
    error,
    sendMessage,
  } = useChatSocket();

  // 가장 최근 답변만 사용
  const latestAnswer =
    messages.length > 0 ? messages[messages.length - 1] : "";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 상단 헤더 */}
      <header className="bg-teal-500 text-white">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <h1 className="text-xl font-bold">바른답 메디</h1>
          <p className="text-sm opacity-90">
            의료 Q&A 상담 서비스
          </p>
        </div>
      </header>

      {/* 메인 */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 space-y-6">
        {/* 의료 안내 */}
        <div className="bg-white border rounded-lg p-4 text-sm text-gray-600">
          본 서비스는 의료 정보를 참고용으로 제공하며,
          정확한 진단이나 처방은 반드시 의료 전문가와 상담하시기 바랍니다.
        </div>

        {/* 질문 입력 카드 */}
        <div className="bg-white border rounded-lg p-5 space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isConnected
                ? "의료 관련 질문을 입력하세요."
                : "서버에 연결 중입니다..."
            }
            disabled={!isConnected || isLoading}
            className="min-h-[120px]"
          />

          <Button
            className="w-full bg-teal-400 hover:bg-teal-500 text-white"
            disabled={!isConnected || isLoading || !input.trim()}
            onClick={() => {
              sendMessage(input);
              setInput("");
            }}
          >
            {isLoading ? "답변 생성 중..." : "상담 요청하기"}
          </Button>
        </div>

        {/* 답변 결과 카드 */}
        <div className="bg-white border rounded-lg p-5 min-h-[200px]">
          {isLoading && (
            <div className="text-sm text-gray-400">
              답변을 생성 중입니다...
            </div>
          )}

          {!isLoading && !latestAnswer && (
            <div className="text-sm text-gray-400">
              
            </div>
          )}

          <div className="space-y-4">
  {messages.length === 0 && !isLoading && (
    <div className="text-sm text-gray-400">
      의료 관련 질문을 입력해 주세요.
    </div>
  )}

  {messages.map((answer, idx) => (
    <div
      key={idx}
      className="border-b last:border-b-0 pb-4 text-sm text-gray-800 whitespace-pre-line"
    >
      {answer}
    </div>
  ))}

  {isLoading && (
    <div className="text-sm text-gray-400">
      답변을 생성 중입니다...
    </div>
  )}
</div>

        </div>

        {/* 에러 */}
        {error && (
          <div className="text-sm text-red-500">
            {error}
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="text-center text-xs text-gray-400 py-4">
        © 2026 바른답 메디 · Medical Q&A Service
      </footer>
    </div>
  );
}

export default Chat;
