
'use client';

import { subjects } from "@/lib/data";
import QuestionBankView from "../question-bank-view";

export default function SubjectQuestionBankPage({ params }: { params: { subject: string } }) {
  
  const subjectName = params.subject.charAt(0).toUpperCase() + params.subject.slice(1);
  const subjectData = subjects.find(s => s.name.toLowerCase() === params.subject.toLowerCase());

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

