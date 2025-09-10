
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FilePlus2 } from "lucide-react";
import { subjects } from "@/lib/data";
import DppGenerator from "./dpp-generator";

export default function DppPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">DPP Practice</h1>
          <p className="text-muted-foreground">
            Generate Daily Practice Problems to sharpen your skills.
          </p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FilePlus2 className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">DPP Generator</span>
            </CardTitle>
            <CardDescription>
              Create a custom DPP by selecting chapters or let us build one for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DppGenerator subjects={subjects} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
