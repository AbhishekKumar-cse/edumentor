
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
    <div className="p-6 md:p-10">
        <QuestionBankView subject={subjectData} />
    </div>
  );
}
