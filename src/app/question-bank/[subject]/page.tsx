
'use client';

import { subjects } from "@/lib/data";
import QuestionBankView from "../question-bank-view";
import { useParams } from 'next/navigation';

export default function SubjectQuestionBankPage() {
  const params = useParams();
  const subjectParam = Array.isArray(params.subject) ? params.subject[0] : params.subject;

  const subjectName = subjectParam.charAt(0).toUpperCase() + subjectParam.slice(1);
  const subjectData = subjects.find(s => s.name.toLowerCase() === subjectParam.toLowerCase());

  if (!subjectData) {
    return (
        <div className="p-6 md:p-10">
             <header className="space-y-2">
                <h1 className="text-4xl font-headline font-bold">Subject Not Found</h1>
                <p className="text-muted-foreground">
                    The subject "{subjectName}" does not exist in the question bank.
                </p>
            </header>
        </div>
    );
  }

  return (
     <div className="relative min-h-full w-full overflow-hidden p-6 md:p-10 bg-gray-900/50">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-gradient-cyan-purple-pink-fast opacity-20 blur-3xl animate-rotate" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-gradient-cyan-purple-pink opacity-30 blur-3xl animate-rotate" style={{animationDelay: '5s'}} />
        
        <div className="relative z-10">
            <QuestionBankView subject={subjectData} />
        </div>
    </div>
  );
}
