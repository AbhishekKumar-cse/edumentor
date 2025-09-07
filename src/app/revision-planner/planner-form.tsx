
'use client';

import { useState, useMemo } from 'react';
import { generatePersonalizedRevisionSchedule, RevisionScheduleOutput } from '@/ai/flows/generate-personalized-revision-schedule';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';

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
import { Loader2, CalendarCheck, Clock, Calendar as CalendarIcon, Hourglass } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { getISOWeek, format, parseISO } from 'date-fns';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const formSchema = z.object({
  performanceData: z.string().min(1, {
    message: 'Please provide some performance data.',
  }),
  examDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Please select a valid exam date.',
  }),
  frequency: z.enum(['daily', 'weekly', 'monthly'], {
    required_error: "You need to select a revision frequency."
  }),
});

interface ChartData {
  name: string;
  hours: number;
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
      frequency: 'weekly',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRevisionSchedule(null);
    const currentDate = new Date().toISOString().split('T')[0];

    try {
      const result = await generatePersonalizedRevisionSchedule({ ...values, currentDate });
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
      const key = `${year}-W${String(week).padStart(2, '0')}`;
      acc[key] = (acc[key] || 0) + item.durationHours;
      return acc;
    }, {});

    return Object.entries(weeklyCounts)
        .map(([key, value]) => ({ name: key, hours: value }))
        .sort((a,b) => a.name.localeCompare(b.name));

  }, [revisionSchedule]);

  const chartConfig = {
    hours: {
      label: 'Hours',
      color: 'hsl(var(--primary))',
    },
  } satisfies Parameters<typeof ChartContainer>[0]['config'];


  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-6">
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
             </div>
             <div className="space-y-6">
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
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Revision Frequency</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="daily" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Daily (Intensive)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="weekly" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Weekly (Balanced)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="monthly" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Monthly (Light)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             </div>
           </div>

          <Button type="submit" disabled={isLoading} variant="accent" size="lg">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Schedule
          </Button>
        </form>
      </Form>

      {(isLoading || revisionSchedule) && (
        <Card className="mt-8">
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
                        <h3 className="font-headline text-xl mb-4">Weekly Study Hours Overview</h3>
                         <ChartContainer config={chartConfig} className="w-full h-[250px]">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis 
                                  tickFormatter={(value) => `${value}h`}
                                />
                                <RechartsTooltip 
                                    cursor={false}
                                    content={<ChartTooltipContent />} 
                                />
                                <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl mb-4">Daily Plan</h3>
                        <div className="border rounded-md">
                           <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[120px]"><CalendarIcon className="h-4 w-4 mr-2 inline-block"/>Date</TableHead>
                                    <TableHead><Clock className="h-4 w-4 mr-2 inline-block"/>Time Slot</TableHead>
                                    <TableHead><Hourglass className="h-4 w-4 mr-2 inline-block"/>Duration</TableHead>
                                    <TableHead>Topic</TableHead>
                                    <TableHead>Task</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {revisionSchedule.schedule.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">
                                          <div className="flex items-center gap-2">
                                            <Badge variant="outline">{format(parseISO(item.date), 'EEE')}</Badge>
                                            <span>{format(parseISO(item.date), 'MMM dd')}</span>
                                          </div>
                                        </TableCell>
                                        <TableCell>{item.startTime} - {item.endTime}</TableCell>
                                        <TableCell>{item.durationHours}hr</TableCell>
                                        <TableCell>{item.topic}</TableCell>
                                        <TableCell>{item.task}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                           </Table>
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
