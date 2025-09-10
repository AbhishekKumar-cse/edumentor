
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

interface CustomChapterSelection {
    id: number;
    name: string;
    questionCount: number;
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
  const [dppGenType, setDppGenType] = useState<'subjectwise' | 'custom'>('subjectwise');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [dppType, setDppType] = useState<'full' | 'chapterwise'>('chapterwise');
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [customChapters, setCustomChapters] = useState<CustomChapterSelection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dppName, setDppName] = useState('');
  const [examType, setExamType] = useState<'jee' | 'neet'>('jee');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Mixed'>('Mixed');


  const { toast } = useToast();
  const router = useRouter();


  const handleChapterToggle = (chapterId: number) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };
  
   const handleCustomChapterToggle = (chapterId: number, chapterName: string) => {
    setCustomChapters((prev) => {
      const existing = prev.find((c) => c.id === chapterId);
      if (existing) {
        return prev.filter((c) => c.id !== chapterId);
      } else {
        return [...prev, { id: chapterId, name: chapterName, questionCount: 5 }];
      }
    });
  };

  const handleCustomQuestionCountChange = (chapterId: number, count: number) => {
    setCustomChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, questionCount: Math.max(1, count) } : c))
    );
  };
  
  const handleGenerateDpp = async () => {
     setIsLoading(true);

     let chaptersToGenerate: DppInput['chapters'] = [];
     let finalDppName = dppName;

     if (dppGenType === 'subjectwise') {
        if (!selectedSubject) {
            toast({ title: 'Subject Required', description: 'Please select a subject first.', variant: 'destructive' });
            setIsLoading(false);
            return;
        }
        if (dppType === 'full') {
            chaptersToGenerate = selectedSubject.chapters.map(c => ({ id: c.id, questionCount: Math.floor(30 / selectedSubject.chapters.length) || 1 }));
            finalDppName = dppName || `${selectedSubject.name} - Full Syllabus DPP`;
        } else {
            if (selectedChapters.length === 0) {
                toast({ title: 'Selection Required', description: 'Please select at least one chapter.', variant: 'destructive' });
                setIsLoading(false);
                return;
            }
            chaptersToGenerate = selectedChapters.map(id => ({ id, questionCount: 15 }));
            finalDppName = dppName || `${selectedSubject.name} - Chapter-wise DPP`;
        }
     } else { // Custom DPP
        if (customChapters.length === 0) {
            toast({ title: 'Selection Required', description: 'Please select at least one chapter for your custom DPP.', variant: 'destructive' });
            setIsLoading(false);
            return;
        }
        chaptersToGenerate = customChapters.map(c => ({ id: c.id, questionCount: c.questionCount }));
        finalDppName = dppName || 'Custom DPP';
     }


     const dppInput: DppInput = {
        dppType: dppGenType,
        chapters: chaptersToGenerate,
        dppName: finalDppName,
        examType: examType,
        difficulty: difficulty
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


  const renderSubjectwiseGenerator = () => {
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
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className='space-y-2'>
                               <Label htmlFor='exam-type'>Exam Type</Label>
                               <Select value={examType} onValueChange={(val: 'jee' | 'neet') => setExamType(val)}>
                                   <SelectTrigger id='exam-type'><SelectValue /></SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="jee">JEE</SelectItem>
                                       <SelectItem value="neet">NEET</SelectItem>
                                   </SelectContent>
                               </Select>
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='difficulty'>Difficulty</Label>
                                <Select value={difficulty} onValueChange={(val: 'Easy' | 'Medium' | 'Hard' | 'Mixed') => setDifficulty(val)}>
                                   <SelectTrigger id='difficulty'><SelectValue /></SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="Easy">Easy</SelectItem>
                                       <SelectItem value="Medium">Medium</SelectItem>
                                       <SelectItem value="Hard">Hard</SelectItem>
                                       <SelectItem value="Mixed">Mixed</SelectItem>
                                   </SelectContent>
                               </Select>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='dpp-name'>DPP Name (Optional)</Label>
                            <Input id="dpp-name" placeholder="e.g., Kinematics Practice Sheet 1" value={dppName} onChange={(e) => setDppName(e.target.value)} />
                        </div>

                         <RadioGroup value={dppType} onValueChange={(val: 'full' | 'chapterwise') => setDppType(val)} className="grid grid-cols-2 gap-4">
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
                            <Button onClick={handleGenerateDpp} size="lg" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
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

  const renderCustomGenerator = () => (
    <div className="w-full max-w-4xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Create a Custom DPP</CardTitle>
                <CardDescription>Mix and match chapters from different subjects and set the number of questions for each.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='space-y-2'>
                        <Label htmlFor='exam-type-custom'>Exam Type</Label>
                        <Select value={examType} onValueChange={(val: 'jee' | 'neet') => setExamType(val)}>
                            <SelectTrigger id='exam-type-custom'><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="jee">JEE</SelectItem>
                                <SelectItem value="neet">NEET</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='difficulty-custom'>Difficulty</Label>
                        <Select value={difficulty} onValueChange={(val: 'Easy' | 'Medium' | 'Hard' | 'Mixed') => setDifficulty(val)}>
                            <SelectTrigger id='difficulty-custom'><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Hard">Hard</SelectItem>
                                <SelectItem value="Mixed">Mixed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='dpp-name-custom'>DPP Name (Optional)</Label>
                    <Input id="dpp-name-custom" placeholder="e.g., Mixed Practice Set" value={dppName} onChange={(e) => setDppName(e.target.value)} />
                </div>
                <Accordion type="multiple" className="w-full space-y-2">
                    {subjects.map(subject => (
                        <AccordionItem value={subject.name} key={subject.name} className="border rounded-md px-4">
                            <AccordionTrigger className="font-semibold hover:no-underline text-base">
                                <div className="flex items-center gap-3">
                                  {React.createElement(subjectIcons[subject.name] || FileText, { className: "h-5 w-5"})}
                                  <span>{subject.name}</span>
                                </div>
                            </AccordionTrigger>
                             <AccordionContent className="p-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 pl-2 max-h-72 overflow-y-auto">
                                    {subject.chapters.map(chapter => (
                                        <div key={chapter.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary">
                                            <Checkbox
                                                id={`custom-chapter-${chapter.id}`}
                                                checked={customChapters.some(c => c.id === chapter.id)}
                                                onCheckedChange={() => handleCustomChapterToggle(chapter.id, chapter.name)}
                                            />
                                            <Label htmlFor={`custom-chapter-${chapter.id}`} className="flex-1 cursor-pointer">{chapter.name}</Label>
                                            {customChapters.some(c => c.id === chapter.id) && (
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    max="20"
                                                    value={customChapters.find(c => c.id === chapter.id)?.questionCount}
                                                    onChange={(e) => handleCustomQuestionCountChange(chapter.id, parseInt(e.target.value))}
                                                    className="w-20 h-8"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                             </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="flex justify-end mt-6">
                    <Button onClick={handleGenerateDpp} size="lg" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Lightbulb className="mr-2 h-5 w-5" />}
                        {isLoading ? 'Generating...' : 'Generate Custom DPP'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );


  return (
    <Tabs value={dppGenType} onValueChange={(val) => setDppGenType(val as 'subjectwise' | 'custom')} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="subjectwise">Subject-wise DPP</TabsTrigger>
        <TabsTrigger value="custom">Custom DPP</TabsTrigger>
      </TabsList>
      <TabsContent value="subjectwise" className="mt-6">
        {renderSubjectwiseGenerator()}
      </TabsContent>
      <TabsContent value="custom" className="mt-6">
        {renderCustomGenerator()}
      </TabsContent>
    </Tabs>
  )
}
