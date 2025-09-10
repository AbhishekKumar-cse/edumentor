
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Question } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check, Flame, Lightbulb, ArrowLeft } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface DppResult {
  name: string;
  questions: Question[];
}

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

  const difficultyVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
    Easy: 'secondary',
    Medium: 'default',
    Hard: 'destructive',
  };

  return (
    <div className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border hover:border-primary/50 hover:shadow-md hover:shadow-primary/10">
       <div className="flex justify-between items-start mb-2">
            <p className="font-semibold flex-1">
                Q{index + 1}: {question.text}
            </p>
            <div className="flex items-center gap-2">
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
                {question.isPastPaper && (
                    <Badge variant="outline" className="ml-2 border-amber-500 text-amber-500 flex-shrink-0">
                        <Flame className="mr-1.5 h-3.5 w-3.5" />
                        Past Paper
                    </Badge>
                )}
            </div>
       </div>
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
        <>
            <div className={cn(
                "mt-4 p-3 rounded-md text-sm",
                selectedOption === question.answer ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
            )}>
            {selectedOption === question.answer ? "Correct!" : "Incorrect."} The correct answer is: <strong>{question.answer}</strong>
            </div>
            {question.explanation && (
                 <Accordion type="single" collapsible className="w-full mt-2">
                    <AccordionItem value="explanation">
                      <AccordionTrigger className='text-sm font-semibold text-primary hover:no-underline'>
                         <div className='flex items-center gap-2'>
                          <Lightbulb className='h-4 w-4' />
                          Show Explanation
                         </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 text-sm text-muted-foreground prose dark:prose-invert">
                          <p>{question.explanation}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
            )}
        </>
      )}
    </div>
  );
};

export default function DppViewPage() {
  const [dpp, setDpp] = useState<DppResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const dppData = sessionStorage.getItem('dppResult');
    if (dppData) {
      setDpp(JSON.parse(dppData));
    } else {
      router.replace('/dpp');
    }
  }, [router]);

  if (!dpp) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary">
        <p className="text-lg">Loading DPP...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="flex justify-between items-center">
            <div className="space-y-2">
                <h1 className="text-4xl font-headline font-bold">{dpp.name}</h1>
                <p className="text-muted-foreground">
                    Here are your generated practice problems. Good luck!
                </p>
            </div>
            <Button onClick={() => router.push('/dpp')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Generate New DPP
            </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>
                Questions ({dpp.questions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dpp.questions.length > 0 ? (
                dpp.questions.map((q, i) => (
                    <QuestionCard key={q.id} question={q} index={i} />
                ))
            ) : (
                <p className="text-muted-foreground">No questions were found for the selected criteria.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

