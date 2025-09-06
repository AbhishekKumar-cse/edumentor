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

const PastPaperDetailsSchema = z.object({
  isPastPaper: z
    .boolean()
    .describe('Whether the question is from a past paper or not.'),
  year: z.string().optional().describe('The year the question appeared, if known.'),
  exam: z.string().optional().describe('The name of the exam (e.g., JEE Main, NEET), if known.'),
});

const TagQuestionsWithAIOutputSchema = z.object({
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The difficulty level of the question.'),
  concepts: z.array(z.string()).describe('A list of relevant concepts or topics covered in the question.'),
  pastPaperDetails: PastPaperDetailsSchema,
  relatedTopics: z.array(z.string()).describe("A list of related topics for further study or to understand the question's context better.")
});
export type TagQuestionsWithAIOutput = z.infer<typeof TagQuestionsWithAIOutputSchema>;

export async function tagQuestionsWithAI(input: TagQuestionsWithAIInput): Promise<TagQuestionsWithAIOutput> {
  return tagQuestionsWithAIFlow(input);
}

const tagQuestionsWithAIPrompt = ai.definePrompt({
  name: 'tagQuestionsWithAIPrompt',
  input: {schema: TagQuestionsWithAIInputSchema},
  output: {schema: TagQuestionsWithAIOutputSchema},
  prompt: `You are an expert AI assistant for educators, specializing in analyzing and tagging academic questions for competitive exams like the JEE.

  Analyze the provided question text based on the following criteria:

  1.  **Difficulty**: Classify the question's difficulty level as 'easy', 'medium', or 'hard'.
  2.  **Concepts**: Identify and list the primary concepts or topics required to answer the question.
  3.  **Past Paper Analysis**: Determine if the question is from a past paper. If it is, specify the year and the exam name (e.g., "JEE Main", "JEE Advanced"). If it is not a past paper question or if the details are unknown, indicate that.
  4.  **Related Topics**: Suggest a few related topics that a student should study to have a comprehensive understanding of the question's subject matter.

  Question: {{{questionText}}}
  `,
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
