
'use client';

import { Card } from "@/components/ui/card";
import { ClipboardList, FileText, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function MockTestPage() {
  const router = useRouter();

  return (
    <div className="p-6 md:p-10 text-white bg-gray-900 min-h-full">
      <div className="space-y-8 max-w-4xl mx-auto">
        <Card 
          className="bg-gray-800 border-blue-500/50 p-6 rounded-2xl cursor-pointer hover:bg-gray-700/50 transition-all group relative overflow-hidden"
          onClick={() => router.push('/mock-test/custom')}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[shine_4s_linear_infinite]"></div>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Create Your Own Test &gt;</h2>
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-8 h-8" />
                <span>Many students took a <br /> Custom Test in last hour!</span>
              </div>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <ClipboardList className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card 
          className="bg-gray-800 border-pink-500/50 p-6 rounded-2xl cursor-pointer hover:bg-gray-700/50 transition-all group relative overflow-hidden"
          onClick={() => router.push('/mock-test/custom')}
        >
          <div className="absolute top-0 right-0">
             <Badge className="bg-pink-500 text-white text-sm font-bold py-1 px-3 rounded-tl-none rounded-br-none rounded-tr-lg rounded-bl-lg">NEW</Badge>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-[shine_4s_linear_infinite]"></div>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">PYQ Mock Tests &gt;</h2>
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-8 h-8" />
                <span>Many students took a <br /> PYQ Mock Test in last hour!</span>
              </div>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <FileText className="w-8 h-8 text-pink-400" />
            </div>
          </div>
        </Card>
      </div>
       <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }
      `}</style>
    </div>
  );
}
