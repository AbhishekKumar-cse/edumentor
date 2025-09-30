
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Atom, Calculator, FlaskConical } from "lucide-react";
import { subjects } from "@/lib/data";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const subjectIcons: { [key: string]: React.ElementType } = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: Calculator,
};

const subjectColors: {[key: string]: string} = {
    Physics: "from-orange-500 to-amber-500 hover:shadow-orange-500/30",
    Chemistry: "from-green-500 to-emerald-500 hover:shadow-green-500/30",
    Mathematics: "from-blue-500 to-sky-500 hover:shadow-blue-500/30",
};


export default function QuestionBankPage() {
  const router = useRouter();

  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Question Bank</h1>
          <p className="text-muted-foreground">
            Analyze topics, filter by subject and chapter, and practice questions from a vast library.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subjects.map(subject => {
                const Icon = subjectIcons[subject.name];
                return (
                    <Card 
                        key={subject.id} 
                        className={cn(
                            "p-6 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 ease-in-out cursor-pointer group bg-gradient-to-br hover:scale-105 hover:shadow-lg text-white",
                            subjectColors[subject.name]
                        )}
                        onClick={() => router.push(`/question-bank/${subject.name.toLowerCase()}`)}
                    >
                        <div className="p-4 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                            <Icon className="w-12 h-12" />
                        </div>
                        <CardTitle className="font-headline text-3xl">{subject.name}</CardTitle>
                        <CardDescription className="text-white/80">{subject.chapters.length} Chapters</CardDescription>
                    </Card>
                )
            })}
        </div>

      </div>
    </div>
  );
}
