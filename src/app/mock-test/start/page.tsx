
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { subjects, type Question } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

interface TestSection {
    name: string;
    duration: number;
    questions: TestQuestion[];
}

interface TestConfig {
    name: string;
    questions: TestQuestion[]; // Flat list for backward compatibility and results page
    sections?: TestSection[];
    duration?: number;
    questionCount?: number;
}

export default function TestPage() {
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();
  
  const questionStartTime = useRef<number>(Date.now());
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeSection = testConfig?.sections ? testConfig.sections[currentSectionIndex] : null;
  const currentQuestion = activeSection ? activeSection.questions[currentQuestionIndex] : testQuestions[currentQuestionIndex];

  const submitTest = useCallback(() => {
    if (!testConfig) return;
    
    if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
    }
    updateQuestionTime(currentQuestionIndex); 

    let allQuestions: TestQuestion[] = [];
    if(testConfig.sections) {
      allQuestions = testConfig.sections.flatMap(s => s.questions);
    } else {
      allQuestions = testQuestions;
    }
    
    const totalTimeTaken = allQuestions.reduce((acc, q) => acc + q.timeTaken, 0);

    sessionStorage.setItem('testResults', JSON.stringify(allQuestions));
    sessionStorage.setItem('totalTimeTaken', JSON.stringify(totalTimeTaken));
    // Keep mockTestConfig in session for re-attempts from results page
    router.replace('/mock-test/results');
  }, [testConfig, testQuestions, currentQuestionIndex, router]);


  const submitSection = useCallback(() => {
    if (!testConfig || (!activeSection && testQuestions.length === 0)) return;
    
    updateQuestionTime(currentQuestionIndex); // Final update for the current question

    const questionsToReview = activeSection ? activeSection.questions : testQuestions;
    sessionStorage.setItem('testSectionResults', JSON.stringify(questionsToReview));
    sessionStorage.setItem('mockTestConfig', JSON.stringify(testConfig));
    sessionStorage.setItem('currentSectionIndex', JSON.stringify(currentSectionIndex));

    router.replace('/mock-test/review');
    
  }, [testConfig, activeSection, testQuestions, currentQuestionIndex, router]);


  useEffect(() => {
    const configStr = sessionStorage.getItem('mockTestConfig');
    if (!configStr) {
      router.replace('/mock-test');
      return;
    }
    const config: TestConfig = JSON.parse(configStr);
    
    const resumeSectionIndex = sessionStorage.getItem('resumeSectionIndex');
    const sectionIndex = resumeSectionIndex ? parseInt(resumeSectionIndex, 10) : 0;
    setCurrentSectionIndex(sectionIndex);
    sessionStorage.removeItem('resumeSectionIndex');


    if (config.sections) {
        const isResuming = config.sections[sectionIndex].questions.some(q => q.status !== 'unanswered');
        if (!isResuming) {
             const processedSections = config.sections.map(section => ({
                ...section,
                questions: section.questions.map(q => ({
                    ...q,
                    status: 'unanswered' as const,
                    timeTaken: 0,
                    userAnswer: undefined,
                }))
            }));
            config.sections = processedSections;
        }
        setTimeLeft(config.sections[sectionIndex].duration);
    } else {
       // Legacy or single-section tests
       const isResuming = (config.questions || []).some(q => q.status !== 'unanswered');
       if(!isResuming) {
           const questions = (config.questions || []).map(q => ({
             ...q,
             status: 'unanswered' as const,
             timeTaken: 0,
             userAnswer: undefined,
           }));
           config.questions = questions;
           setTestQuestions(questions);
       }
       setTimeLeft(config.duration ? config.duration * 60 : 0);
    }
    
    setTestConfig(config);
    questionStartTime.current = Date.now();
  }, [router]);
  
  useEffect(() => {
     if (timeLeft <= 0 && testConfig) {
        if (activeSection || testQuestions.length > 0) {
          submitSection();
        }
        return;
     }
     if (timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerIntervalRef.current as NodeJS.Timeout);
     }
  }, [timeLeft, submitSection, testConfig, activeSection, testQuestions]);

  const updateQuestionTime = (index: number) => {
      const timeSpent = (Date.now() - questionStartTime.current) / 1000;
      if (activeSection) {
        setTestConfig(prevConfig => {
          if (!prevConfig?.sections) return prevConfig;
          const newSections = [...prevConfig.sections];
          const newQuestions = [...newSections[currentSectionIndex].questions];
          if(newQuestions[index]) {
            newQuestions[index].timeTaken += timeSpent;
          }
          newSections[currentSectionIndex] = { ...newSections[currentSectionIndex], questions: newQuestions };
          return { ...prevConfig, sections: newSections };
        });
      } else {
        setTestQuestions(prev => {
          const newQuestions = [...prev];
          if(newQuestions[index]) {
            newQuestions[index].timeTaken += timeSpent;
          }
          return newQuestions;
        });
      }
      questionStartTime.current = Date.now();
  }

  const handleAnswerChange = (answer: string) => {
    const updateState = (prev: TestQuestion[]) => {
      const newQuestions = [...prev];
      if (newQuestions[currentQuestionIndex].status !== 'review') {
        newQuestions[currentQuestionIndex].status = 'answered';
      }
      newQuestions[currentQuestionIndex].userAnswer = answer;
      return newQuestions;
    };
    
    if (activeSection) {
        setTestConfig(prevConfig => {
            if (!prevConfig?.sections) return prevConfig;
            const newSections = [...prevConfig.sections];
            const sectionQuestions = newSections[currentSectionIndex].questions;
            const newSectionQuestions = [...sectionQuestions];
            if(newSectionQuestions[currentQuestionIndex].status !== 'review') {
                newSectionQuestions[currentQuestionIndex].status = 'answered';
            }
            newSectionQuestions[currentQuestionIndex].userAnswer = answer;
            newSections[currentSectionIndex] = {...newSections[currentSectionIndex], questions: newSectionQuestions};
            return {...prevConfig, sections: newSections};
        });
    } else {
        setTestQuestions(updateState);
    }
  };
  
  const handleMarkForReview = () => {
    const updateStatus = (status: TestQuestion['status']) => 
      status === 'review' 
        ? (currentQuestion.userAnswer ? 'answered' : 'unanswered')
        : 'review';
    
     if (activeSection) {
        setTestConfig(prevConfig => {
            if (!prevConfig?.sections) return prevConfig;
            const newSections = [...prevConfig.sections];
            const newQuestions = [...newSections[currentSectionIndex].questions];
            newQuestions[currentQuestionIndex].status = updateStatus(newQuestions[currentQuestionIndex].status);
            newSections[currentSectionIndex] = {...newSections[currentSectionIndex], questions: newQuestions};
            return {...prevConfig, sections: newSections};
        });
    } else {
      setTestQuestions(prev => {
        const newQuestions = [...prev];
        newQuestions[currentQuestionIndex].status = updateStatus(newQuestions[currentQuestionIndex].status);
        return newQuestions;
      });
    }
  }

  const handleNext = () => {
    const questions = activeSection ? activeSection.questions : testQuestions;
    if (currentQuestionIndex < questions.length - 1) {
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

  if (!testConfig || (!activeSection && testQuestions.length === 0)) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary">
        <p className="text-lg">Generating your test...</p>
      </div>
    );
  }

  const questionsForPalette = activeSection ? activeSection.questions : testQuestions;
  const answeredCount = questionsForPalette.filter(q => q.status === 'answered').length;
  const unansweredCount = questionsForPalette.filter(q => q.status === 'unanswered').length;
  const markedForReviewCount = questionsForPalette.filter(q => q.status === 'review').length;
  const progress = ((answeredCount + markedForReviewCount) / questionsForPalette.length) * 100;
  const isLastQuestionInSection = currentQuestionIndex === questionsForPalette.length - 1;

  const getStatusColor = (status: TestQuestion['status']) => {
    switch (status) {
      case 'answered': return 'bg-green-500 hover:bg-green-600';
      case 'unanswered': return 'bg-muted-foreground/50 hover:bg-muted-foreground/70';
      case 'review': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-muted-foreground/50 hover:bg-muted-foreground/70';
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <div>
            <h1 className="text-2xl font-headline font-bold text-primary">{testConfig.name}</h1>
            {activeSection && <p className="text-muted-foreground">Section: {activeSection.name} ({currentQuestionIndex + 1} / {activeSection.questions.length})</p>}
        </div>
        <div className="flex items-center gap-4">
           <Badge variant="outline" className="text-lg font-semibold tabular-nums p-2">
                <Timer className="mr-2 h-5 w-5" />
                {formatTime(timeLeft)}
            </Badge>
           <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Submit Section</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to submit this section?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your answers for this section will be evaluated for the practice round.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={submitSection}>Confirm & Submit Section</AlertDialogAction>
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
              {currentQuestion && (
                <>
                  <div className="flex justify-between items-start mb-4">
                      <p className="text-lg font-semibold flex-1">
                          Question {currentQuestionIndex + 1}: {currentQuestion.text}
                      </p>
                      <div className="flex items-center gap-2">
                            <Badge variant={currentQuestion.difficulty === 'Easy' ? 'secondary' : currentQuestion.difficulty === 'Hard' ? 'destructive' : 'default'} className="capitalize">{currentQuestion.difficulty}</Badge>
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
                </>
              )}
            </CardContent>
            <div className="p-4 border-t flex justify-between items-center bg-secondary/30">
               <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                    <ChevronsLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                 <Button variant="outline" onClick={handleMarkForReview}>
                    <Flag className="mr-2 h-4 w-4" />
                    {currentQuestion?.status === 'review' ? 'Unmark' : 'Mark for Review'}
                </Button>
                {isLastQuestionInSection ? (
                     <Button onClick={submitSection} variant="accent">
                        Submit Section
                        <CheckCircle className="ml-2 h-4 w-4" />
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
                    {activeSection && <CardDescription>Section: {activeSection.name}</CardDescription>}
                </CardHeader>
                <CardContent className="grid grid-cols-5 gap-2">
                {questionsForPalette.map((q, index) => (
                    <Button
                    key={`${currentSectionIndex}-${q.id}-${index}`}
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
                        <p className='text-sm text-muted-foreground mt-2 text-center'>{answeredCount + markedForReviewCount} of {questionsForPalette.length} questions visited</p>
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
