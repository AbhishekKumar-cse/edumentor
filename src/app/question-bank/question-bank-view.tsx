
"use client";

import { useState, useMemo } from 'react';
import type { Subject, Chapter, Question } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Flame, Atom, FlaskConical, Book, FileQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface QuestionBankProps {
  subjects: Subject[];
}

const subjectIcons: { [key: string]: React.ElementType } = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: Book,
};

const QuestionCard = ({ question, index }: { question: Question; index: number }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const getOptionClass = (option: string) => {
    if (!isSubmitted) return '';
    if (option === question.answer) return 'text-green-600 dark:text-green-400 font-bold';
    if (option === selectedOption) return 'text-red-600 dark:text-red-400 line-through';
    return '';
  };

  const difficultyVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
    Easy: 'secondary',
    Medium: 'default',
    Hard: 'destructive',
  };

  return (
    <div className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border">
       <div className="flex justify-between items-start mb-2">
            <p className="font-semibold flex-1">
                Q{index + 1}: {question.text}
            </p>
            <div className="flex items-center gap-2">
                <Badge
                    variant={difficultyVariantMap[question.difficulty]}
                    className={cn('text-xs', {
                    'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800': question.difficulty === 'Easy',
                    'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800': question.difficulty === 'Medium',
                    'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800': question.difficulty === 'Hard',
                    })}
                >
                    {question.difficulty}
                </Badge>
                {question.isPastPaper && (
                    <Badge variant="outline" className="ml-2 border-amber-500 text-amber-500 flex-shrink-0">
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
            <Label htmlFor={`${question.id}-option-${i}`} className={cn("cursor-pointer", getOptionClass(option))}>
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


export default function QuestionBankView({ subjects }: QuestionBankProps) {
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <h3 className="font-headline text-lg font-semibold mb-4">Select a Chapter</h3>
        <Accordion type="multiple" className="w-full space-y-2">
          {subjects.map((subject) => {
            const Icon = subjectIcons[subject.name] || Book;
            return (
              <AccordionItem value={subject.name} key={subject.name} className="border rounded-lg">
                <AccordionTrigger className="px-4 py-3 font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span>{subject.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col items-start p-2">
                    {subject.chapters.map(chapter => (
                        <Button
                            key={chapter.id}
                            variant="ghost"
                            className={cn("w-full justify-start", { "bg-accent text-accent-foreground": activeChapter?.id === chapter.id })}
                            onClick={() => setActiveChapter(chapter)}
                        >
                            {chapter.name}
                        </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      <div className="md:col-span-2">
        {activeChapter ? (
            <Card>
                <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center justify-between">
                    <span>{activeChapter.name}</span>
                    <Badge variant="outline">{activeChapter.questions.length} Questions</Badge>
                </CardTitle>
                <CardDescription>
                    Practice questions from the chapter: {activeChapter.name}.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                        {activeChapter.questions.map((q, i) => (
                        <QuestionCard key={q.id} question={q} index={i} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        ) : (
            <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center bg-secondary/30">
                <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="font-headline text-2xl font-semibold">Select a chapter to begin</h3>
                <p className="text-muted-foreground mt-2">
                    Choose a subject and then a chapter from the list on the left to see its questions.
                </p>
            </div>
        )}
      </div>
    </div>
  );
}
