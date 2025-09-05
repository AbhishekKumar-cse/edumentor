'use client';

import { useState } from 'react';
import { generatePersonalizedRevisionSchedule } from '@/ai/flows/generate-personalized-revision-schedule';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CalendarCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  performanceData: z.string().min(50, {
    message: 'Please provide detailed performance data (at least 50 characters).',
  }),
  examDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Please select a valid exam date.',
  }),
  revisionFrequency: z.enum(['daily', 'weekly', 'monthly']),
});

export default function PlannerForm() {
  const [revisionSchedule, setRevisionSchedule] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      performanceData: '',
      examDate: '',
      revisionFrequency: 'weekly',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRevisionSchedule(null);
    try {
      const result = await generatePersonalizedRevisionSchedule(values);
      setRevisionSchedule(result.revisionSchedule);
    } catch (error) {
        console.error("Failed to generate revision schedule", error);
        toast({
            title: "Error",
            description: "Failed to generate the revision schedule. Please try again.",
            variant: "destructive",
        })
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
            name="performanceData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Performance Data</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'Physics - Kinematics: 7/10, spent 2 hours, struggled with projectile motion. Chemistry - Atomic Structure: 9/10, spent 1 hour, good understanding.'"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe your performance, topics studied, scores, and any difficulties. The more detail, the better the schedule.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="examDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="revisionFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Revision Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading} variant="accent" size="lg">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Schedule
          </Button>
        </form>
      </Form>

      {(isLoading || revisionSchedule) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <CalendarCheck className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Your Revision Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md border p-4 bg-secondary/30">
                    {revisionSchedule}
                </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
