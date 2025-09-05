'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { tagQuestionsWithAI, type TagQuestionsWithAIOutput } from '@/ai/flows/tag-questions-with-ai';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Cpu, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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

export default function TaggingForm() {
  const [taggingResult, setTaggingResult] = useState<TagQuestionsWithAIOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <Card>
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
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Difficulty:</h4>
                  <Badge variant={difficultyVariantMap[taggingResult.difficulty]} className={cn('capitalize text-sm', {
                        'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800': taggingResult.difficulty === 'easy',
                        'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800': taggingResult.difficulty === 'medium',
                        'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800': taggingResult.difficulty === 'hard',
                  })}>
                    {taggingResult.difficulty}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Concepts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {taggingResult.concepts.map((concept, index) => (
                      <Badge key={index} variant="outline">{concept}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Past Paper Question:</h4>
                  <div className="flex items-center gap-2">
                    {taggingResult.isPastPaperQuestion ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span>{taggingResult.isPastPaperQuestion ? 'Yes' : 'No'}</span>
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
