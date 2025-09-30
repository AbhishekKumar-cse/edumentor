
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Question } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check, X, Flag, BarChart, FileText, ArrowLeft, Lightbulb, Repeat, Clock, BrainCircuit } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { DppHistoryItem } from './../dpp-generator';


interface DPPQuestion extends Question {
  userAnswer?: string;
  status: 'unanswered' | 'answered';
  timeTaken: number;
}

const difficultyVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  Easy: 'secondary',
  Medium: 'default',
  Hard: 'destructive',
};

const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}m ${secs}s`;
}

export default function DppResultsPage() {
  const [results, setResults] = useState<DPPQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [unanswered, setUnanswered] = useState(0);
  const [dppName, setDppName] = useState('DPP Results');
  const [totalTime, setTotalTime] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const resultsStr = sessionStorage.getItem('dppSubmission');
    const nameStr = sessionStorage.getItem('dppName');
    const timeStr = sessionStorage.getItem('dppTotalTime');
    
    if (!resultsStr) {
      router.replace('/dpp');
      return;
    }
    const testResults: DPPQuestion[] = JSON.parse(resultsStr);
    setResults(testResults);
    if (nameStr) setDppName(nameStr);
    if (timeStr) setTotalTime(JSON.parse(timeStr));


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

    const currentScore = correct * 4 - incorrect * 1;

    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
    setUnanswered(notAttempted);
    setScore(currentScore);

    // Save to history only if it came from a live attempt
    const isReview = sessionStorage.getItem('dppIsReview');
    if (!isReview) {
      const originalQuestionsStr = sessionStorage.getItem('dppOriginalQuestions');
      if(originalQuestionsStr) {
        const originalQuestions = JSON.parse(originalQuestionsStr);
        const historyItem: DppHistoryItem = {
          id: Date.now().toString(),
          name: nameStr || "Unnamed DPP",
          questions: originalQuestions,
          submittedQuestions: testResults.map(q => ({...q, status: q.userAnswer ? 'answered' : 'unanswered'})),
          score: currentScore,
          totalMarks: testResults.length * 4,
          timestamp: Date.now(),
        };

        try {
          const existingHistory: DppHistoryItem[] = JSON.parse(localStorage.getItem('dppHistory') || '[]');
          const updatedHistory = [historyItem, ...existingHistory];
          localStorage.setItem('dppHistory', JSON.stringify(updatedHistory));
        } catch (error) {
          console.error("Failed to save DPP history to localStorage", error);
        }
      }
    }
    sessionStorage.removeItem('dppIsReview');
    sessionStorage.removeItem('dppOriginalQuestions');
    sessionStorage.removeItem('dppTotalTime');

  }, [router]);

  const handleReattempt = () => {
    const originalQuestionsStr = sessionStorage.getItem('dppOriginalQuestions');
     if (originalQuestionsStr) {
       sessionStorage.setItem('dppResult', JSON.stringify({ name: dppName, questions: JSON.parse(originalQuestionsStr) }));
       router.push('/dpp/start');
     } else {
        // Fallback for reviewing old tests that might not have this in session
        const history: DppHistoryItem[] = JSON.parse(localStorage.getItem('dppHistory') || '[]');
        const currentDpp = history.find(dpp => dpp.name === dppName && dpp.submittedQuestions.length === results.length);
        if(currentDpp) {
            sessionStorage.setItem('dppResult', JSON.stringify({ name: currentDpp.name, questions: currentDpp.questions }));
            router.push('/dpp/start');
        }
     }
  };


  const getOptionClass = (option: string, question: DPPQuestion) => {
    if (option === question.answer) return 'bg-green-100 dark:bg-green-900/30 border-green-500';
    if (option === question.userAnswer) return 'bg-red-100 dark:bg-red-900/30 border-red-500';
    return 'border-border';
  };

  const accuracy = results.length > 0 && (results.length - unanswered) > 0 
    ? ((correctAnswers / (results.length - unanswered)) * 100) 
    : 0;
  
  const averageTime = results.length > 0 ? totalTime / results.length : 0;

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
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
              <h1 className="text-4xl font-headline font-bold">{dppName} - Results</h1>
              <p className="text-muted-foreground">
              Here's a detailed breakdown of your performance.
              </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => router.push('/dpp')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Generate New DPP
            </Button>
             <Button variant="outline" onClick={handleReattempt}>
                <Repeat className="mr-2 h-4 w-4" /> Re-attempt
            </Button>
          </div>
        </header>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BarChart className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Performance Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-4 flex flex-col justify-center">
              <CardTitle className="text-4xl font-bold text-primary">{score} / {totalMarks}</CardTitle>
              <CardDescription>Your Score</CardDescription>
            </Card>
             <Card className="lg:col-span-2 p-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                    <p className="text-3xl font-bold text-green-500">{correctAnswers}</p>
                    <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-red-500">{incorrectAnswers}</p>
                    <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-muted-foreground">{unanswered}</p>
                    <p className="text-sm text-muted-foreground">Unanswered</p>
                </div>
             </Card>
            
             <Card className="p-4 flex flex-col justify-center">
               <CardTitle className="text-4xl font-bold">{isNaN(accuracy) ? 0 : accuracy.toFixed(2)}%</CardTitle>
               <CardDescription>Accuracy</CardDescription>
               <Progress value={accuracy} className="mt-2" />
             </Card>
             <Card className="p-4 flex flex-col justify-center">
                <CardTitle className="text-3xl font-bold">{formatTime(totalTime)}</CardTitle>
                <CardDescription>Total Time Taken</CardDescription>
              </Card>

              <Card className="p-4 flex flex-col justify-center">
                <CardTitle className="text-3xl font-bold">{formatTime(averageTime)}</CardTitle>
                <CardDescription>Avg. Time / Question</CardDescription>
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
                    <div className='flex-1'>
                        <p className="font-semibold text-base mb-2">
                            Q{index + 1}: {question.text}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
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
                             <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                <span>Time taken: {formatTime(question.timeTaken)}</span>
                            </div>
                        </div>
                    </div>
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

                <div className="mt-4 p-3 rounded-md bg-background/50">
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><BrainCircuit className="h-4 w-4 text-blue-400"/>Related Concepts</h4>
                    <div className="flex flex-wrap gap-2">
                        {question.concepts.map((concept, i) => (
                            <Badge key={i} variant="outline">{concept}</Badge>
                        ))}
                    </div>
                </div>
                
                  <Accordion type="single" collapsible className="w-full mt-2">
                    <AccordionItem value="explanation" className='bg-background/50 rounded-md border px-3'>
                      <AccordionTrigger className='text-sm font-semibold text-primary hover:no-underline py-3'>
                         <div className='flex items-center gap-2'>
                          <Lightbulb className='h-4 w-4' />
                          Show Explanation
                         </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-3 text-sm text-muted-foreground prose dark:prose-invert">
                          {question.explanation ? (
                              <p>{question.explanation}</p>
                          ) : (
                              <p>No explanation available for this question.</p>
                          )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
