
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";
import { subjects } from "@/lib/data";
import QuestionBankView from "./question-bank-view";

export default function QuestionBankPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Question Bank</h1>
          <p className="text-muted-foreground">
            Analyze topics, filter by subject and chapter, and practice questions from a vast library.
          </p>
        </header>
        <QuestionBankView subjects={subjects} />
      </div>
    </div>
  );
}
