
'use client';

import { Card } from "@/components/ui/card";
import { ClipboardList, FileText, Users, Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { generateDpp } from "@/ai/flows/generate-dpp";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function MockTestPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartFullSyllabusTest = async () => {
    setIsLoading(true);
    toast({
      title: "Generating Full Syllabus Test...",
      description: "Please wait while we prepare your 90-question mock test.",
    });
    try {
      const testConfig = {
        dppType: 'full-syllabus' as const,
        dppName: "Full Syllabus Mock Test (90 Questions)",
      };
      
      const result = await generateDpp(testConfig);
      sessionStorage.setItem('mockTestConfig', JSON.stringify(result));
      router.push('/mock-test/start');

    } catch (error) {
      console.error("Failed to generate full syllabus test", error);
      toast({
        title: "Generation Failed",
        description: "Something went wrong while creating your test. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 text-white bg-gray-900 min-h-full">
      <div className="space-y-8 max-w-4xl mx-auto">
        <Card 
          className="bg-gray-800 border-blue-500/50 p-6 rounded-2xl cursor-pointer hover:bg-gray-700/50 transition-all group relative overflow-hidden"
          onClick={() => !isLoading && router.push('/mock-test/custom')}
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
          onClick={() => !isLoading && router.push('/mock-test/custom')}
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

        <div className="space-y-4">
            <h2 className="text-center text-2xl font-bold text-cyan-400 flex items-center justify-center gap-2">
                <Bot className="w-6 h-6"/>
                Interactive AI Tests
            </h2>
            <Card 
              className="bg-gray-800 border-cyan-500/50 p-6 rounded-2xl cursor-pointer hover:bg-gray-700/50 transition-all group relative overflow-hidden"
              onClick={handleStartFullSyllabusTest}
            >
              {isLoading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl z-10"><Loader2 className="w-8 h-8 animate-spin"/></div>}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shine_4s_linear_infinite]"></div>
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Full Combined Syllabus Test</h2>
                  <p className="text-gray-400">90 Questions</p>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <ClipboardList className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
            </Card>

            <Card 
              className="bg-gray-800 border-teal-500/50 p-6 rounded-2xl cursor-pointer hover:bg-gray-700/50 transition-all group relative overflow-hidden"
              onClick={() => !isLoading && router.push('/mock-test/custom')}
            >
               <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-teal-400 to-transparent animate-[shine_4s_linear_infinite]"></div>
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Chapter-wise Test</h2>
                   <p className="text-gray-400">60 Questions</p>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <FileText className="w-8 h-8 text-teal-400" />
                </div>
              </div>
            </Card>
        </div>

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
