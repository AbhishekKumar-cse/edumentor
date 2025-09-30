
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Subject, Chapter, Question } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Telescope, X, Check, Filter, SortAsc } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const QuestionCard = ({ question, index }: { question: Question; index: number }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const getOptionClass = (option: string) => {
    if (!isSubmitted) return 'hover:bg-accent/50';
    if (option === question.answer) return 'bg-green-100 dark:bg-green-900/30 border-green-500';
    if (option === selectedOption) return 'bg-red-100 dark:bg-red-900/30 border-red-500';
    return '';
  };

  return (
    <div className="p-4 rounded-lg bg-secondary/50 transition-colors border">
       <div className="flex justify-between items-start mb-2">
            <p className="font-semibold flex-1 pr-4">
                Q{index + 1}: {question.text}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant={question.difficulty === 'Easy' ? 'secondary' : question.difficulty === 'Hard' ? 'destructive' : 'default'} className="capitalize">{question.difficulty}</Badge>
              {question.isPastPaper && (
                  <Badge variant="outline" className="ml-4 border-amber-500 text-amber-500 flex-shrink-0">
                      <Flame className="mr-1.5 h-3.5 w-3.5" />
                      Past Paper
                  </Badge>
              )}
            </div>
       </div>
      <RadioGroup
        value={selectedOption || undefined}
        onValueChange={setSelectedOption}
        className="space-y-2 my-4"
        disabled={isSubmitted}
      >
        {question.options.map((option, i) => (
          <div key={i} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${question.id}-option-${i}`} />
            <Label htmlFor={`${question.id}-option-${i}`} className={cn("cursor-pointer flex-1 p-3 rounded-md border transition-all", getOptionClass(option))}>
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      {!isSubmitted && (
          <Button onClick={handleSubmit} size="sm" variant="outline" disabled={!selectedOption}>
            Check Answer
          </Button>
      )}

      {isSubmitted && (
        <div className={cn(
            "mt-4 p-3 rounded-md text-sm",
            selectedOption === question.answer ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
        )}>
           {selectedOption === question.answer ? "Correct!" : "Incorrect."} The correct answer is: <strong>{question.answer}</strong>
        </div>
      )}
    </div>
  );
};


export default function QuestionBankView({ subject }: { subject: Subject }) {
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [isStarted, setIsStarted] = useState(false);
  const [openUnits, setOpenUnits] = useState<string[]>([]);

  useEffect(() => {
    // Expand the first unit by default
    if (subject?.units.length > 0) {
      setOpenUnits([subject.units[0].name]);
    }
  }, [subject]);
  
  const handleChapterToggle = (chapterId: number) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };
  
  const handleUnitToggle = (unit: any) => {
    const chapterIds = unit.chapters.map((c: Chapter) => c.id);
    const allSelected = chapterIds.every((id: number) => selectedChapters.includes(id));
    if (allSelected) {
      setSelectedChapters(prev => prev.filter(id => !chapterIds.includes(id)));
    } else {
      setSelectedChapters(prev => [...new Set([...prev, ...chapterIds])]);
    }
  };


  const filteredQuestions = useMemo(() => {
    if (selectedChapters.length === 0) return [];
    
    let questions = subject.chapters
      .filter(c => selectedChapters.includes(c.id))
      .flatMap(c => c.questions);
      
    if (difficultyFilter !== 'All') {
      questions = questions.filter(q => q.difficulty === difficultyFilter);
    }

    return questions;
  }, [selectedChapters, difficultyFilter, subject]);

  if (!subject) {
    return <p>Subject not found.</p>;
  }

  const renderSelectionScreen = () => (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{subject.name} Question Bank</CardTitle>
        <CardDescription>Select chapters to start practicing.</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Select Units/Chapters:</h4>
              <Button variant="link" size="sm" onClick={() => setOpenUnits(openUnits.length === subject.units.length ? [] : subject.units.map(u => u.name))}>
                  {openUnits.length === subject.units.length ? 'Collapse All' : 'Expand All'}
              </Button>
          </div>
          <ScrollArea className="h-96 pr-4">
            <Accordion type="multiple" value={openUnits} onValueChange={setOpenUnits} className="w-full space-y-2">
                {subject.units.map(unit => {
                    const allChaptersInUnitSelected = unit.chapters.every(c => selectedChapters.includes(c.id));

                    return (
                        <AccordionItem value={unit.name} key={unit.id} className="border rounded-lg bg-secondary/30 px-4">
                            <div className="flex items-center">
                                <Checkbox
                                    id={`unit-${unit.id}`}
                                    checked={allChaptersInUnitSelected}
                                    onCheckedChange={() => handleUnitToggle(unit)}
                                    className="mr-3"
                                />
                                <AccordionTrigger className="font-semibold hover:no-underline text-base flex-1">
                                    <div>
                                        <p>{unit.name}</p>
                                        <p className="text-sm text-muted-foreground font-normal">{unit.chapters.length} Chapters</p>
                                    </div>
                                </AccordionTrigger>
                            </div>
                            <AccordionContent className="p-2 space-y-1">
                                {unit.chapters.map(chapter => (
                                    <div key={chapter.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-background/50 pl-8">
                                        <Checkbox
                                            id={`chapter-${chapter.id}`}
                                            checked={selectedChapters.includes(chapter.id)}
                                            onCheckedChange={() => handleChapterToggle(chapter.id)}
                                        />
                                        <Label htmlFor={`chapter-${chapter.id}`} className="flex-1 cursor-pointer font-normal">{chapter.name}</Label>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
          </ScrollArea>
           <div className="flex justify-end mt-6">
              <Button onClick={() => setIsStarted(true)} disabled={selectedChapters.length === 0} size="lg">
                View {filteredQuestions.length} Questions
              </Button>
          </div>
      </CardContent>
    </Card>
  )

  const renderQuestionList = () => (
    <div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-secondary/50 rounded-lg border justify-between items-center">
            <div className='flex-1'>
               <h2 className="text-2xl font-bold font-headline">
                  {subject.chapters.filter(c => selectedChapters.includes(c.id)).map(c => c.name).join(', ')}
               </h2>
               <p className="text-muted-foreground">{filteredQuestions.length} questions found</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    <Label htmlFor="difficulty-filter" className="font-semibold shrink-0">Difficulty:</Label>
                    <Select value={difficultyFilter} onValueChange={(val: 'All' | 'Easy' | 'Medium' | 'Hard') => setDifficultyFilter(val)}>
                        <SelectTrigger id="difficulty-filter" className="w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="outline" onClick={() => setIsStarted(false)}>Back to Chapters</Button>
            </div>
        </div>
        <div className="space-y-4">
            {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q, i) => <QuestionCard key={q.id} question={q} index={i} />)
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No questions match the current filters.</p>
                </div>
            )}
        </div>
    </div>
  )
  
  return isStarted ? renderQuestionList() : renderSelectionScreen();
}
