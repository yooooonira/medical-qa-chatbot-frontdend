import { Link } from "react-router-dom";
import homeImage from "@/assets/home_image.png";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 병원 배너 */}
      <header className="bg-teal-500 text-white">
        <div className="max-w-6xl mx-auto px-8 py-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              바른답 메디
            </h1>
            <p className="text-lg opacity-90">
              신뢰할 수 있는 의료 Q&A 서비스
            </p>
          </div>

          <div className="hidden md:block">
            <img
              src={homeImage}
              alt="Medical team illustration"
              className="w-72 h-40 object-contain"
            />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-6xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12">
        {/* 서비스 설명 */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            왜 바른답 메디인가요?
          </h2>

          <ul className="space-y-4 text-gray-700">
            <li className="border-l-4 border-teal-500 pl-4">
              의료 지식 기반 AI로 <strong>신뢰도 높은 답변</strong> 제공
            </li>
            <li className="border-l-4 border-teal-500 pl-4">
              복잡한 의료 질문을 <strong>쉽고 명확하게 설명</strong>
            </li>
            <li className="border-l-4 border-teal-500 pl-4">
              언제 어디서나 가능한 <strong>의료 상담 Q&A</strong>
            </li>
          </ul>
        </section>

        {/* 안내 박스 */}
        <section className="bg-white border rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">
            서비스 이용 안내
          </h3>

          <p className="text-gray-600 mb-6 leading-relaxed">
            바른답 메디는 의료 정보를 참고용으로 제공하며,
            정확한 진단이나 처방은 반드시 전문 의료진과
            상담하시기 바랍니다.
          </p>

          <Link
            to="/chat"
            className="inline-block w-full text-center bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition"
          >
            의료 상담 시작하기
          </Link>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="text-center text-sm text-gray-400 py-6">
        © 2026 바른답 메디 · Medical Q&A Service
      </footer>
    </div>
  );
}

export default Home;
