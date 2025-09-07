
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import ChatInterface from "./chat-interface";

export default function DoubtSolverPage() {
  return (
    <div className="h-full flex flex-col">
      <header className="space-y-2 p-6 md:p-10 pb-0">
        <h1 className="text-4xl font-headline font-bold">AI Doubt Solver</h1>
        <p className="text-muted-foreground">
          Have a question? Ask our AI assistant for help. You can even upload a PDF!
        </p>
      </header>
      <div className="flex-1 flex min-h-0">
        <ChatInterface />
      </div>
    </div>
  );
}
