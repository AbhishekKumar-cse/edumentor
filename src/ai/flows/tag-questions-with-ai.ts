'use server';
/**
 * @fileOverview This file implements an AI-powered question tagging flow.
 *
 * It allows educators to automatically classify question difficulty (easy, medium, hard) and tag questions with relevant concepts, including past paper identification.
 *
 * - tagQuestionsWithAI - The main function to tag questions with AI.
 * - TagQuestionsWithAIInput - The input type for the tagQuestionsWithAI function.
 * - TagQuestionsWithAIOutput - The output type for the tagQuestionsWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TagQuestionsWithAIInputSchema = z.object({
  questionText: z.string().describe('The text of the question to be tagged.'),
});
export type TagQuestionsWithAIInput = z.infer<typeof TagQuestionsWithAIInputSchema>;

const TagQuestionsWithAIOutputSchema = z.object({
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The difficulty level of the question.'),
  concepts: z.array(z.string()).describe('Relevant concepts tagged to the question.'),
  isPastPaperQuestion: z
    .boolean()
    .describe('Whether the question is from a past paper or not.'),
});
export type TagQuestionsWithAIOutput = z.infer<typeof TagQuestionsWithAIOutputSchema>;

export async function tagQuestionsWithAI(input: TagQuestionsWithAIInput): Promise<TagQuestionsWithAIOutput> {
  return tagQuestionsWithAIFlow(input);
}

const tagQuestionsWithAIPrompt = ai.definePrompt({
  name: 'tagQuestionsWithAIPrompt',
  input: {schema: TagQuestionsWithAIInputSchema},
  output: {schema: TagQuestionsWithAIOutputSchema},
  prompt: `You are an AI assistant helping educators tag questions.

  Analyze the provided question text and classify its difficulty level as easy, medium, or hard.
  Also, identify and tag relevant concepts covered in the question.
  Determine whether the question is from a past paper.

  Question: {{{questionText}}}

  Difficulty: {{difficulty}}
  Concepts: {{concepts}}
  IsPastPaperQuestion: {{isPastPaperQuestion}}`,
});

const tagQuestionsWithAIFlow = ai.defineFlow(
  {
    name: 'tagQuestionsWithAIFlow',
    inputSchema: TagQuestionsWithAIInputSchema,
    outputSchema: TagQuestionsWithAIOutputSchema,
  },
  async input => {
    const {output} = await tagQuestionsWithAIPrompt(input);
    return output!;
  }
);
