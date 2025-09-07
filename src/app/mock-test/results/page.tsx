
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Question } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check, X, Flag, BarChart, FileText, ArrowLeft, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


interface TestQuestion extends Question {
  userAnswer?: string;
  status: 'unanswered' | 'answered' | 'review';
}

const difficultyVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  Easy: 'secondary',
  Medium: 'default',
  Hard: 'destructive',
};

export default function ResultsPage() {
  const [results, setResults] = useState<TestQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [unanswered, setUnanswered] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const resultsStr = sessionStorage.getItem('testResults');
    if (!resultsStr) {
      router.replace('/mock-test');
      return;
    }
    const testResults: TestQuestion[] = JSON.parse(resultsStr);
    setResults(testResults);

    let correct = 0;
    let incorrect = 0;
    let notAttempted = 0;

    testResults.forEach(q => {
      if (!q.userAnswer) {
        notAttempted++;
      } else if (q.userAnswer === q.answer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
    setUnanswered(notAttempted);
    // JEE Main marking: +4 for correct, -1 for incorrect
    setScore(correct * 4 - incorrect * 1);
  }, [router]);

  const getOptionClass = (option: string, question: TestQuestion) => {
    if (option === question.answer) return 'bg-green-100 dark:bg-green-900/30 border-green-500';
    if (option === question.userAnswer) return 'bg-red-100 dark:bg-red-900/30 border-red-500';
    return 'border-border';
  };

  const accuracy = results.length > 0 ? ((correctAnswers / (results.length-unanswered)) * 100) : 0;
  
  if (results.length === 0) {
    return (
        <div className="flex items-center justify-center h-screen bg-secondary">
          <p className="text-lg">Loading results...</p>
        </div>
      );
  }
  
  const totalMarks = results.length * 4;

  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="flex justify-between items-center">
          <div className="space-y-2">
              <h1 className="text-4xl font-headline font-bold">Test Results & Analysis</h1>
              <p className="text-muted-foreground">
              Here's a detailed breakdown of your performance.
              </p>
          </div>
          <Button onClick={() => router.push('/mock-test')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Take Another Test
          </Button>
        </header>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BarChart className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Performance Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-4">
              <CardTitle className="text-4xl font-bold text-primary">{score} / {totalMarks}</CardTitle>
              <CardDescription>Your Score</CardDescription>
            </Card>
            <Card className="p-4">
              <CardTitle className="text-4xl font-bold text-green-500">{correctAnswers}</CardTitle>
              <CardDescription>Correct Answers</CardDescription>
            </Card>
            <Card className="p-4">
              <CardTitle className="text-4xl font-bold text-red-500">{incorrectAnswers}</CardTitle>
              <CardDescription>Incorrect Answers</CardDescription>
            </Card>
            <Card className="p-4">
              <CardTitle className="text-4xl font-bold text-muted-foreground">{unanswered}</CardTitle>
              <CardDescription>Not Answered</CardDescription>
            </Card>
             <Card className="md:col-span-2 lg:col-span-4 p-4 space-y-2">
               <div className="flex justify-between items-center">
                  <CardDescription>Accuracy</CardDescription>
                  <CardTitle className="text-2xl font-bold">{isNaN(accuracy) ? 0 : accuracy.toFixed(2)}%</CardTitle>
               </div>
               <Progress value={accuracy} />
             </Card>
          </CardContent>
        </Card>

        {/* Question by Question Review */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Question Review</span>
            </CardTitle>
            <CardDescription>
              Review each question, your answer, and the correct solution with a detailed explanation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.map((question, index) => (
              <div key={question.id} className="p-4 border rounded-lg bg-secondary/30">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-base mb-2">
                    Q{index + 1}: {question.text}
                  </p>
                  {question.status === 'review' && <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300"><Flag className="mr-1.5 h-3.5 w-3.5" />Marked for Review</Badge>}
                </div>

                <div className="space-y-2 my-4">
                  {question.options.map((option, i) => (
                    <div
                      key={i}
                      className={cn("flex items-center p-3 border rounded-md", getOptionClass(option, question))}
                    >
                      {option === question.answer && <Check className="h-5 w-5 mr-3 text-green-600" />}
                      {option !== question.answer && question.userAnswer === option && <X className="h-5 w-5 mr-3 text-red-600" />}
                      {option !== question.answer && question.userAnswer !== option && <div className="w-5 h-5 mr-3" />}
                      <span className="flex-1">{option}</span>
                    </div>
                  ))}
                </div>

                <div className={cn(
                    "mt-4 p-3 rounded-md text-sm flex items-center gap-2",
                    !question.userAnswer ? "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300"
                    : question.userAnswer === question.answer ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                )}>
                   {!question.userAnswer ? (
                      <>
                          <span>Not Answered. Correct Answer: <strong>{question.answer}</strong></span>
                      </>
                   ) : question.userAnswer === question.answer ? (
                      <>
                          <Check className="h-4 w-4" />
                          Your answer was correct.
                      </>
                   ) : (
                      <>
                          <X className="h-4 w-4" />
                          Your answer was incorrect. Correct Answer: <strong>{question.answer}</strong>
                      </>
                   )}
                </div>
                
                  <Accordion type="single" collapsible className="w-full mt-4">
                    <AccordionItem value="explanation">
                      <AccordionTrigger className='text-sm font-semibold text-primary hover:no-underline'>
                         <div className='flex items-center gap-2'>
                          <Lightbulb className='h-4 w-4' />
                          Show Explanation
                         </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 text-sm text-muted-foreground prose dark:prose-invert">
                          {question.explanation ? (
                              <p>{question.explanation}</p>
                          ) : (
                              <p>No explanation available for this question.</p>
                          )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>


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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
