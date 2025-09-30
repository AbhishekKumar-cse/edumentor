
/**
 * @fileOverview Types and Zod schemas for the generatePracticeQuestion flow.
 *
 * This file defines the input and output structures for the AI-powered
 * practice question generation feature.
 */

import {z} from 'zod';

export const GeneratePracticeQuestionInputSchema = z.object({
  originalQuestion: z
    .string()
    .describe('The full text of the question the user answered incorrectly.'),
  originalAnswer: z
    .string()
    .describe('The correct answer to the original question.'),
  topic: z
    .string()
    .describe(
      "The primary academic topic of the question, e.g., 'Newtonian Kinematics'."
    ),
  difficulty: z
    .enum(['Easy', 'Medium', 'Hard'])
    .describe('The difficulty level of the original question.'),
  concepts: z
    .array(z.string())
    .describe(
      'A list of specific concepts or formulas covered in the question.'
    ),
});
export type GeneratePracticeQuestionInput = z.infer<
  typeof GeneratePracticeQuestionInputSchema
>;

export const GeneratePracticeQuestionOutputSchema = z.object({
  text: z.string().describe('The text of the newly generated question.'),
  options: z
    .array(z.string())
    .length(4)
    .describe('A list of four multiple-choice options.'),
  answer: z.string().describe('The correct answer to the new question.'),
});
export type GeneratePracticeQuestionOutput = z.infer<
  typeof GeneratePracticeQuestionOutputSchema
>;
