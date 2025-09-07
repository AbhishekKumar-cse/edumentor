
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { tagQuestionsWithAI, type TagQuestionsWithAIOutput } from '@/ai/flows/tag-questions-with-ai';
import type { Question } from '@/lib/data';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Cpu, CheckCircle, XCircle, BookOpen, BrainCircuit, Sigma, MessageCircleQuestion } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  questionText: z.string().min(10, {
    message: 'Question text must be at least 10 characters.',
  }),
});

const difficultyVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  easy: 'secondary',
  medium: 'default',
  hard: 'destructive',
};

const QuestionCard = ({ question }: { question: Question }) => {
    return (
        <div className="p-4 border rounded-lg bg-secondary/30">
            <p className="font-semibold">{question.text}</p>
            <div className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-primary">Answer:</span> {question.answer}
            </div>
        </div>
    )
}

export default function TaggingForm() {
  const [taggingResult, setTaggingResult] = useState<TagQuestionsWithAIOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: '',
    },
  });
  
  const handleFormSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setTaggingResult(null);
    try {
      const result = await tagQuestionsWithAI(values);
      setTaggingResult(result);
    } catch (error) {
      console.error('Failed to tag question', error);
      toast({
        title: 'Error',
        description: 'Failed to tag the question. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      form.setValue('questionText', query);
      handleFormSubmit({ questionText: query });
    }
  }, [searchParams, form, handleFormSubmit]);



  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="questionText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Text</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter the full text of the question here..." rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} variant="accent">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Tag with AI
          </Button>
        </form>
      </Form>

      {(isLoading || taggingResult) && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">AI Analysis</span>
            </CardTitle>
            <CardDescription>Results from the AI-powered tagging process.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : taggingResult && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-muted-foreground">Difficulty</h4>
                    <Badge variant={difficultyVariantMap[taggingResult.difficulty]} className={cn('capitalize text-sm', {
                          'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800': taggingResult.difficulty === 'easy',
                          'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800': taggingResult.difficulty === 'medium',
                          'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800': taggingResult.difficulty === 'hard',
                    })}>
                      {taggingResult.difficulty}
                    </Badge>
                  </div>
                   <div>
                    <h4 className="font-semibold mb-2 text-muted-foreground">Past Paper Details</h4>
                    <div className="flex items-center gap-2">
                        {taggingResult.pastPaperDetails.isPastPaper ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <span>
                            {taggingResult.pastPaperDetails.isPastPaper 
                                ? `${taggingResult.pastPaperDetails.exam || 'Past Paper'}, ${taggingResult.pastPaperDetails.year || 'Unknown Year'}`
                                : 'Not from a known past paper'}
                        </span>
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div>
                  <h4 className="font-headline text-lg mb-4 flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    Key Concepts & Study material
                  </h4>
                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {taggingResult.concepts.map((concept, index) => (
                      <AccordionItem value={`concept-${index}`} key={index} className="border rounded-lg px-4">
                        <AccordionTrigger className="font-semibold text-base">{concept.name}</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">{concept.explanation}</p>
                          
                          {concept.formulas && concept.formulas.length > 0 && (
                            <div>
                                <h5 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground">
                                    <Sigma className="h-4 w-4" />
                                    Important Formulas
                                </h5>
                                <div className="space-y-2">
                                {concept.formulas.map((formula, fIndex) => (
                                    <div key={fIndex} className="p-3 bg-secondary/50 rounded-md text-sm">
                                        <p className="font-semibold">{formula.name}</p>
                                        <code className="block my-1 p-2 rounded bg-muted font-code text-primary">{formula.formula}</code>
                                    </div>
                                ))}
                                </div>
                            </div>
                          )}

                          {concept.relatedQuestions && concept.relatedQuestions.length > 0 && (
                             <div>
                                <h5 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground">
                                    <MessageCircleQuestion className="h-4 w-4" />
                                    Related Questions
                                </h5>
                                 <div className="space-y-2">
                                    {concept.relatedQuestions.map(q => (
                                        <QuestionCard key={q.id} question={q} />
                                    ))}
                                 </div>
                             </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>


                 <div>
                    <h4 className="font-headline text-lg mb-3 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Suggested Related Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {taggingResult.relatedTopics.map((topic, index) => (
                        <Badge key={index} variant="secondary">{topic}</Badge>
                        ))}
                    </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
