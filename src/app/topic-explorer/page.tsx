import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Telescope } from "lucide-react";
import { subjects } from "@/lib/data";
import TopicExplorerView from "./topic-explorer-view";

export default function TopicExplorerPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">Topic Explorer</h1>
        <p className="text-muted-foreground">
          Analyze question trends and focus on the most important topics.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Telescope className="w-6 h-6 text-primary" />
            <span className="font-headline text-2xl">JEE Hot Topics</span>
          </CardTitle>
          <CardDescription>
            Discover which concepts appear most frequently in past JEE papers based on our question bank.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TopicExplorerView subjects={subjects} />
        </CardContent>
      </Card>
    </div>
  );
}
