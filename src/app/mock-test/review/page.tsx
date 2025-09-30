
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import type { Question } from '@/lib/data';
import { generatePracticeQuestion } from '@/ai/flows/generate-practice-question';
import type { GeneratePracticeQuestionOutput } from '@/ai/flows/practice-question.types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check, X, Repeat, ChevronsRight, Loader2, Wand2, Lightbulb, BookOpen } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SubmittedQuestion extends Question {
  userAnswer?: string;
  status: 'unanswered' | 'answered' | 'review';
  timeTaken: number;
}

interface PracticeItem {
    originalQuestion: SubmittedQuestion;
    alternativeQuestion: GeneratePracticeQuestionOutput | null;
    isAlternativeCorrect: boolean;
    userAnswerAlternative?: string;
    isLoading: boolean;
}

function ReviewPageComponent() {
  const [practiceItems, setPracticeItems] = useState<PracticeItem[]>([]);
  const [testConfig, setTestConfig] = useState<any>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const resultsStr = sessionStorage.getItem('testSectionResults');
    const configStr = sessionStorage.getItem('mockTestConfig');
    const sectionIndexStr = sessionStorage.getItem('currentSectionIndex');
    
    if (!resultsStr || !configStr || !sectionIndexStr) {
      router.replace('/mock-test');
      return;
    }

    const sectionResults: SubmittedQuestion[] = JSON.parse(resultsStr);
    const config = JSON.parse(configStr);
    const sectionIndex = JSON.parse(sectionIndexStr);

    setTestConfig(config);
    setCurrentSectionIndex(sectionIndex);
    
    const incorrectQuestions = sectionResults.filter(q => q.userAnswer !== q.answer);

    if (incorrectQuestions.length === 0) {
      // If no incorrect answers, proceed to the next section or results immediately
      proceedToNextStep(sectionIndex, config);
      return;
    }

    const initialPracticeItems: PracticeItem[] = incorrectQuestions.map(q => ({
        originalQuestion: q,
        alternativeQuestion: null,
        isAlternativeCorrect: false,
        userAnswerAlternative: undefined,
        isLoading: true,
    }));
    
    setPracticeItems(initialPracticeItems);

    // Generate alternative questions for each incorrect answer
    incorrectQuestions.forEach((q, index) => {
      generatePracticeQuestion({
        originalQuestion: q.text,
        originalAnswer: q.answer,
        topic: q.concepts[0] || 'General',
        difficulty: q.difficulty,
        concepts: q.concepts,
      }).then(altQ => {
        setPracticeItems(prev => {
            const newItems = [...prev];
            if (newItems[index]) {
                newItems[index].alternativeQuestion = altQ;
                newItems[index].isLoading = false;
            }
            return newItems;
        });
      });
    });

  }, [router]);

  const handleAnswerChange = (itemIndex: number, answer: string) => {
    setPracticeItems(prev => {
      const newItems = [...prev];
      const item = newItems[itemIndex];
      item.userAnswerAlternative = answer;
      if(item.alternativeQuestion) {
        item.isAlternativeCorrect = answer === item.alternativeQuestion.answer;
      }
      return newItems;
    });
  };
  
  const proceedToNextStep = (sectionIndex: number, config: any) => {
    const isLastSection = sectionIndex >= (config.sections?.length - 1);

    if (isLastSection) {
      // Submit the whole test for final results
      const allQuestions = config.sections.flatMap((s: any) => s.questions);
      const totalTimeTaken = allQuestions.reduce((acc: number, q: any) => acc + q.timeTaken, 0);
      sessionStorage.setItem('testResults', JSON.stringify(allQuestions));
      sessionStorage.setItem('totalTimeTaken', JSON.stringify(totalTimeTaken));
      router.push('/mock-test/results');

    } else {
      // Proceed to the next section
      const nextSectionIndex = sectionIndex + 1;
      sessionStorage.setItem('resumeSectionIndex', nextSectionIndex.toString());
      sessionStorage.removeItem('testSectionResults'); // Clean up
      router.push('/mock-test/start');
    }
  };

  const allCorrect = practiceItems.length > 0 && practiceItems.every(item => item.isAlternativeCorrect);
  
  const getOriginalOptionClass = (option: string, question: SubmittedQuestion) => {
    if (option === question.answer) return 'bg-green-500/30 border-green-500 text-white';
    if (option === question.userAnswer) return 'bg-red-500/30 border-red-500 text-white line-through';
    return 'border-white/20';
  };

  if (practiceItems.length === 0) {
    return <div className="flex items-center justify-center h-screen bg-background"><Loader2 className="h-8 w-8 animate-spin" /> <p className="ml-4 text-lg">Loading review...</p></div>;
  }

  return (
    <div className="p-6 md:p-10 bg-gray-900 text-white min-h-screen">
      <div className="space-y-8 max-w-4xl mx-auto">
        <header className="space-y-2 text-center">
            <h1 className="text-4xl font-headline font-bold">Practice & Review</h1>
            <p className="text-muted-foreground md:text-xl">
                Review your mistakes and attempt a similar question generated by AI to master the concept.
            </p>
        </header>

        <div className="space-y-8">
            {practiceItems.map((item, index) => (
                <Card key={item.originalQuestion.id} className="bg-secondary/30 border-white/20">
                    <CardHeader>
                        <CardTitle>Review Question {index + 1}</CardTitle>
                        <CardDescription>You answered this question incorrectly. Review the correct solution and related topics, then attempt the AI-generated practice question.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Original Question - Read-only */}
                        <div>
                            <p className="font-semibold text-base mb-2">Original Question: {item.originalQuestion.text}</p>
                             <div className="space-y-2 my-4">
                                {item.originalQuestion.options.map((option, i) => (
                                    <div key={`orig-${i}`} className={cn("flex items-center p-3 border rounded-md transition-all", getOriginalOptionClass(option, item.originalQuestion))}>
                                        {option === item.originalQuestion.answer && <Check className="h-5 w-5 mr-3 text-green-400" />}
                                        {option === item.originalQuestion.userAnswer && <X className="h-5 w-5 mr-3 text-red-400" />}
                                        {option !== item.originalQuestion.answer && option !== item.originalQuestion.userAnswer && <div className="w-5 mr-3" />}
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2 p-3 rounded-md bg-blue-500/20 text-blue-200 border border-blue-500/50 flex items-center gap-2">
                                <Lightbulb className="h-5 w-5" />
                                <span>Your Answer: <strong>{item.originalQuestion.userAnswer || "Not Answered"}</strong>. Correct Answer: <strong>{item.originalQuestion.answer}</strong></span>
                            </div>
                        </div>

                         {item.isLoading ? (
                            <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin"/> Generating practice question and topics...</div>
                        ) : item.alternativeQuestion && (
                        <>
                            <div className="border-t border-white/10 pt-6">
                                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2"><BookOpen className="text-primary"/>Related Topics to Study</h4>
                                <div className="flex flex-wrap gap-2">
                                    {item.alternativeQuestion.relatedTopics.map((topic, topicIndex) => (
                                        <Badge key={topicIndex} variant="outline" className="text-sm">{topic}</Badge>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="border-t border-white/10 pt-6">
                                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2"><Wand2 className="text-primary"/> AI-Generated Practice Question</h4>
                                <div>
                                    <p className="font-semibold text-base mb-2">{item.alternativeQuestion.text}</p>
                                    <RadioGroup
                                        value={item.userAnswerAlternative}
                                        onValueChange={(val) => handleAnswerChange(index, val)}
                                        className="space-y-2 my-4"
                                        disabled={item.isAlternativeCorrect}
                                    >
                                        {item.alternativeQuestion.options.map((option, i) => (
                                        <Label key={`alt-${i}`} htmlFor={`alt-${item.originalQuestion.id}-${i}`} className={cn("flex items-center p-3 border rounded-md transition-all", item.userAnswerAlternative ? (option === item.alternativeQuestion!.answer ? 'bg-green-500/30 border-green-500' : (option === item.userAnswerAlternative ? 'bg-red-500/30 border-red-500' : 'border-white/20')) : 'cursor-pointer hover:bg-white/10 border-white/20')}>
                                            <RadioGroupItem value={option} id={`alt-${item.originalQuestion.id}-${i}`} className="mr-3" />
                                            <span>{option}</span>
                                            {item.isAlternativeCorrect && option === item.alternativeQuestion.answer && <Check className="ml-auto h-5 w-5 text-green-400" />}
                                        </Label>
                                        ))}
                                    </RadioGroup>
                                    {item.userAnswerAlternative && (
                                        item.isAlternativeCorrect ? 
                                        <Badge className="bg-green-500/20 text-green-300 border-green-500">Correct!</Badge>
                                        : <Badge variant="destructive">Incorrect. The correct answer is {item.alternativeQuestion.answer}.</Badge>
                                    )}
                                </div>
                            </div>
                        </>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>

        <footer className="text-center mt-8">
            <Button onClick={() => proceedToNextStep(currentSectionIndex, testConfig)} disabled={!allCorrect} size="lg">
                {allCorrect ? 'Proceed to Next Section' : 'Answer All Practice Questions Correctly to Proceed'}
                <ChevronsRight className="ml-2 h-5 w-5" />
            </Button>
        </footer>

      </div>
    </div>
  );
}


export default function ReviewPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewPageComponent />
      </Suspense>
    )
  }
