
'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { subjects, Question } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Book, FileText, FlaskConical, Atom } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const difficultyVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  Easy: 'secondary',
  Medium: 'default',
  Hard: 'destructive',
};

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

  return (
    <div className="p-4 rounded-lg bg-background hover:bg-secondary/50 transition-colors">
      <p className="font-semibold mb-2">
        Q{index + 1}: {question.text}
      </p>
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

      <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
        <span>Page: {question.pageReference}</span>
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
      </div>
    </div>
  );
};


export default function Home() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to EduMentor AI. Select a subject to start learning.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {subjects.map((subject) => {
          const Icon = subjectIcons[subject.name] || FileText;
          return (
            <Card key={subject.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="font-headline text-2xl">{subject.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {subject.chapters.map((chapter) => (
                    <AccordionItem value={`chapter-${chapter.id}`} key={chapter.id}>
                      <AccordionTrigger className="font-headline text-lg hover:no-underline">
                        {chapter.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pl-4 border-l-2 border-primary/20">
                          {chapter.questions.map((question, index) => (
                            <QuestionCard key={question.id} question={question} index={index} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
