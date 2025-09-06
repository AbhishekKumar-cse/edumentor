
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
import { Lightbulb, BookCopy, FileText, Atom, FlaskConical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface GeneratorFormProps {
  subjects: Subject[];
}

const testPatterns = {
  jeeMain: { name: 'JEE Main', questions: 30, duration: 60 }, // 30 questions, 60 minutes
  jeeAdvanced: { name: 'JEE Advanced', questions: 40, duration: 90 }, // 40 questions, 90 minutes
  custom: { name: 'Custom', questions: 20, duration: 45 },
};

const subjectIcons: { [key: string]: React.ElementType } = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: BookCopy,
};

export default function GeneratorForm({ subjects }: GeneratorFormProps) {
  const [selectedPattern, setSelectedPattern] = useState('jeeMain');
  const [testType, setTestType] = useState('chapters'); // 'chapters' or 'full'
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [duration, setDuration] = useState(testPatterns.jeeMain.duration);

  const router = useRouter();
  const { toast } = useToast();

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
    const allSelected = chapterIds.every(id => selectedChapters.includes(id));
    
    if (allSelected) {
      setSelectedChapters(prev => prev.filter(id => !chapterIds.includes(id)));
    } else {
      setSelectedChapters(prev => [...new Set([...prev, ...chapterIds])]);
    }
  };

  const generateTest = () => {
    const questionCount = testPatterns[selectedPattern as keyof typeof testPatterns].questions;

    if (testType === 'chapters' && selectedChapters.length === 0) {
      toast({
        title: 'Selection Required',
        description: 'Please select at least one chapter to generate a test.',
        variant: 'destructive',
      });
      return;
    }

    const testConfig = {
      pattern: selectedPattern,
      type: testType,
      chapters: testType === 'chapters' ? selectedChapters : 'all',
      duration,
      questionCount,
    };
    
    // Store config in session storage to be picked up by the test page
    sessionStorage.setItem('mockTestConfig', JSON.stringify(testConfig));

    // Redirect to a dedicated test page
    router.push('/mock-test/start');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Step 1: Test Pattern */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline text-lg">Step 1: Choose Pattern</CardTitle>
            <CardDescription>Select the exam pattern you want to follow.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedPattern} onValueChange={setSelectedPattern}>
              <SelectTrigger>
                <SelectValue placeholder="Select a pattern" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(testPatterns).map(([key, { name }]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-4 text-sm text-muted-foreground p-3 bg-secondary/50 rounded-lg">
                <p><strong>{testPatterns[selectedPattern as keyof typeof testPatterns].name}</strong></p>
                <p>Questions: {testPatterns[selectedPattern as keyof typeof testPatterns].questions}</p>
                <p>Default Duration: {testPatterns[selectedPattern as keyof typeof testPatterns].duration} minutes</p>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Select Syllabus */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-lg">Step 2: Select Syllabus</CardTitle>
            <CardDescription>Choose between a full syllabus test or select specific chapters.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={testType} onValueChange={setTestType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chapters">Chapter-wise</TabsTrigger>
                <TabsTrigger value="full">Full Syllabus</TabsTrigger>
              </TabsList>
              <TabsContent value="chapters" className="mt-4">
                <Accordion type="multiple" className="w-full space-y-2">
                  {subjects.map((subject) => (
                    <AccordionItem value={`subject-${subject.id}`} key={subject.id} className="border rounded-md px-4">
                      <AccordionTrigger className="font-semibold hover:no-underline">
                        <div className="flex items-center gap-3">
                          {React.createElement(subjectIcons[subject.name] || FileText, { className: "h-5 w-5"})}
                          <span>{subject.name}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <Button variant="link" size="sm" onClick={() => handleSelectAllChapters(subject.id)} className="mb-2">
                            Select All {subject.name}
                        </Button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2 max-h-60 overflow-y-auto">
                          {subject.chapters.map((chapter) => (
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
                  ))}
                </Accordion>
              </TabsContent>
              <TabsContent value="full" className="mt-4">
                <div className="p-6 text-center bg-secondary rounded-lg">
                  <BookCopy className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold">Full Syllabus Test Selected</h3>
                  <p className="text-sm text-muted-foreground">
                    This will generate a test with questions from all subjects and chapters.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

       {/* Step 3: Set Timer and Generate */}
       <Card>
         <CardHeader>
            <CardTitle className="font-headline text-lg">Step 3: Finalize and Start</CardTitle>
            <CardDescription>Confirm the duration and begin your test.</CardDescription>
         </CardHeader>
         <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <Label htmlFor="duration" className="font-semibold">Test Duration (minutes):</Label>
                <Select value={String(duration)} onValueChange={(val) => setDuration(Number(val))}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Set duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="20">20 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                        <SelectItem value="120">120 minutes</SelectItem>
                        <SelectItem value="180">180 minutes</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={generateTest} size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90">
                <Lightbulb className="mr-2 h-5 w-5" /> Generate & Start Test
            </Button>
         </CardContent>
       </Card>
    </div>
  );
}
