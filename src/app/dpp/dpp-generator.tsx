
'use client';

import React, { useState } from 'react';
import type { Subject } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, BookCopy, FileText, Atom, FlaskConical, Calculator, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { generateDpp, DppInput } from '@/ai/flows/generate-dpp';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


interface DppGeneratorProps {
  subjects: Subject[];
}

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


export default function DppGenerator({ subjects }: DppGeneratorProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [dppType, setDppType] = useState<'full' | 'chapterwise'>('chapterwise');
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


  const handleChapterToggle = (chapterId: number) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };
  
  const handleGenerateDpp = async () => {
     if (!selectedSubject) return;

     setIsLoading(true);

     let chaptersToGenerate: DppInput['chapters'] = [];

     if (dppType === 'full') {
        chaptersToGenerate = selectedSubject.chapters.map(c => ({ id: c.id, questionCount: Math.floor(30 / selectedSubject.chapters.length) || 1 }));
     } else {
        if (selectedChapters.length === 0) {
             toast({
                title: 'Selection Required',
                description: 'Please select at least one chapter for the DPP.',
                variant: 'destructive',
            });
            setIsLoading(false);
            return;
        }
        chaptersToGenerate = selectedChapters.map(id => ({ id, questionCount: 15 }));
     }

     const dppInput: DppInput = {
        dppType: 'chapterwise', // The AI flow only uses this type
        chapters: chaptersToGenerate,
        dppName: `${selectedSubject.name} DPP - ${dppType === 'full' ? 'Full Syllabus' : 'Chapter-wise'}`,
        difficulty: 'Mixed' // Defaulting to mixed for now
     }

     try {
      toast({
        title: 'Generating DPP...',
        description: 'The AI is preparing your practice problems. Please wait.',
      });
      const result = await generateDpp(dppInput);
      
      sessionStorage.setItem('dppResult', JSON.stringify(result));
      router.push('/dpp/start');

    } catch (error) {
      console.error("Failed to generate DPP", error);
      toast({
        title: 'DPP Generation Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
        setIsLoading(false);
    }
  };


  if (selectedSubject) {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <Button onClick={() => setSelectedSubject(null)} variant="ghost" className='mb-4'>&larr; Back to Subjects</Button>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-3">
                        {React.createElement(subjectIcons[selectedSubject.name] || FileText, { className: "h-6 w-6"})}
                        {selectedSubject.name} DPP
                    </CardTitle>
                    <CardDescription>Select chapters or generate a full syllabus test for {selectedSubject.name}.</CardDescription>
                </CardHeader>
                <CardContent>
                     <RadioGroup value={dppType} onValueChange={(val: 'full' | 'chapterwise') => setDppType(val)} className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                            <RadioGroupItem value="chapterwise" id="chapterwise" className="peer sr-only" />
                            <Label htmlFor="chapterwise" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                Chapter-wise
                            </Label>
                        </div>

                         <div>
                            <RadioGroupItem value="full" id="full" className="peer sr-only" />
                            <Label htmlFor="full" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                Full Syllabus
                            </Label>
                        </div>
                    </RadioGroup>

                    {dppType === 'chapterwise' && (
                        <div className='space-y-4'>
                            <h4 className="font-semibold">Select Chapters:</h4>
                             <Accordion type="multiple" className="w-full space-y-2">
                                <AccordionItem value={selectedSubject.name} className="border rounded-md px-4">
                                    <AccordionTrigger className="font-semibold hover:no-underline text-base">
                                        {selectedSubject.name} Chapters
                                    </AccordionTrigger>
                                    <AccordionContent className="p-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2 max-h-60 overflow-y-auto">
                                        {selectedSubject.chapters.map((chapter) => (
                                            <div key={chapter.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary">
                                            <Checkbox
                                                id={`chapter-${chapter.id}`}
                                                checked={selectedChapters.includes(chapter.id)}
                                                onCheckedChange={() => handleChapterToggle(chapter.id)}
                                            />
                                            <Label htmlFor={`chapter-${chapter.id}`} className="flex-1 cursor-pointer">{chapter.name}</Label>
                                            </div>
                                        ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    )}
                     <div className="flex justify-end mt-6">
                        <Button onClick={handleGenerateDpp} size="lg" disabled={isLoading} variant="accent">
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Lightbulb className="mr-2 h-5 w-5" />}
                            {isLoading ? 'Generating...' : 'Generate DPP'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
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
                    onClick={() => setSelectedSubject(subject)}
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
  );
}
