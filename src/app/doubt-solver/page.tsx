
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import ChatInterface from "./chat-interface";

export default function DoubtSolverPage() {
  return (
    <div className="p-6 md:p-10">
      <header className="space-y-2 mb-8">
        <h1 className="text-4xl font-headline font-bold">AI Doubt Solver</h1>
        <p className="text-muted-foreground">
          Have a question? Ask our AI assistant for help.
        </p>
      </header>
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex flex-row items-center gap-3">
              <HelpCircle className="w-6 h-6 text-primary" />
              <div className="flex flex-col">
                <CardTitle className="font-headline text-2xl">Chat with EduMentor AI</CardTitle>
                <CardDescription>Enter your question below to get an instant explanation.</CardDescription>
              </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
             <ChatInterface />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
