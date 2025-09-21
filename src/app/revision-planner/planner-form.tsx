
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
import { Loader2, CalendarCheck, Clock, Calendar as CalendarIcon, BookOpen, Brain, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { getISOWeek, format, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const timeSlots = [
    { id: 'Morning (9am-12pm)', label: 'Morning (9am - 12pm)' },
    { id: 'Afternoon (1pm-5pm)', label: 'Afternoon (1pm - 5pm)' },
    { id: 'Evening (6pm-10pm)', label: 'Evening (6pm - 10pm)' },
];

const formSchema = z.object({
  performanceData: z.string().min(10, {
    message: 'Please provide some performance data (at least 10 characters).',
  }),
  examDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Please select a valid exam date.',
  }),
  frequency: z.enum(['daily', 'weekly', 'monthly'], {
    required_error: "You need to select a revision frequency."
  }),
  preferredTimeSlots: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one time slot.",
  }),
});

interface ChartData {
  name: string;
  hours: number;
}

interface GroupedSchedule {
  [date: string]: RevisionScheduleOutput['schedule'];
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
      preferredTimeSlots: ['Evening (6pm-10pm)']
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRevisionSchedule(null);
    toast({
      title: "Generating Your Plan...",
      description: "The AI is crafting a personalized revision schedule for you. This might take a moment.",
    });
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
  
  const groupedSchedule: GroupedSchedule = useMemo(() => {
    if (!revisionSchedule?.schedule) return {};
    return revisionSchedule.schedule.reduce((acc: GroupedSchedule, item) => {
      const date = format(parseISO(item.date), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <Card className="flex-1 bg-secondary/30">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Your Performance</CardTitle>
                    <CardDescription>Enter your recent study performance. Be as detailed as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormField
                        control={form.control}
                        name="performanceData"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Textarea
                                placeholder="e.g., 'Physics - Kinematics: Scored 7/10 in a recent test, struggled with projectile motion questions. Spent 2 hours. Chemistry - Atomic Structure: Feeling confident, scored 9/10, spent 1 hour.'"
                                rows={8}
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </CardContent>
             </Card>

             <div className="space-y-6">
                <Card className="bg-secondary/30">
                     <CardHeader>
                        <CardTitle className="font-headline text-xl">Preferences</CardTitle>
                        <CardDescription>Set your schedule parameters.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
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
                                  className="grid grid-cols-3 gap-4"
                                >
                                  <FormItem>
                                    <RadioGroupItem value="daily" id="daily" className="peer sr-only" />
                                    <Label htmlFor="daily" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Daily</Label>
                                  </FormItem>
                                  <FormItem>
                                    <RadioGroupItem value="weekly" id="weekly" className="peer sr-only" />
                                    <Label htmlFor="weekly" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Weekly</Label>
                                  </FormItem>
                                   <FormItem>
                                    <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                                    <Label htmlFor="monthly" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Monthly</Label>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                            control={form.control}
                            name="preferredTimeSlots"
                            render={() => (
                                <FormItem>
                                <div className="mb-4">
                                    <FormLabel>Preferred Study Time</FormLabel>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {timeSlots.map((item) => (
                                        <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="preferredTimeSlots"
                                        render={({ field }) => {
                                            return (
                                            <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                    return checked
                                                        ? field.onChange([...(field.value || []), item.id])
                                                        : field.onChange(
                                                            field.value?.filter(
                                                            (value) => value !== item.id
                                                            )
                                                        )
                                                    }}
                                                />
                                                </FormControl>
                                                <FormLabel className="font-normal text-sm">
                                                    {item.label}
                                                </FormLabel>
                                            </FormItem>
                                            )
                                        }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </CardContent>
                </Card>
                <Button type="submit" disabled={isLoading} variant="accent" size="lg" className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CalendarCheck className="mr-2 h-5 w-5" />}
                    Generate My Personalized Plan
                </Button>
             </div>
           </div>
        </form>
      </Form>

      {(isLoading || revisionSchedule) && (
        <div className="mt-12">
            <header className="space-y-2 text-center mb-8">
                <h2 className="text-3xl font-headline font-bold">Your Personalized Revision Plan</h2>
                {isLoading ? (
                    <p className="text-muted-foreground">The AI is analyzing your data to build the optimal schedule...</p>
                ) : revisionSchedule?.summary && (
                     <p className="text-muted-foreground max-w-2xl mx-auto">{revisionSchedule.summary}</p>
                )}
            </header>
          <Card>
          <CardContent className="p-6">
            {isLoading ? (
                <div className="flex items-center justify-center p-16">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            ) : revisionSchedule && (
                <div className="space-y-10">
                    <Card className="bg-secondary/30">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary"/>
                                Weekly Study Hours Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
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
                                    <Bar dataKey="hours" fill="var(--color-hours)" radius={8} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    
                    <div>
                        <h3 className="font-headline text-2xl mb-6 text-center">Your Daily Schedule</h3>
                        <div className="space-y-6">
                           {Object.keys(groupedSchedule).map((dateStr) => (
                               <div key={dateStr} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 items-start">
                                    <div className="font-bold text-lg text-right text-primary sticky top-20">
                                        <p>{format(parseISO(dateStr), 'EEE')}</p>
                                        <p className="text-3xl">{format(parseISO(dateStr), 'dd')}</p>
                                        <p className="text-base font-medium text-muted-foreground">{format(parseISO(dateStr), 'MMM, yyyy')}</p>
                                    </div>
                                    <div className="space-y-4 border-l-2 border-border pl-6">
                                        {groupedSchedule[dateStr].map((item, index) => (
                                            <Card key={index} className="hover:shadow-md hover:border-primary/50 transition-all">
                                                <CardHeader>
                                                    <CardTitle className="font-headline text-xl flex items-center justify-between">
                                                        <span>{item.topic}</span>
                                                        <Badge variant="secondary">{item.task}</Badge>
                                                    </CardTitle>
                                                     <CardDescription className="flex items-center gap-4 pt-2">
                                                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4"/> {item.startTime} - {item.endTime}</span>
                                                        <span className="flex items-center gap-1.5"><CalendarIcon className="h-4 w-4"/> {item.durationHours}hr session</span>
                                                    </CardDescription>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </div>
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>
        </div>
      )}
    </div>
  );
}
