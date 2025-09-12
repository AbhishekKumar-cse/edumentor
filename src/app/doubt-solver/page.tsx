
import ChatInterface from "./chat-interface";

export default function DoubtSolverPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
      <div className="relative h-[calc(100%-4rem)] w-[calc(100%-4rem)] max-w-6xl">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-cyan-purple-pink-extra-fast animate-rotate"/>
        <ChatInterface />
      </div>
    </div>
  );
}
