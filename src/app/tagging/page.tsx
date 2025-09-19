
import TaggingInterface from "./tagging-form";

export default function AITaggingPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 p-4">
       <div className="relative h-full w-full max-w-full mx-auto">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-cyan-purple-pink-fast"/>
        <div className="relative h-full w-full rounded-2xl bg-background/80 backdrop-blur-sm border border-white/20 shadow-2xl shadow-black/20 overflow-hidden">
            <TaggingInterface />
        </div>
      </div>
    </div>
  );
}
