
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
import { Lightbulb, BookCopy, FileText, Atom, FlaskConical, Calculator } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface DppGeneratorProps {
  subjects: Subject[];
}

const subjectIcons: { [key: string]: React.ElementType } = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: Calculator,
};

export default function DppGenerator({ subjects }: DppGeneratorProps) {
  const [dppType, setDppType] = useState('chapterwise');
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [customChapters, setCustomChapters] = useState<{ [key: number]: number }>({});
  const [questionCount, setQuestionCount] = useState(15);
  const [dppName, setDppName] = useState('');

  const router = useRouter();
  const { toast } = useToast();

  const handleChapterToggle = (chapterId: number) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };
  
  const handleCustomChapterChange = (chapterId: number, count: number) => {
      setCustomChapters(prev => {
          const newCounts = {...prev};
          if (count > 0) {
            newCounts[chapterId] = count;
          } else {
            delete newCounts[chapterId];
          }
          return newCounts;
      })
  }

  const generateDpp = () => {
    if (dppType === 'chapterwise' && selectedChapters.length === 0) {
       toast({
        title: 'Selection Required',
        description: 'Please select at least one chapter for the DPP.',
        variant: 'destructive',
      });
      return;
    }
    
    if (dppType === 'custom' && Object.keys(customChapters).length === 0) {
       toast({
        title: 'Selection Required',
        description: 'Please specify the number of questions for at least one chapter.',
        variant: 'destructive',
      });
      return;
    }

     toast({
        title: 'DPP Generation Not Implemented',
        description: 'This feature is for demonstration purposes only.',
      });
  };

  return (
    <div className="space-y-8">
        <Tabs value={dppType} onValueChange={setDppType}>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chapterwise">Chapter-wise DPP</TabsTrigger>
                <TabsTrigger value="custom">Custom DPP</TabsTrigger>
            </TabsList>
            <TabsContent value="chapterwise" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">Chapter-wise DPP</CardTitle>
                        <CardDescription>Select one or more chapters to generate a practice problem set.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
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
                        <div>
                             <Label htmlFor="question-count" className="font-semibold">Number of Questions per chapter:</Label>
                             <Select value={String(questionCount)} onValueChange={(val) => setQuestionCount(Number(val))}>
                                <SelectTrigger className="w-[180px] mt-2">
                                    <SelectValue placeholder="Set count" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10 Questions</SelectItem>
                                    <SelectItem value="15">15 Questions</SelectItem>
                                    <SelectItem value="20">20 Questions</SelectItem>
                                    <SelectItem value="25">25 Questions</SelectItem>
                                    <SelectItem value="30">30 Questions</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="custom" className="mt-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">Custom DPP</CardTitle>
                        <CardDescription>Create your own mix of questions from various chapters.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="dpp-name">DPP Name (Optional)</Label>
                            <Input id="dpp-name" placeholder="e.g., Weekly Revision Mix" value={dppName} onChange={(e) => setDppName(e.target.value)} />
                         </div>
                         <Accordion type="multiple" className="w-full space-y-2">
                            {subjects.map((subject) => (
                                <AccordionItem value={`custom-subject-${subject.id}`} key={subject.id} className="border rounded-md px-4">
                                <AccordionTrigger className="font-semibold hover:no-underline">
                                    <div className="flex items-center gap-3">
                                    {React.createElement(subjectIcons[subject.name] || FileText, { className: "h-5 w-5"})}
                                    <span>{subject.name}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-2">
                                    <div className="space-y-4 max-h-72 overflow-y-auto">
                                        {subject.chapters.map((chapter) => (
                                            <div key={chapter.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary">
                                                <Label htmlFor={`custom-chapter-${chapter.id}`} className="flex-1 cursor-pointer">{chapter.name}</Label>
                                                <Input 
                                                    id={`custom-chapter-${chapter.id}`}
                                                    type="number"
                                                    min="0"
                                                    placeholder="0"
                                                    className="w-24"
                                                    value={customChapters[chapter.id] || ''}
                                                    onChange={(e) => handleCustomChapterChange(chapter.id, parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
            <Button onClick={generateDpp} size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                <Lightbulb className="mr-2 h-5 w-5" /> Generate DPP
            </Button>
        </div>
    </div>
  );
}
