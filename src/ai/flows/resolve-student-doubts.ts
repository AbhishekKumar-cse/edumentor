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

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ResolveStudentDoubtsInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  question: z.string().describe('The student\'s latest question or problem.'),
  context: z.string().optional().describe('Additional context or information related to the question.'),
  imageDataUri: z.string().optional().describe("An optional image of the problem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
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
  
  If an image is provided, analyze it carefully along with the user's question. The image might contain the problem statement, a diagram, or other relevant context.
  
  Conversation History:
  {{#each history}}
    {{role}}: {{content}}
  {{/each}}
  
  A student has asked the following question:
  Question: {{{question}}}
  {{#if imageDataUri}}
  Problem Image: {{media url=imageDataUri}}
  {{/if}}

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
