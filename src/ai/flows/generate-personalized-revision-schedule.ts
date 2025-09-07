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
  isAlternative: z.boolean().optional().describe('If true, generate a more intensive, alternative schedule.')
});

export type RevisionScheduleInput = z.infer<typeof RevisionScheduleInputSchema>;

const ScheduleItemSchema = z.object({
    date: z.string().describe('The date for the revision session in YYYY-MM-DD format.'),
    topic: z.string().describe('The topic to be revised.'),
    task: z.string().describe('The specific task for the session (e.g., "Review Notes", "Practice Problems", "Solve Past Paper").')
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

  Based on the student's performance data, the current date, and the exam date, create a revision schedule. Start the schedule from the current date.

  Performance Data: {{{performanceData}}}
  Current Date: {{{currentDate}}}
  Exam Date: {{{examDate}}}

  The schedule should be an array of objects, each with a date, topic, and a specific task.
  - Prioritize topics where the student has lower scores or has noted difficulty.
  - Use spaced repetition: schedule reviews for a topic at increasing intervals (e.g., 1 day, 3 days, 7 days, 14 days later).
  - Include a mix of tasks: "Review Notes", "Practice Problems", "Solve Past Paper", "Concept Mapping".
  - Ensure the schedule is realistic and spread out, leading up to the exam date.
  
  {{#if isAlternative}}
  Generate an alternative, more intensive schedule. This could involve more frequent reviews or multiple topics per day.
  {{/if}}

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
