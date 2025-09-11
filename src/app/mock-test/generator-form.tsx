
'use client';

import React, { useState, useEffect } from 'react';
import type { Subject, Question } from '@/lib/data';
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
import { Lightbulb, BookCopy, FileText, Atom, FlaskConical, History, Repeat, Trash2, ArrowLeft, CheckCircle, Calculator } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


interface GeneratorFormProps {
  subjects: Subject[];
}

interface TestQuestion extends Question {
  userAnswer?: string;
  status: 'unanswered' | 'answered' | 'review';
  timeTaken: number;
}

export type MockTestHistoryItem = {
    id: string;
    name: string;
    config: any; // The original test config
    questions: TestQuestion[];
    score: number;
    totalMarks: number;
    accuracy: number;
    totalTime: number;
    timestamp: number;
}

const subjectIcons: { [key: string]: React.ElementType } = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: Calculator,
};

export default function GeneratorForm({ subjects }: GeneratorFormProps) {
  const [generatorType, setGeneratorType] = useState<'subjectwise' | 'custom'>('subjectwise');
  const [exam, setExam] = useState<'jee' | 'neet'>('jee');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [testType, setTestType] = useState<'chapters' | 'full'>('chapters'); 
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [duration, setDuration] = useState(60);
  const [history, setHistory] = useState<MockTestHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const router = useRouter();
  const { toast } = useToast();

   useEffect(() => {
    try {
        const savedHistory = localStorage.getItem('mockTestHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    } catch (error) {
        console.error("Failed to load mock test history from localStorage", error);
    }
  }, []);

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('mockTestHistory');
    toast({
        title: "Mock Test History Cleared",
        description: "All your attempted mock tests have been deleted.",
    })
  }

  const handleReattempt = (test: MockTestHistoryItem) => {
    sessionStorage.setItem('mockTestConfig', JSON.stringify(test.config));
    router.push('/mock-test/start');
  };

  const handleReview = (test: MockTestHistoryItem) => {
    sessionStorage.setItem('testResults', JSON.stringify(test.questions));
    sessionStorage.setItem('totalTimeTaken', JSON.stringify(test.totalTime));
    sessionStorage.setItem('isReviewing', 'true');
    router.push('/mock-test/results');
  };


  const handleChapterToggle = (chapterId: number) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };
  
  const handleSelectAllChapters = (subjectId: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    const chapterIds = subject.chapters.map(c => c.id);
    const allSelectedForSubject = chapterIds.every(id => selectedChapters.includes(id));
    
    if (allSelectedForSubject) {
      setSelectedChapters(prev => prev.filter(id => !chapterIds.includes(id)));
    } else {
      setSelectedChapters(prev => [...new Set([...prev, ...chapterIds])]);
    }
  };


  const generateTest = () => {
    
    let chaptersToUse: number[] | 'all' = [];
    let testName = '';
    let questionCount = 0;

    if (generatorType === 'subjectwise') {
        if (!selectedSubject) {
            toast({ title: 'Subject Required', description: 'Please select a subject first.', variant: 'destructive' });
            return;
        }
        chaptersToUse = testType === 'chapters' ? selectedChapters : 'all';
        if (testType === 'chapters' && selectedChapters.length === 0) {
            toast({ title: 'Chapters Required', description: 'Please select at least one chapter.', variant: 'destructive' });
            return;
        }
        testName = `${selectedSubject.name} ${testType === 'chapters' ? 'Chapter-wise' : 'Full Syllabus'} Test`;
        questionCount = testType === 'chapters' ? Math.min(selectedChapters.length * 5, 20) : 30;

    } else { // Custom
        if (selectedChapters.length === 0) {
            toast({ title: 'Chapters Required', description: 'Please select at least one chapter for your custom test.', variant: 'destructive' });
            return;
        }
        chaptersToUse = selectedChapters;
        testName = 'Custom Multi-Chapter Test';
        questionCount = Math.min(selectedChapters.length * 5, 50);
    }
    
    const testConfig = {
      exam,
      subject: generatorType === 'subjectwise' ? selectedSubject?.name : 'Custom',
      type: generatorType === 'subjectwise' ? testType : 'custom',
      chapters: chaptersToUse,
      duration,
      questionCount,
      name: testName,
    };
    
    sessionStorage.setItem('mockTestConfig', JSON.stringify(testConfig));
    router.push('/mock-test/start');
  };

  const renderSubjectwiseGenerator = () => (
    <div className="space-y-8">
      {step === 1 ? (
         <div className='space-y-8'>
            <div>
                <h3 className="font-headline text-2xl font-semibold mb-4">Choose your exam</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Card 
                        className={cn("p-4 flex items-center gap-4 cursor-pointer transition-all", exam === 'jee' ? "border-primary ring-2 ring-primary" : "hover:border-primary/50")}
                        onClick={() => setExam('jee')}
                    >
                        <div className="p-2 bg-primary/20 rounded-full">
                            <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-bold text-lg">JEE Main</span>
                    </Card>
                    <Card 
                        className={cn("p-4 flex items-center gap-4 cursor-pointer transition-all", exam === 'neet' ? "border-primary ring-2 ring-primary" : "hover:border-primary/50")}
                        onClick={() => setExam('neet')}
                    >
                        <div className="p-2 bg-primary/20 rounded-full">
                            <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-bold text-lg">NEET</span>
                    </Card>
                </div>
            </div>
            <div>
                <h3 className="font-headline text-2xl font-semibold mb-4">Subject</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {subjects.map(subject => (
                        <Card key={subject.id} 
                            className={cn("p-4 flex items-center gap-4 cursor-pointer transition-all", selectedSubject?.id === subject.id ? "border-primary ring-2 ring-primary" : "hover:border-primary/50")}
                            onClick={() => {setSelectedSubject(subject); setStep(2);}}
                        >
                            {React.createElement(subjectIcons[subject.name] || FileText, { className: "h-8 w-8 text-primary"})}
                            <span className="font-bold text-lg">{subject.name}</span>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
      ) : (
        <div>
            <Button onClick={() => setStep(1)} variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4"/> Back to Subject Selection
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-3">
                        {selectedSubject && React.createElement(subjectIcons[selectedSubject.name] || FileText, { className: "h-6 w-6"})}
                        Configure {selectedSubject?.name} Test
                    </CardTitle>
                    <CardDescription>Select syllabus type and chapters for your test.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                    <RadioGroup value={testType} onValueChange={(val: 'chapters' | 'full') => setTestType(val)} className='grid grid-cols-2 gap-4'>
                        <div>
                            <RadioGroupItem value="chapters" id="chapters" className="peer sr-only" />
                            <Label htmlFor="chapters" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                Chapter-wise Test
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="full" id="full" className="peer sr-only" />
                            <Label htmlFor="full" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                Full Syllabus Test
                            </Label>
                        </div>
                    </RadioGroup>

                    {testType === 'chapters' && selectedSubject && (
                        <div>
                            <div className='flex justify-between items-center mb-2'>
                            <h4 className="font-semibold">Select Chapters:</h4>
                            <Button variant="link" size="sm" onClick={() => handleSelectAllChapters(selectedSubject.id)}>Select All</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 max-h-60 overflow-y-auto border rounded-md">
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
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                        <div className="flex items-center gap-4">
                            <Label htmlFor="duration" className="font-semibold">Test Duration (minutes):</Label>
                            <Select value={String(duration)} onValueChange={(val) => setDuration(Number(val))}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Set duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="45">45 minutes</SelectItem>
                                    <SelectItem value="60">60 minutes</SelectItem>
                                    <SelectItem value="90">90 minutes</SelectItem>
                                    <SelectItem value="120">120 minutes</SelectItem>
                                    <SelectItem value="180">180 minutes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={generateTest} size="lg" className={cn("w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300")}>
                            <Lightbulb className="mr-2 h-5 w-5" /> Generate & Start Test
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      )}
      
       {history.length > 0 && step === 1 && (
            <Card className="mt-12">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-3">
                        <History className="w-6 h-6 text-primary" />
                        Mock Test History
                    </CardTitle>
                    <CardDescription>Review your past mock tests or try them again.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {history.map(test => (
                        <div key={test.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-secondary/30">
                            <div className="mb-4 sm:mb-0">
                                <p className="font-semibold">{test.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    Attempted on {new Date(test.timestamp).toLocaleDateString()} | Score: {test.score}/{test.totalMarks} | Accuracy: {test.accuracy.toFixed(2)}%
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => handleReattempt(test)}>
                                    <Repeat className="mr-2 h-4 w-4" /> Re-attempt
                                </Button>
                                <Button onClick={() => handleReview(test)}>
                                    Review Answers
                                </Button>
                            </div>
                        </div>
                    ))}
                        <div className="flex justify-end mt-4">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    <Trash2 className="mr-2 h-4 w-4" /> Clear History
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete your entire mock test history. This action cannot be undone.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClearHistory}>Confirm Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        )}
    </div>
  );

  const renderCustomGenerator = () => (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Create a Custom Mock Test</CardTitle>
                <CardDescription>Mix and match chapters from any subject to build your own test.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
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
                                <div className='flex justify-end mb-2'>
                                    <Button variant="link" size="sm" onClick={() => handleSelectAllChapters(subject.id)}>Select All Chapters</Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 pl-2 max-h-72 overflow-y-auto">
                                    {subject.chapters.map(chapter => (
                                        <div key={chapter.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary">
                                            <Checkbox
                                                id={`custom-chapter-${chapter.id}`}
                                                checked={selectedChapters.includes(chapter.id)}
                                                onCheckedChange={() => handleChapterToggle(chapter.id)}
                                            />
                                            <Label htmlFor={`custom-chapter-${chapter.id}`} className="flex-1 cursor-pointer">{chapter.name}</Label>
                                        </div>
                                    ))}
                                </div>
                             </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="duration-custom" className="font-semibold">Test Duration (minutes):</Label>
                        <Select value={String(duration)} onValueChange={(val) => setDuration(Number(val))}>
                            <SelectTrigger id="duration-custom" className="w-[180px]">
                                <SelectValue placeholder="Set duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="45">45 minutes</SelectItem>
                                <SelectItem value="60">60 minutes</SelectItem>
                                <SelectItem value="90">90 minutes</SelectItem>
                                <SelectItem value="120">120 minutes</SelectItem>
                                <SelectItem value="180">180 minutes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={generateTest} size="lg" className={cn("w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300")}>
                        <Lightbulb className="mr-2 h-5 w-5" /> Generate & Start Custom Test
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );


  return (
    <Tabs value={generatorType} onValueChange={(v) => {
        setGeneratorType(v as 'subjectwise' | 'custom');
        setSelectedChapters([]); // Reset chapters when switching tabs
        setStep(1); // Reset step for subject-wise flow
    }} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="subjectwise">Subject-wise Test</TabsTrigger>
            <TabsTrigger value="custom">Custom Mock Test</TabsTrigger>
        </TabsList>
        <TabsContent value="subjectwise" className="mt-6">
            {renderSubjectwiseGenerator()}
        </TabsContent>
        <TabsContent value="custom" className="mt-6">
            {renderCustomGenerator()}
        </TabsContent>
    </Tabs>
  );
}
