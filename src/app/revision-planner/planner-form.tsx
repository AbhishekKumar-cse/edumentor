'use client';

import { useState, useMemo } from 'react';
import { generatePersonalizedRevisionSchedule, RevisionScheduleOutput } from '@/ai/flows/generate-personalized-revision-schedule';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, CalendarCheck, Lightbulb, ChevronsRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { getISOWeek, format, parseISO } from 'date-fns';

const formSchema = z.object({
  performanceData: z.string().min(50, {
    message: 'Please provide detailed performance data (at least 50 characters).',
  }),
  examDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Please select a valid exam date.',
  }),
});

interface ChartData {
  name: string;
  sessions: number;
}

export default function PlannerForm() {
  const [revisionSchedule, setRevisionSchedule] = useState<RevisionScheduleOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      performanceData: '',
      examDate: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, isAlternative = false) {
    setIsLoading(true);
    setRevisionSchedule(null);
    const currentDate = new Date().toISOString().split('T')[0];

    try {
      const result = await generatePersonalizedRevisionSchedule({ ...values, currentDate, isAlternative });
      setRevisionSchedule(result);
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

  const chartData: ChartData[] = useMemo(() => {
    if (!revisionSchedule?.schedule) return [];
    
    const weeklyCounts = revisionSchedule.schedule.reduce((acc: { [key: string]: number }, item) => {
      const date = parseISO(item.date);
      const week = getISOWeek(date);
      const year = date.getFullYear();
      const key = `${year}-W${week}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(weeklyCounts)
        .map(([key, value]) => ({ name: key, sessions: value }))
        .sort((a,b) => a.name.localeCompare(b.name));

  }, [revisionSchedule]);

  const chartConfig = {
    sessions: {
      label: 'Sessions',
      color: 'hsl(var(--primary))',
    },
  } satisfies Parameters<typeof ChartContainer>[0]['config'];


  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => onSubmit(values, false))} className="space-y-6">
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
                  <FormLabel>Target Exam Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} min={new Date().toISOString().split('T')[0]}/>
                  </FormControl>
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
            {revisionSchedule?.summary && (
              <CardDescription>{revisionSchedule.summary}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : revisionSchedule && (
                <div className="space-y-8">
                    <div>
                        <h3 className="font-headline text-xl mb-4">Weekly Sessions Overview</h3>
                        <div className="h-[250px]">
                           <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    />
                                    <YAxis />
                                    <RechartsTooltip 
                                        cursor={false}
                                        content={<ChartTooltipContent />} 
                                    />
                                    <Bar dataKey="sessions" fill="var(--color-sessions)" radius={4} />
                                </BarChart>
                           </ResponsiveContainer>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl mb-4">Daily Plan</h3>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto p-2 border rounded-md">
                            {revisionSchedule.schedule.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="font-bold text-lg text-primary">{format(parseISO(item.date), 'dd')}</div>
                                        <div className="text-xs text-muted-foreground uppercase">{format(parseISO(item.date), 'MMM')}</div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.topic}</p>
                                        <p className="text-sm text-muted-foreground">{item.task}</p>
                                    </div>
                                    <Badge variant="outline">{format(parseISO(item.date), 'EEE')}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center pt-4">
                        <Button
                            variant="link"
                            onClick={() => onSubmit(form.getValues(), true)}
                            disabled={isLoading}
                        >
                            <Lightbulb className="mr-2 h-4 w-4" />
                            Need a different approach? Get an alternative, more intensive plan.
                            <ChevronsRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
