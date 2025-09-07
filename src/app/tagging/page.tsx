
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tag } from "lucide-react";
import TaggingForm from "./tagging-form";

export default function AITaggingPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">AI Question Tagger</h1>
          <p className="text-muted-foreground">
            Automatically classify questions by difficulty, concepts, and more.
          </p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Tag className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Tag a Question</span>
            </CardTitle>
            <CardDescription>
              Enter the question text below to get AI-powered tags and analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TaggingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
