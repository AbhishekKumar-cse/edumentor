
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Question } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, CheckCircle, Flame, Lightbulb, ChevronsRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';


interface DppQuestion extends Question {
  userAnswer?: string;
  status: 'unanswered' | 'answered';
}

interface DppResult {
  name: string;
  questions: DppQuestion[];
}

export default function DppStartPage() {
  const [dppData, setDppData] = useState<DppResult | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [originalQuestions, setOriginalQuestions] = useState<Question[]>([]);
  const router = useRouter();

  useEffect(() => {
    const configStr = sessionStorage.getItem('dppResult');
    if (!configStr) {
      router.replace('/dpp');
      return;
    }
    const parsedData = JSON.parse(configStr);
    setOriginalQuestions(parsedData.questions);
    setDppData({
      ...parsedData,
      questions: parsedData.questions.map((q: Question) => ({
        ...q,
        status: 'unanswered',
        userAnswer: undefined, // Ensure re-attempts start fresh
      })),
    });
    sessionStorage.setItem('dppOriginalQuestions', JSON.stringify(parsedData.questions));
  }, [router]);

  const handleAnswerChange = (answer: string) => {
    if (!dppData) return;
    const newQuestions = [...dppData.questions];
    newQuestions[currentQuestionIndex].userAnswer = answer;
    newQuestions[currentQuestionIndex].status = 'answered';
    setDppData({ ...dppData, questions: newQuestions });
  };

  const handleNext = () => {
    if (dppData && currentQuestionIndex < dppData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitDpp = () => {
    if (!dppData) return;
    sessionStorage.setItem('dppSubmission', JSON.stringify(dppData.questions));
    sessionStorage.setItem('dppName', dppData.name);
    sessionStorage.removeItem('dppResult'); // Clear the initial data
    router.replace('/dpp/results');
  };

  if (!dppData) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary">
        <p className="text-lg">Generating your DPP...</p>
      </div>
    );
  }

  const currentQuestion = dppData.questions[currentQuestionIndex];
  const answeredQuestions = dppData.questions.filter(q => q.status === 'answered').length;
  const progress = (answeredQuestions / dppData.questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <div>
            <h1 className="text-2xl font-headline font-bold text-primary">{dppData.name}</h1>
            <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {dppData.questions.length}</p>
        </div>
        <div className="flex items-center gap-4">
           <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">End Practice</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to end the practice?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your progress will be submitted for evaluation.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={submitDpp}>Confirm & End</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </header>
       {/* Progress Bar */}
      <div className='p-4'>
        <Progress value={progress} className="w-full" />
        <p className='text-sm text-muted-foreground mt-2 text-center'>{answeredQuestions} of {dppData.questions.length} questions answered</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 overflow-y-auto">
        {/* Question Area */}
        <div className="w-full max-w-4xl flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-lg font-semibold flex-1">
                        Question {currentQuestionIndex + 1}: {currentQuestion.text}
                    </p>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant={currentQuestion.difficulty === 'Easy' ? 'secondary' : currentQuestion.difficulty === 'Hard' ? 'destructive' : 'default'}
                        >
                            {currentQuestion.difficulty}
                        </Badge>
                         {currentQuestion.isPastPaper && (
                            <Badge variant="outline" className="border-amber-500 text-amber-500">
                                <Flame className="mr-1.5 h-3.5 w-3.5" />
                                Past Paper
                            </Badge>
                        )}
                    </div>
                </div>

              <RadioGroup
                value={currentQuestion.userAnswer}
                onValueChange={handleAnswerChange}
                className="space-y-3 my-4"
              >
                {currentQuestion.options.map((option, i) => (
                  <Label key={i} htmlFor={`${currentQuestion.id}-option-${i}`} className={cn("flex items-center p-4 border rounded-md cursor-pointer hover:bg-secondary has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors", {'border-primary': currentQuestion.userAnswer === option})}>
                    <RadioGroupItem value={option} id={`${currentQuestion.id}-option-${i}`} className="mr-3" />
                    <span>{option}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
            <div className="p-4 border-t flex justify-between items-center bg-secondary/30">
                <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                {currentQuestionIndex === dppData.questions.length - 1 ? (
                     <Button onClick={submitDpp} variant="accent">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Submit DPP
                    </Button>
                ) : (
                    <Button onClick={handleNext}>
                        Next
                        <ChevronsRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
