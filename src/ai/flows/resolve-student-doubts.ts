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
});
export type ResolveStudentDoubtsInput = z.infer<typeof ResolveStudentDoubtsInputSchema>;

const ResolveStudentDoubtsOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\'s answer to the question.'),
  explanation: z.string().optional().describe('A detailed explanation of the concept or solution.'),
});
export type ResolveStudentDoubtsOutput = z.infer<typeof ResolveStudentDoubtsOutputSchema>;


const getCurrentWeather = ai.defineTool(
    {
      name: 'getCurrentWeather',
      description: 'Get the current weather in a given location',
      inputSchema: z.object({
        location: z.string().describe('The city and state, e.g. San Francisco, CA'),
      }),
      outputSchema: z.object({
        temperature: z.string(),
        wind: z.string(),
        description: z.string(),
      }),
    },
    async ({location}) => {
      // This is a placeholder. In a real app, you would call a weather API.
      if (location.toLowerCase().includes('tokyo')) {
        return {temperature: '15°C', wind: '5 km/h', description: 'Cloudy'};
      } else if (location.toLowerCase().includes('san francisco')) {
        return {temperature: '20°C', wind: '10 km/h', description: 'Sunny'};
      }
      return {
        temperature: `${Math.floor(Math.random() * 10 + 20)}°C`,
        wind: `${Math.floor(Math.random() * 10 + 5)} km/h`,
        description: 'Partly cloudy',
      };
    }
);

const getLatestNews = ai.defineTool(
    {
        name: 'getLatestNews',
        description: 'Get the latest news headlines for a given topic',
        inputSchema: z.object({
            topic: z.string().describe('The topic to get news for, e.g. "space exploration"'),
        }),
        outputSchema: z.object({
            headlines: z.array(z.string()),
        }),
    },
    async ({topic}) => {
        // This is a placeholder. In a real app, you would call a news API.
        return {
            headlines: [
                `Study Finds AI Tutors Significantly Boost Test Scores in Physics`,
                `Breakthrough in Fusion Energy: Scientists Achieve Net Energy Gain`,
                `New Exoplanet Discovered with Potential for Liquid Water`,
                `Global Education Summit Focuses on AI Integration in Classrooms`,
            ],
        };
    }
);


export async function resolveStudentDoubts(input: ResolveStudentDoubtsInput): Promise<ResolveStudentDoubtsOutput> {
  return resolveStudentDoubtsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resolveStudentDoubtsPrompt',
  input: {schema: ResolveStudentDoubtsInputSchema},
  output: {schema: ResolveStudentDoubtsOutputSchema},
  tools: [getCurrentWeather, getLatestNews],
  prompt: `You are an AI assistant specialized in resolving student doubts and providing clear explanations. You have access to tools that can fetch real-time information like weather and news.

  Use your tools when the user asks for current information. Otherwise, answer their academic questions.
  
  Conversation History:
  {{#each history}}
    {{role}}: {{content}}
  {{/each}}
  
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
