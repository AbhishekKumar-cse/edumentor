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
  revisionFrequency: z
    .string()
    .describe(
      'How often the student wants to review the content. Can be daily, weekly or monthly'
    ),
});

export type RevisionScheduleInput = z.infer<typeof RevisionScheduleInputSchema>;

const RevisionScheduleOutputSchema = z.object({
  revisionSchedule: z
    .string()
    .describe(
      'A string containing the personalized revision calendar with spaced repetition, including topics and dates for review.'
    ),
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
  prompt: `You are an expert study planner specializing in creating personalized revision calendars for students.

  Based on the student's performance data and the exam date, create a revision schedule with spaced repetition.

  Performance Data: {{{performanceData}}}
  Exam Date: {{{examDate}}}
  Revision Frequency: {{{revisionFrequency}}}

  The revision schedule should include the topics to review and the dates for each review session. Make sure to spread out the review sessions using a spaced repetition technique so content is reviewed repeatedly over increasing intervals.  Return the revision schedule as a string.  It is important that the schedule include specific dates for the student to study and review each topic.
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
