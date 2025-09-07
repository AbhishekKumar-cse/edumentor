
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
import { subjects, Question } from '@/lib/data';


const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ResolveStudentDoubtsInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  question: z.string().describe("The student's latest question or problem."),
  context: z.string().optional().describe('Additional context or information related to the question.'),
  imageDataUri: z.string().optional().describe("An optional image of the problem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  pdfDataUri: z.string().optional().describe("An optional PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."),
});
export type ResolveStudentDoubtsInput = z.infer<typeof ResolveStudentDoubtsInputSchema>;

const ResolveStudentDoubtsOutputSchema = z.object({
  answer: z.string().describe("The AI assistant's answer to the question."),
  explanation: z.string().optional().describe('A detailed, step-by-step explanation of the concept or solution.'),
});
export type ResolveStudentDoubtsOutput = z.infer<typeof ResolveStudentDoubtsOutputSchema>;


export async function resolveStudentDoubts(input: ResolveStudentDoubtsInput): Promise<ResolveStudentDoubtsOutput> {
  return resolveStudentDoubtsFlow(input);
}

const getQuestionsFromBank = ai.defineTool(
  {
    name: 'getQuestionsFromBank',
    description: 'Searches the question bank for questions related to a specific topic or concept.',
    inputSchema: z.object({
      topic: z.string().describe('The topic or concept to search for questions on.'),
      count: z.number().optional().default(3).describe('The maximum number of questions to return.'),
    }),
    outputSchema: z.array(z.object({
        text: z.string(),
        answer: z.string(),
        difficulty: z.string(),
    })),
  },
  async ({ topic, count }) => {
    console.log(`Searching for questions on: ${topic}`);
    const related: Question[] = [];
    const lowerCaseTopic = topic.toLowerCase();
    for (const subject of subjects) {
      for (const chapter of subject.chapters) {
        for (const question of chapter.questions) {
          if (
            question.text.toLowerCase().includes(lowerCaseTopic) ||
            question.concepts.some(c => c.toLowerCase().includes(lowerCaseTopic))
          ) {
            related.push(question);
            if (related.length >= count) break;
          }
        }
        if (related.length >= count) break;
      }
      if (related.length >= count) break;
    }
    return related.map(q => ({ text: q.text, answer: q.answer, difficulty: q.difficulty }));
  }
);


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
  tools: [getCurrentWeather, searchTheWeb, getQuestionsFromBank],
  input: {schema: ResolveStudentDoubtsInputSchema.extend({ pdfContent: z.string().optional() })},
  output: {schema: ResolveStudentDoubtsOutputSchema},
  prompt: `You are an AI assistant specialized in resolving student doubts. 
  
  Your primary role is to help students with their academic questions. You are also equipped with tools to fetch real-time information like weather and current events if the user asks for it.
  
  If the user asks for example questions, a question list, or practice problems on a certain topic, use the 'getQuestionsFromBank' tool to find relevant questions from the database and present them to the user in a clear format.

  If a PDF document is provided, its content will be in the 'pdfContent' field. Prioritize answering questions based on the content of this document.
  
  If an image is provided, analyze it carefully along with the user's question.
  
  Conversation History:
  {{#each history}}
    {{role}}: {{content}}
  {{/each}}
  
  A student has asked the following question:
  Question: {{{question}}}
  {{#if pdfContent}}
  Document Context:
  ---
  {{{pdfContent}}}
  ---
  {{/if}}
  {{#if imageDataUri}}
  Problem Image: {{media url=imageDataUri}}
  {{/if}}

  Provide a detailed, step-by-step explanation to help the student understand the concept thoroughly.
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
    let pdfContent: string | undefined = undefined;
    if (input.pdfDataUri) {
        try {
            const pdf = (await import('pdf-parse')).default;
            const pdfBuffer = Buffer.from(input.pdfDataUri.split(',')[1], 'base64');
            const data = await pdf(pdfBuffer);
            pdfContent = data.text;
        } catch (e) {
            console.error("Failed to parse PDF", e);
            // Don't fail the whole flow, just proceed without PDF context.
        }
    }
    
    const {output} = await prompt({...input, pdfContent });
    return output!;
  }
);
