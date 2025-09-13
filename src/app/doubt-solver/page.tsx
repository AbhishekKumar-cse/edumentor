
import ChatInterface from "./chat-interface";

export default function DoubtSolverPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 p-4">
      <div className="relative h-full w-full max-w-6xl mx-auto">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-cyan-purple-pink animate-rotate"/>
        <ChatInterface />
      </div>
    </div>
  );
}
