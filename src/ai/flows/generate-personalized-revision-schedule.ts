
'use server';

/**
 * @fileOverview Generates a personalized revision calendar with spaced repetition based on user performance data.
 *
 * - generatePersonalizedRevisionSchedule - A function that generates a revision schedule.
 * - RevisionScheduleInput - The input type for the generatePersonalizedRevisionSchedule function.
 * - RevisionScheduleOutput - The return type for the generatePersonalizedRevisionSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RevisionScheduleInputSchema = z.object({
  performanceData: z
    .string()
    .describe(
      'A string containing the student performance data.  Include topics studied, scores, time spent on each topic and any notes about difficulty.'
    ),
  examDate: z
    .string()
    .describe('The date of the exam in YYYY-MM-DD format.'),
  currentDate: z
    .string()
    .describe('The current date in YYYY-MM-DD format, which will be the start date for the schedule.'),
  frequency: z.enum(['daily', 'weekly', 'monthly']).describe('The desired frequency of revision sessions.'),
});

export type RevisionScheduleInput = z.infer<typeof RevisionScheduleInputSchema>;

const ScheduleItemSchema = z.object({
    date: z.string().describe('The date for the revision session in YYYY-MM-DD format.'),
    topic: z.string().describe('The topic to be revised.'),
    task: z.string().describe('The specific task for the session (e.g., "Review Notes", "Practice Problems", "Solve Past Paper").'),
    startTime: z.string().describe('The suggested start time for the study session (e.g., "18:00").'),
    endTime: z.string().describe('The suggested end time for the study session (e.g., "20:00").'),
    durationHours: z.number().describe('The duration of the study session in hours (e.g., 2).'),
});

const RevisionScheduleOutputSchema = z.object({
  schedule: z.array(ScheduleItemSchema).describe('An array of revision sessions, ordered by date.'),
  summary: z.string().describe('A brief summary of the generated plan.')
});

export type RevisionScheduleOutput = z.infer<typeof RevisionScheduleOutputSchema>;

export async function generatePersonalizedRevisionSchedule(
  input: RevisionScheduleInput
): Promise<RevisionScheduleOutput> {
  return generatePersonalizedRevisionScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedRevisionSchedulePrompt',
  input: {schema: RevisionScheduleInputSchema},
  output: {schema: RevisionScheduleOutputSchema},
  prompt: `You are an expert study planner specializing in creating personalized revision calendars for students using the principle of spaced repetition.

  Based on the student's performance data, the current date, the exam date, and the desired frequency, create a detailed revision schedule.

  Performance Data: {{{performanceData}}}
  Current Date: {{{currentDate}}}
  Exam Date: {{{examDate}}}
  Desired Frequency: {{{frequency}}}

  The schedule should be an array of objects, each with a date, topic, a specific task, a start time, an end time, and the duration in hours.
  - Prioritize topics where the student has lower scores or has noted difficulty.
  - Use spaced repetition: schedule reviews for a topic at increasing intervals (e.g., 1 day, 3 days, 7 days, 14 days later). The density of sessions should reflect the desired frequency.
  - Include a mix of tasks: "Review Notes", "Practice Problems", "Solve Past Paper", "Concept Mapping".
  - Schedule study sessions in the evening, typically between 18:00 and 22:00.
  - Sessions should be between 1 to 2.5 hours long.
  - Ensure the schedule is realistic and spread out, leading up to the exam date.

  Finally, provide a brief summary of the plan's focus.
  `,
});

const generatePersonalizedRevisionScheduleFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRevisionScheduleFlow',
    inputSchema: RevisionScheduleInputSchema,
    outputSchema: RevisionScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
