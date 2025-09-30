
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
    <div className="relative min-h-full w-full overflow-hidden p-6 md:p-10 bg-gray-900/50">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-gradient-cyan-purple-pink-fast opacity-20 blur-3xl animate-rotate" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-gradient-cyan-purple-pink opacity-30 blur-3xl animate-rotate" style={{animationDelay: '5s'}} />
        
        <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
            <header className="space-y-2 text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter text-white">Question Bank</h1>
            <p className="text-muted-foreground md:text-xl">
                Select a subject to dive into our vast library of questions, filter by chapter, and start practicing.
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
                                "bg-white/5 border border-white/10 backdrop-blur-sm",
                                "hover:border-primary/50 hover:shadow-primary/20"
                            )}
                            onClick={() => router.push(`/question-bank/${subject.name.toLowerCase()}`)}
                        >
                            <div className="p-4 bg-white/10 rounded-full group-hover:scale-110 group-hover:bg-primary/20 transition-transform">
                                <Icon className="w-12 h-12 text-white" />
                            </div>
                            <CardTitle className="font-headline text-3xl">{subject.name}</CardTitle>
                            <CardDescription className="text-white/60">{subject.chapters.length} Chapters</CardDescription>
                        </Card>
                    )
                })}
            </div>
        </div>
    </div>
  );
}
