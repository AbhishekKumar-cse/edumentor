
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FilePlus2, Flame } from "lucide-react";
import { subjects } from "@/lib/data";
import DppGenerator from "./dpp-generator";

export default function DppPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter">Daily Practice Problems</h1>
          <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Sharpen your skills with AI-generated practice sheets. Choose your subject to get started or create a custom DPP.
          </p>
        </header>
        <div className="flex justify-center">
             <DppGenerator subjects={subjects} />
        </div>
        <Card className="mt-12 bg-secondary/50 border-amber-500/30">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl flex items-center justify-center gap-2">
                <Flame className="w-6 h-6 text-amber-500" />
                <span>Why DPPs?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto">
                Regular practice with Daily Practice Problems (DPPs) is a proven method to build consistency, reinforce concepts, and improve problem-solving speed and accuracy. Our AI tailors these problems to your needs, ensuring you focus on what matters most for your exam preparation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
