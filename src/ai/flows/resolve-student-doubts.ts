// Implemented Genkit flow for AI-powered doubt resolution to assist students with their questions and conceptual understanding.

'use server';

/**
 * @fileOverview An AI assistant for resolving student doubts and answering questions.
 *
 * - resolveStudentDoubts - A function that handles the doubt resolution process.
 * - ResolveStudentDoubtsInput - The input type for the resolveStudentDoubts function.
 * - ResolveStudentDoubtsOutput - The return type for the resolveStudentDoubts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ResolveStudentDoubtsInputSchema = z.object({
  question: z.string().describe('The student\'s question or problem.'),
  context: z.string().optional().describe('Additional context or information related to the question.'),
});
export type ResolveStudentDoubtsInput = z.infer<typeof ResolveStudentDoubtsInputSchema>;

const ResolveStudentDoubtsOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\'s answer to the question.'),
  explanation: z.string().optional().describe('A detailed explanation of the concept or solution.'),
});
export type ResolveStudentDoubtsOutput = z.infer<typeof ResolveStudentDoubtsOutputSchema>;

export async function resolveStudentDoubts(input: ResolveStudentDoubtsInput): Promise<ResolveStudentDoubtsOutput> {
  return resolveStudentDoubtsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resolveStudentDoubtsPrompt',
  input: {schema: ResolveStudentDoubtsInputSchema},
  output: {schema: ResolveStudentDoubtsOutputSchema},
  prompt: `You are an AI assistant specialized in resolving student doubts and providing clear explanations.

  A student has asked the following question:
  Question: {{{question}}}

  Provide a concise answer and, if necessary, offer a detailed explanation to help the student understand the concept.
  Context: {{{context}}}
  `,
});

const resolveStudentDoubtsFlow = ai.defineFlow(
  {
    name: 'resolveStudentDoubtsFlow',
    inputSchema: ResolveStudentDoubtsInputSchema,
    outputSchema: ResolveStudentDoubtsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
