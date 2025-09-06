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
  question: z.string().describe("The student's latest question or problem."),
  context: z.string().optional().describe('Additional context or information related to the question.'),
  imageDataUri: z.string().optional().describe("An optional image of the problem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type ResolveStudentDoubtsInput = z.infer<typeof ResolveStudentDoubtsInputSchema>;

const ResolveStudentDoubtsOutputSchema = z.object({
  answer: z.string().describe("The AI assistant's answer to the question."),
  explanation: z.string().optional().describe('A detailed explanation of the concept or solution.'),
});
export type ResolveStudentDoubtsOutput = z.infer<typeof ResolveStudentDoubtsOutputSchema>;


export async function resolveStudentDoubts(input: ResolveStudentDoubtsInput): Promise<ResolveStudentDoubtsOutput> {
  return resolveStudentDoubtsFlow(input);
}

const getCurrentWeather = ai.defineTool(
  {
    name: 'getCurrentWeather',
    description: 'Get the current weather in a given city.',
    inputSchema: z.object({
      city: z.string().describe('The city, e.g. San Francisco'),
    }),
    outputSchema: z.object({
        temperature: z.number().describe('The current temperature in Celsius.'),
        conditions: z.string().describe('A brief description of the current weather conditions.'),
    }),
  },
  async ({ city }) => {
    // In a real app, this would call a weather API.
    // For this example, we'll return mock data.
    console.log(`Fetching weather for ${city}...`);
    return {
      temperature: 22 + Math.random() * 10,
      conditions: 'Sunny with scattered clouds',
    };
  }
);


const searchTheWeb = ai.defineTool(
  {
    name: 'searchTheWeb',
    description: 'Searches the web for information on a given topic, useful for current events and up-to-date information.',
    inputSchema: z.object({
      query: z.string().describe('The search query.'),
    }),
    outputSchema: z.string().describe('A summary of the search results.'),
  },
  async ({ query }) => {
    // In a real app, this would use a search engine API.
    // For this example, we'll return a placeholder.
    console.log(`Searching the web for: ${query}`);
    if (query.toLowerCase().includes('governor of rajasthan')) {
        return "As of my last update, the Governor of Rajasthan is Kalraj Mishra. Please verify with a live news source for the most current information."
    }
    return `Placeholder search results for "${query}". In a real app, this would be a live web search.`;
  }
);


const prompt = ai.definePrompt({
  name: 'resolveStudentDoubtsPrompt',
  tools: [getCurrentWeather, searchTheWeb],
  input: {schema: ResolveStudentDoubtsInputSchema},
  output: {schema: ResolveStudentDoubtsOutputSchema},
  prompt: `You are an AI assistant specialized in resolving student doubts and providing clear, detailed explanations. 
  
  Your primary role is to help students with their academic questions. However, you are also equipped with tools to fetch real-time information like weather and current events if the user asks for it.
  
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

  Provide a concise answer first, followed by a very detailed, step-by-step explanation to help the student understand the underlying concepts thoroughly.
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
