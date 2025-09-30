'use server';
/**
 * @fileOverview A flow for generating a practice question similar to one a user answered incorrectly.
 *
 * - generatePracticeQuestion - A function that generates a new practice question.
 * - GeneratePracticeQuestionInput - The input type for the generatePracticeQuestion function.
 * - GeneratePracticeQuestionOutput - The return type for the generatePracticeQuestion function.
 */

import {ai} from '@/ai/genkit';
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

export async function generatePracticeQuestion(
  input: GeneratePracticeQuestionInput
): Promise<GeneratePracticeQuestionOutput> {
  return generatePracticeQuestionFlow(input);
}

const practiceQuestionPrompt = ai.definePrompt({
  name: 'practiceQuestionPrompt',
  input: {schema: GeneratePracticeQuestionInputSchema},
  output: {schema: GeneratePracticeQuestionOutputSchema},
  prompt: `You are an expert question author for an educational platform specializing in {{topic}}. Your task is to generate a new practice question that is similar in concept and difficulty to an original question that a student answered incorrectly.

**Do not simply copy the original question.** Create a new scenario or use different values, but ensure the core concept being tested remains the same.

**Original Question Details:**
*   **Topic:** {{topic}}
*   **Difficulty:** {{difficulty}}
*   **Concepts:** {{#each concepts}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
*   **Original Question Text:** "{{{originalQuestion}}}"
*   **Correct Answer to Original:** "{{{originalAnswer}}}"

**Generated Question Requirements:**
1.  **Relevance:** The new question must test the same core concepts: {{#each concepts}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.
2.  **Difficulty:** The new question must match the original's difficulty level: **{{difficulty}}**.
3.  **Format:** Provide the output in a structured format with four multiple-choice options and clearly identify the correct answer.

**Example for a Physics Question:**
*   If the original question was about calculating projectile range with an angle of 30 degrees, the new question could be about calculating the initial velocity needed to achieve a certain range at an angle of 60 degrees.

**Example for a Chemistry Question:**
*   If the original question was about balancing a redox reaction, the new question should use different chemical species but test the same balancing principles.

Please generate one new practice question now based on the provided details.
`,
});

const generatePracticeQuestionFlow = ai.defineFlow(
  {
    name: 'generatePracticeQuestionFlow',
    inputSchema: GeneratePracticeQuestionInputSchema,
    outputSchema: GeneratePracticeQuestionOutputSchema,
  },
  async input => {
    const {output} = await practiceQuestionPrompt(input);
    return output!;
  }
);
