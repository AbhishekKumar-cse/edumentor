import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tag, Telescope } from "lucide-react";
import TaggingForm from "./tagging-form";
import PastPaperExplorer from "./past-paper-explorer";
import { subjects } from "@/lib/data";

export default function AITaggingPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">AI Question Tagger & Explorer</h1>
        <p className="text-muted-foreground">
          Automatically classify questions and explore trends from past papers.
        </p>
      </header>
      <Tabs defaultValue="tagger">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tagger">
                <Tag className="mr-2 h-4 w-4" />
                AI Tagger
            </TabsTrigger>
            <TabsTrigger value="explorer">
                <Telescope className="mr-2 h-4 w-4" />
                Past Paper Explorer
            </TabsTrigger>
        </TabsList>
        <TabsContent value="tagger">
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
        </TabsContent>
         <TabsContent value="explorer">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Telescope className="w-6 h-6 text-primary" />
                    <span className="font-headline text-2xl">Explore Past Paper Topics</span>
                </CardTitle>
                <CardDescription>
                    Discover which concepts appear most frequently in past papers based on our question bank.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <PastPaperExplorer subjects={subjects} />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
