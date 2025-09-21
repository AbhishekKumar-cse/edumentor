
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Telescope } from "lucide-react";
import { subjects } from "@/lib/data";
import TopicExplorerView from "./topic-explorer-view";

export default function TopicExplorerPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Topic Explorer</h1>
          <p className="text-muted-foreground">
            Analyze question trends, difficulty distribution, and focus on the most important topics for your exams.
          </p>
        </header>
        <TopicExplorerView subjects={subjects} />
      </div>
    </div>
  );
}
