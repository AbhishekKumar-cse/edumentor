
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
            Browse and practice questions from all chapters.
          </p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileQuestion className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Chapter-wise Questions</span>
            </CardTitle>
            <CardDescription>
              Select a subject and chapter to view all available questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuestionBankView subjects={subjects} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
