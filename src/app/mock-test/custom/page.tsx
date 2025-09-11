
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, ArrowLeft } from "lucide-react";
import { subjects } from "@/lib/data";
import GeneratorForm from "../generator-form";
import Link from "next/link";

export default function CustomMockTestPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-4">
          <Button asChild variant="outline">
            <Link href="/mock-test">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Mock Tests
            </Link>
          </Button>
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold">Mock Test Generator</h1>
            <p className="text-muted-foreground">
                Create custom mock tests to simulate exam conditions. Choose a subject-wise test or build your own from multiple chapters.
            </p>
          </div>
        </header>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <ClipboardList className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Configure Your Test</span>
            </CardTitle>
            <CardDescription>
              Choose a test pattern, select subjects and chapters, and set a timer to begin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GeneratorForm subjects={subjects} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
