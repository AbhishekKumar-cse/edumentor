
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import ChatInterface from "./chat-interface";

export default function DoubtSolverPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex min-h-0">
        <ChatInterface />
      </div>
    </div>
  );
}
