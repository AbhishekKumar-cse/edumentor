
'use client';

import { useState } from 'react';
import type { Subject, Chapter, Question } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Lightbulb, BookCopy, Check, X } from 'lucide-react';

interface GeneratorFormProps {
  subjects: Subject[];
}

const difficultyLevels: Question['difficulty'][] = ['Easy', 'Medium', 'Hard'];

const difficultyVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  Easy: 'secondary',
  Medium: 'default',
  Hard: 'destructive',
};

interface TestQuestion extends Question {
    userAnswer?: string;
}

export default function GeneratorForm({ subjects }: GeneratorFormProps) {
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [generatedTest, setGeneratedTest] = useState<TestQuestion[]>([]);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChapterToggle = (chapterId: number) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const generateTest = () => {
    let allQuestions: Question[] = [];
    subjects.forEach((subject) => {
      subject.chapters.forEach((chapter) => {
        if (selectedChapters.includes(chapter.id)) {
          allQuestions.push(...chapter.questions);
        }
      });
    });

    if (selectedDifficulties.length > 0) {
      allQuestions = allQuestions.filter((q) => selectedDifficulties.includes(q.difficulty));
    }

    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    setGeneratedTest(shuffled.slice(0, 10)); 
    setIsTestSubmitted(false);
    setScore(0);
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setGeneratedTest(prev => prev.map(q => q.id === questionId ? {...q, userAnswer: answer} : q));
  }

  const submitTest = () => {
    let correctAnswers = 0;
    generatedTest.forEach(q => {
        if (q.userAnswer === q.answer) {
            correctAnswers++;
        }
    });
    setScore(correctAnswers);
    setIsTestSubmitted(true);
  }

  const getOptionClass = (option: string, question: TestQuestion) => {
    if (!isTestSubmitted) return '';
    if (option === question.answer) return 'text-green-600 dark:text-green-400 font-bold';
    if (option === question.userAnswer) return 'text-red-600 dark:text-red-400 line-through';
    return '';
  };


  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <h3 className="font-headline text-lg font-semibold">Select Chapters</h3>
          <Accordion type="multiple" className="w-full">
            {subjects.map((subject) => (
              <AccordionItem value={`subject-${subject.id}`} key={subject.id}>
                <AccordionTrigger className="font-semibold">{subject.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 pl-2">
                    {subject.chapters.map((chapter) => (
                      <div key={chapter.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`chapter-${chapter.id}`}
                          checked={selectedChapters.includes(chapter.id)}
                          onCheckedChange={() => handleChapterToggle(chapter.id)}
                        />
                        <Label htmlFor={`chapter-${chapter.id}`}>{chapter.name}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="md:col-span-1 space-y-4">
          <h3 className="font-headline text-lg font-semibold">Select Difficulty</h3>
          <div className="grid gap-2">
            {difficultyLevels.map((difficulty) => (
              <div key={difficulty} className="flex items-center space-x-2">
                <Checkbox
                  id={`difficulty-${difficulty}`}
                  checked={selectedDifficulties.includes(difficulty)}
                  onCheckedChange={() => handleDifficultyToggle(difficulty)}
                />
                <Label htmlFor={`difficulty-${difficulty}`}>{difficulty}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Button onClick={generateTest} variant="default" size="lg" className="bg-accent hover:bg-accent/90">
        <Lightbulb className="mr-2 h-4 w-4" /> Generate New Test
      </Button>

      {generatedTest.length > 0 && (
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <BookCopy className="w-6 h-6 text-primary" />
                        <span className="font-headline text-2xl">Your Mock Test</span>
                    </div>
                    {isTestSubmitted && (
                        <div className="text-xl font-bold">Score: {score} / {generatedTest.length}</div>
                    )}
                </CardTitle>
              <CardDescription>
                {isTestSubmitted ? "Here are your results." : `Here are the ${generatedTest.length} questions for your test.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {generatedTest.map((question, index) => (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <p className="font-semibold">
                      Q{index + 1}: {question.text}
                    </p>
                    <RadioGroup
                        value={question.userAnswer}
                        onValueChange={(value) => handleAnswerChange(question.id, value)}
                        className="space-y-2 my-4"
                        disabled={isTestSubmitted}
                    >
                        {question.options.map((option, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${question.id}-option-${i}`} />
                            <Label htmlFor={`${question.id}-option-${i}`} className={cn("cursor-pointer", getOptionClass(option, question))}>
                            {option}
                            </Label>
                        </div>
                        ))}
                    </RadioGroup>
                     {isTestSubmitted && (
                        <div className={cn(
                            "mt-4 p-3 rounded-md text-sm flex items-center gap-2",
                            question.userAnswer === question.answer ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                        )}>
                           {question.userAnswer === question.answer ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                           Correct Answer: <strong>{question.answer}</strong>
                        </div>
                    )}
                    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
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
                      <span className='text-xs'>Ref: p.{question.pageReference}</span>
                    </div>
                  </div>
                ))}
                {!isTestSubmitted && (
                    <Button onClick={submitTest} size="lg" variant="default" className="w-full">
                        Submit Test
                    </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

