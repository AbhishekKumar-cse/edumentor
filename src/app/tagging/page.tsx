import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tag } from "lucide-react";
import TaggingForm from "./tagging-form";

export default function AITaggingPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">AI Question Tagger</h1>
        <p className="text-muted-foreground">
          Automatically classify question difficulty and tag relevant concepts.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Tag className="w-6 h-6 text-primary" />
            <span className="font-headline text-2xl">Tag a Question</span>
          </CardTitle>
          <CardDescription>
            Enter the question text below to get AI-powered tags.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaggingForm />
        </CardContent>
      </Card>
    </div>
  );
}
