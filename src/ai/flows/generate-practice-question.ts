
'use server';
/**
 * @fileOverview A flow for generating a practice question similar to one a user answered incorrectly.
 *
 * This file only exports the `generatePracticeQuestion` function. Types and schemas
 * are defined in `practice-question.types.ts`.
 */

import {ai} from '@/ai/genkit';
import {
  GeneratePracticeQuestionInput,
  GeneratePracticeQuestionInputSchema,
  GeneratePracticeQuestionOutput,
  GeneratePracticeQuestionOutputSchema,
} from './practice-question.types';

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
3.  **Related Topics:** Provide a list of 2-3 related topics or prerequisite concepts the student should study to better understand this question.
4.  **Format:** Provide the output in a structured format with four multiple-choice options and clearly identify the correct answer.

**Example for a Physics Question:**
*   If the original question was about calculating projectile range with an angle of 30 degrees, the new question could be about calculating the initial velocity needed to achieve a certain range at an angle of 60 degrees. The related topics might be "Projectile Motion Equations" and "Trigonometric Identities".

**Example for a Chemistry Question:**
*   If the original question was about balancing a redox reaction, the new question should use different chemical species but test the same balancing principles. The related topics might be "Oxidation States" and "Half-Reaction Method".

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
