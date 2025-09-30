
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { subjects, type Question } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Timer, Flag, ChevronsRight, ChevronsLeft, CheckCircle, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TestQuestion extends Question {
  userAnswer?: string;
  status: 'unanswered' | 'answered' | 'review';
  timeTaken: number; // in seconds
}

interface TestConfig {
    exam: string;
    subject: string;
    type: string;
    chapters: number[] | 'all' | {id: number, count: number}[];
    duration: number;
    questionCount: number;
    name: string;
}

export default function TestPage() {
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();
  
  const questionTimers = useRef<number[]>([]);
  const questionStartTime = useRef<number>(Date.now());
  const totalTimeTaken = useRef<number>(0);

  useEffect(() => {
    const configStr = sessionStorage.getItem('mockTestConfig');
    if (!configStr) {
      router.replace('/mock-test');
      return;
    }
    const config: TestConfig = JSON.parse(configStr);
    setTestConfig(config);
    setTimeLeft(config.duration * 60);

    // Generate questions based on config
    let allQuestions: Question[] = [];
    if (config.type === 'custom') {
        const customChapters = config.chapters as {id: number, count: number}[];
        customChapters.forEach(customChapter => {
            for (const subject of subjects) {
                const chapter = subject.chapters.find(c => c.id === customChapter.id);
                if (chapter) {
                    const shuffled = chapter.questions.sort(() => 0.5 - Math.random());
                    allQuestions.push(...shuffled.slice(0, customChapter.count));
                    break; 
                }
            }
        });
    } else { // subject-wise
        const subject = subjects.find(s => s.name === config.subject);
        if (subject) {
            if (config.chapters === 'all') {
                subject.chapters.forEach(chapter => allQuestions.push(...chapter.questions));
            } else {
                const chapterIds = config.chapters as number[];
                subject.chapters.forEach(chapter => {
                    if (chapterIds.includes(chapter.id)) {
                        allQuestions.push(...chapter.questions);
                    }
                });
            }
        }
    }

    // Shuffle and slice
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, config.questionCount).map(q => ({
      ...q,
      status: 'unanswered' as 'unanswered',
      timeTaken: 0,
      userAnswer: undefined, // ensure fresh start
    }));

    setTestQuestions(selectedQuestions);
    questionTimers.current = new Array(selectedQuestions.length).fill(0);
    questionStartTime.current = Date.now();
  }, [router]);
  
  const submitTest = () => {
    updateQuestionTime(currentQuestionIndex); // Final update for the last question
    
    // Save results with time taken
    const resultsToStore = testQuestions.map(q => ({...q})); // creates a new copy to avoid state issues
    sessionStorage.setItem('testResults', JSON.stringify(resultsToStore));
    sessionStorage.setItem('totalTimeTaken', JSON.stringify(totalTimeTaken.current));
    router.replace('/mock-test/results');
  };

  useEffect(() => {
    if (timeLeft <= 0 && testQuestions.length > 0) {
      submitTest();
      return;
    }
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
        totalTimeTaken.current += 1;
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, testQuestions.length]);

  const updateQuestionTime = (index: number) => {
      const timeSpent = (Date.now() - questionStartTime.current) / 1000;
      setTestQuestions(prev => {
         const newQuestions = [...prev];
         if(newQuestions[index]) {
            newQuestions[index].timeTaken += timeSpent;
         }
         return newQuestions;
      });
      questionStartTime.current = Date.now();
  }

  const handleAnswerChange = (answer: string) => {
    setTestQuestions(prev => {
      const newQuestions = [...prev];
      newQuestions[currentQuestionIndex].userAnswer = answer;
      if (newQuestions[currentQuestionIndex].status !== 'review') {
        newQuestions[currentQuestionIndex].status = 'answered';
      }
      return newQuestions;
    });
  };
  
  const handleMarkForReview = () => {
    setTestQuestions(prev => {
      const newQuestions = [...prev];
      newQuestions[currentQuestionIndex].status = 'review';
      return newQuestions;
    });
    handleNext();
  }

  const handleNext = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
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

  if (!testConfig || testQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary">
        <p className="text-lg">Generating your test...</p>
      </div>
    );
  }

  const currentQuestion = testQuestions[currentQuestionIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const answeredCount = testQuestions.filter(q => q.status === 'answered').length;
  const unansweredCount = testQuestions.filter(q => q.status === 'unanswered').length;
  const markedForReviewCount = testQuestions.filter(q => q.status === 'review').length;
  const progress = ((answeredCount + markedForReviewCount) / testQuestions.length) * 100;

  const getStatusColor = (status: TestQuestion['status']) => {
    switch (status) {
      case 'answered': return 'bg-green-500 hover:bg-green-600';
      case 'unanswered': return 'bg-muted-foreground/50 hover:bg-muted-foreground/70';
      case 'review': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-muted-foreground/50 hover:bg-muted-foreground/70';
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <div>
            <h1 className="text-2xl font-headline font-bold text-primary">{testConfig.name}</h1>
            <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {testQuestions.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg font-semibold tabular-nums p-2">
            <Timer className="mr-2 h-5 w-5" />
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </Badge>
           <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Submit Test</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. You will be redirected to the results page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={submitTest}>Confirm & Submit</AlertDialogAction>
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
                    Mark for Review & Next
                </Button>
                {currentQuestionIndex === testQuestions.length - 1 ? (
                     <Button onClick={submitTest} variant="accent">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Submit Test
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

        {/* Question Palette */}
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-headline">Question Palette</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-5 gap-2">
                {testQuestions.map((q, index) => (
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
                        <p className='text-sm text-muted-foreground mt-2 text-center'>{testQuestions.length - unansweredCount} of {testQuestions.length} questions visited</p>
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
