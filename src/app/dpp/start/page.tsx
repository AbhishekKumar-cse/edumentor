
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Question } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, CheckCircle, Flame, Lightbulb, ChevronsRight, ChevronsLeft, Flag, Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';


interface DppQuestion extends Question {
  userAnswer?: string;
  status: 'unanswered' | 'answered' | 'review';
  timeTaken: number; // in seconds
}

interface DppResult {
  name: string;
  questions: DppQuestion[];
}

export default function DppStartPage() {
  const [dppData, setDppData] = useState<DppResult | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [originalQuestions, setOriginalQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const router = useRouter();

  const questionTimers = useRef<number[]>([]);
  const questionStartTime = useRef<number>(Date.now());
  const totalTimeTaken = useRef<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const submitDpp = useCallback(() => {
    if (!dppData) return;
    
    if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
    }
    updateQuestionTime(currentQuestionIndex); // Final update

    sessionStorage.setItem('dppSubmission', JSON.stringify(dppData.questions));
    sessionStorage.setItem('dppName', dppData.name);
    sessionStorage.setItem('dppTotalTime', JSON.stringify(totalTimeTaken.current));
    sessionStorage.removeItem('dppResult'); // Clear the initial data
    sessionStorage.removeItem('dppDuration');
    router.replace('/dpp/results');
  }, [dppData, currentQuestionIndex, router]);


  useEffect(() => {
    const configStr = sessionStorage.getItem('dppResult');
    const durationStr = sessionStorage.getItem('dppDuration');

    if (!configStr) {
      router.replace('/dpp');
      return;
    }
    const parsedData = JSON.parse(configStr);
    const duration = durationStr ? JSON.parse(durationStr) : 0;
    
    if(duration > 0) {
        setTimeLeft(duration * 60);
    }

    setOriginalQuestions(parsedData.questions);
    setDppData({
      ...parsedData,
      questions: parsedData.questions.map((q: Question) => ({
        ...q,
        status: 'unanswered',
        userAnswer: undefined, // Ensure re-attempts start fresh
        timeTaken: 0,
      })),
    });
    sessionStorage.setItem('dppOriginalQuestions', JSON.stringify(parsedData.questions));
    questionStartTime.current = Date.now();

    // Start a timer to track total time
    timerIntervalRef.current = setInterval(() => {
        totalTimeTaken.current += 1;
    }, 1000);

    return () => {
        if(timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
    }
  }, [router]);

  useEffect(() => {
     if (timeLeft === null) return;
     if (timeLeft <= 0) {
        submitDpp();
        return;
     }
     const interval = setInterval(() => {
        setTimeLeft(prev => (prev !== null ? prev - 1 : null));
     }, 1000);

     return () => clearInterval(interval);
  }, [timeLeft, submitDpp]);

  const updateQuestionTime = (index: number) => {
    const timeSpent = (Date.now() - questionStartTime.current) / 1000;
    setDppData(prev => {
        if (!prev) return null;
        const newQuestions = [...prev.questions];
        if(newQuestions[index]) {
            newQuestions[index].timeTaken += timeSpent;
        }
        return {...prev, questions: newQuestions};
    });
    questionStartTime.current = Date.now();
  }


  const handleAnswerChange = (answer: string) => {
    if (!dppData) return;
    const newQuestions = [...dppData.questions];
    if (newQuestions[currentQuestionIndex].status !== 'review') {
        newQuestions[currentQuestionIndex].status = 'answered';
    }
    newQuestions[currentQuestionIndex].userAnswer = answer;
    setDppData({ ...dppData, questions: newQuestions });
  };
  
  const handleMarkForReview = () => {
    if (!dppData) return;
    const newQuestions = [...dppData.questions];
    const currentStatus = newQuestions[currentQuestionIndex].status;

    if (currentStatus === 'review') {
        // If already marked for review, unmark it. 
        // If it has an answer, it becomes 'answered', otherwise 'unanswered'.
        newQuestions[currentQuestionIndex].status = newQuestions[currentQuestionIndex].userAnswer ? 'answered' : 'unanswered';
    } else {
        newQuestions[currentQuestionIndex].status = 'review';
    }
    setDppData({ ...dppData, questions: newQuestions });
  }

  const handleNext = () => {
    if (dppData && currentQuestionIndex < dppData.questions.length - 1) {
      updateQuestionTime(currentQuestionIndex);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      updateQuestionTime(currentQuestionIndex);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handlePaletteClick = (index: number) => {
    if(index !== currentQuestionIndex) {
        updateQuestionTime(currentQuestionIndex);
        setCurrentQuestionIndex(index);
    }
  }

  if (!dppData) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary">
        <p className="text-lg">Generating your DPP...</p>
      </div>
    );
  }

  const currentQuestion = dppData.questions[currentQuestionIndex];
  const answeredCount = dppData.questions.filter(q => q.status === 'answered').length;
  const unansweredCount = dppData.questions.filter(q => q.status === 'unanswered').length;
  const markedForReviewCount = dppData.questions.filter(q => q.status === 'review').length;
  const progress = ((answeredCount + markedForReviewCount) / dppData.questions.length) * 100;
  
  const getStatusColor = (status: DppQuestion['status']) => {
    switch (status) {
      case 'answered': return 'bg-green-500 hover:bg-green-600';
      case 'unanswered': return 'bg-muted-foreground/50 hover:bg-muted-foreground/70';
      case 'review': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-muted-foreground/50 hover:bg-muted-foreground/70';
    }
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return 'No Timer';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };


  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <div>
            <h1 className="text-2xl font-headline font-bold text-primary">{dppData.name}</h1>
            <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {dppData.questions.length}</p>
        </div>
        <div className="flex items-center gap-4">
           {timeLeft !== null && (
             <Badge variant="outline" className="text-lg font-semibold tabular-nums p-2">
                <Timer className="mr-2 h-5 w-5" />
                {formatTime(timeLeft)}
            </Badge>
           )}
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

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 overflow-y-auto">
        {/* Question Area */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-lg font-semibold flex-1">
                        Question {currentQuestionIndex + 1}: {currentQuestion.text}
                    </p>
                    <div className="flex items-center gap-2">
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
                    <ChevronsLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                 <Button variant="outline" onClick={handleMarkForReview}>
                    <Flag className="mr-2 h-4 w-4" />
                    {currentQuestion.status === 'review' ? 'Unmark' : 'Mark for Review'}
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

        {/* Side Panel */}
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-headline">Question Palette</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-5 gap-2">
                {dppData.questions.map((q, index) => (
                    <Button
                    key={q.id}
                    variant="default"
                    size="icon"
                    className={cn(
                        'h-10 w-10 text-white',
                        getStatusColor(q.status),
                        index === currentQuestionIndex && 'ring-2 ring-primary ring-offset-2'
                    )}
                    onClick={() => handlePaletteClick(index)}
                    >
                    {index + 1}
                    </Button>
                ))}
                </CardContent>
                <div className="p-4 space-y-3">
                    <div className='p-4'>
                        <Progress value={progress} className="w-full" />
                        <p className='text-sm text-muted-foreground mt-2 text-center'>{dppData.questions.length - unansweredCount} of {dppData.questions.length} questions visited</p>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-green-500"></div>{answeredCount} Answered</div>
                        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-muted-foreground/50"></div>{unansweredCount} Not Answered</div>
                        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-purple-500"></div>{markedForReviewCount} Marked for Review</div>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
