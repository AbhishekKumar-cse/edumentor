
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { subjects, type Question } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Timer, Flag, Eye, CheckCircle, XCircle } from 'lucide-react';

interface TestQuestion extends Question {
  userAnswer?: string;
  status: 'unanswered' | 'answered' | 'review';
}

interface TestConfig {
    pattern: string;
    type: string;
    chapters: number[] | 'all';
    duration: number;
    questionCount: number;
}

export default function TestPage() {
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();

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
    if (config.type === 'full' || config.chapters === 'all') {
      subjects.forEach(subject => subject.chapters.forEach(chapter => allQuestions.push(...chapter.questions)));
    } else {
      subjects.forEach(subject => {
        subject.chapters.forEach(chapter => {
          if (config.chapters.includes(chapter.id)) {
            allQuestions.push(...chapter.questions);
          }
        });
      });
    }

    // Shuffle and slice
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, config.questionCount).map(q => ({
      ...q,
      status: 'unanswered' as 'unanswered',
    }));
    setTestQuestions(selectedQuestions);
  }, [router]);

  useEffect(() => {
    if (timeLeft <= 0 && testQuestions.length > 0) {
      submitTest();
      return;
    }
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, testQuestions.length]);

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
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitTest = () => {
    sessionStorage.setItem('testResults', JSON.stringify(testQuestions));
    sessionStorage.removeItem('mockTestConfig');
    router.replace('/mock-test/results');
  };

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

  const getStatusColor = (status: TestQuestion['status']) => {
    switch (status) {
      case 'answered': return 'bg-green-500 hover:bg-green-600';
      case 'unanswered': return 'bg-muted-foreground/50 hover:bg-muted-foreground/70';
      case 'review': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-muted-foreground/50 hover:bg-muted-foreground/70';
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col p-4 md:p-6 lg:p-8">
      {/* Header */}
      <header className="flex justify-between items-center pb-4 border-b">
        <h1 className="text-2xl font-headline font-bold text-primary">Mock Test in Progress</h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg font-semibold tabular-nums p-2">
            <Timer className="mr-2" />
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
                  <AlertDialogAction onClick={submitTest}>Confirm & Submit</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6 overflow-y-auto">
        {/* Question Area */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <p className="text-lg font-semibold">Question {currentQuestionIndex + 1} of {testQuestions.length}</p>
                <p className="mt-2 text-base">{currentQuestion.text}</p>
              </div>
              <RadioGroup
                value={currentQuestion.userAnswer}
                onValueChange={handleAnswerChange}
                className="space-y-3 my-4"
              >
                {currentQuestion.options.map((option, i) => (
                  <Label key={i} htmlFor={`${currentQuestion.id}-option-${i}`} className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-secondary has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
                    <RadioGroupItem value={option} id={`${currentQuestion.id}-option-${i}`} className="mr-3" />
                    <span>{option}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
            <div className="p-4 border-t flex justify-between items-center bg-secondary/30">
               <Button variant="outline" onClick={handleMarkForReview}>
                    <Flag className="mr-2 h-4 w-4" />
                    Mark for Review & Next
                </Button>
                <div className="flex gap-2">
                    <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</Button>
                    <Button onClick={handleNext} disabled={currentQuestionIndex === testQuestions.length - 1}>Next</Button>
                </div>
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
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </CardContent>
             <div className="p-4 space-y-2 text-sm">
                <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-green-500"></div>Answered</div>
                <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-muted-foreground/50"></div>Not Answered</div>
                <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-purple-500"></div>Marked for Review</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


