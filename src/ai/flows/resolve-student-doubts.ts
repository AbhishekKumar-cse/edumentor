
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

const KeyConceptSchema = z.object({
    concept: z.string().describe("The name of the key concept."),
    explanation: z.string().describe("A brief explanation of the concept."),
});

const PracticeQuestionSchema = z.object({
    question: z.string().describe("A practice question related to the content."),
    answer: z.string().describe("The correct answer to the practice question."),
});


const ResolveStudentDoubtsOutputSchema = z.object({
  answer: z.string().describe("The AI assistant's answer to the question."),
  explanation: z.string().optional().describe('A detailed, step-by-step explanation of the concept or solution.'),
  summary: z.string().optional().describe('A brief summary of the provided document, if requested.'),
  keyConcepts: z.array(KeyConceptSchema).optional().describe('A list of key concepts extracted from the document, if requested.'),
  practiceQuestions: z.array(PracticeQuestionSchema).optional().describe('A list of practice questions based on the document, if requested.'),
});
export type ResolveStudentDoubtsOutput = z.infer<typeof ResolveStudentDoubtsOutputSchema>;


export async function resolveStudentDoubts(input: ResolveStudentDoubtsInput): Promise<ResolveStudentDoubtsOutput> {
  return resolveStudentDoubtsFlow(input);
}

const getQuestionsFromBank = ai.defineTool(
  {
    name: 'getQuestionsFromBank',
    description: 'Searches the question bank for questions related to a specific academic topic or concept.',
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
    if (city.toLowerCase().includes('delhi')) {
        return {
            temperature: 38 + Math.random() * 4,
            conditions: 'Hazy sunshine',
        };
    }
    return {
      temperature: 22 + Math.random() * 10,
      conditions: 'Sunny with scattered clouds',
    };
  }
);

const searchTheWeb = ai.defineTool(
  {
    name: 'searchTheWeb',
    description: 'Searches the web for information on a given topic. Use this for questions that require up-to-date information, facts about the real world, or to verify information you are not certain about.',
    inputSchema: z.object({
      query: z.string().describe('The search query.'),
    }),
    outputSchema: z.string().describe('A summary of the search results.'),
  },
  async ({ query }) => {
    console.log(`Searching the web for: ${query}`);
    if (query.toLowerCase().includes('pm of india') || query.toLowerCase().includes('prime minister of india')) {
        return "As of my last update, the Prime Minister of India is Narendra Modi."
    }
     if (query.toLowerCase().includes('governor of rajasthan')) {
        return "As of my last update, the Governor of Rajasthan is Kalraj Mishra. Please verify with a live news source for the most current information."
    }
    return `Placeholder search results for "${query}". In a real app, this would be a live web search.`;
  }
);


const prompt = ai.definePrompt({
  name: 'resolveStudentDoubtsPrompt',
  tools: [getCurrentWeather, searchTheWeb, getQuestionsFromBank],
  system: `You are a powerful and versatile AI assistant. Your goal is to provide accurate, helpful, and comprehensive answers to any question the user asks.

  **Your Capabilities & Instructions:**

  1.  **General Knowledge & Problem Solving:** Answer direct questions on any topic. Provide step-by-step explanations for complex subjects. Your primary goal is to be a helpful and accurate source of information.

  2.  **Document Analysis (PDFs):** When a user uploads a document, its content will be provided. Prioritize answering based on this document. If the user asks for a 'summary', 'key concepts', or 'practice questions', use the document content to populate the corresponding output fields.

  3.  **Image Analysis:** If an image is provided, analyze it as part of the student's question.

  4.  **Tool Usage:** You have special tools to get real-time or specific information. Use them when needed:
      - **\`getQuestionsFromBank\`:** Use this tool if a user asks for "practice problems," "example questions," or a "question list" on an academic topic (e.g., "give me some questions on kinematics").
      - **\`getCurrentWeather\`:** Use this tool *only* if the user asks about the weather conditions in a specific city.
      - **\`searchTheWeb\`:** Use this tool for any question that requires up-to-date, real-time information or knowledge about specific people, places, or events (e.g. "Who is the CM of Rajasthan?"). If you are not sure about an answer, use this tool to verify it.

  **Formatting Instructions:**

  -   **Clarity is Key:** Present information clearly. Use bolding for headings to structure your response.
  -   **Mathematical Notation:** Use proper mathematical symbols (e.g., '×' for multiplication, superscripts for exponents like x²). Avoid using markdown like backticks (\`\`) in mathematical explanations.
  `,
  input: {schema: ResolveStudentDoubtsInputSchema },
  output: {schema: ResolveStudentDoubtsOutputSchema},
  prompt: `
  **Conversation History:**
  {{#each history}}
    {{role}}: {{content}}
  {{/each}}
  
  **Student's Request:**
  Question: {{{question}}}
  
  {{#if imageDataUri}}
  Problem Image: {{media url=imageDataUri}}
  {{/if}}

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
    let finalInput = {...input};
    if (input.pdfDataUri) {
        try {
            const pdf = (await import('pdf-parse')).default;
            const pdfBuffer = Buffer.from(input.pdfDataUri.split(',')[1], 'base64');
            const data = await pdf(pdfBuffer);
            const pdfContent = data.text;
            
            finalInput.question = 'Answer the following question based on this document:\n\n---\n' + pdfContent + '\n---\n\nQuestion: ' + input.question;

        } catch (e) {
            console.error("Failed to parse PDF", e);
        }
    }
    
    try {
        const {output} = await prompt(finalInput);
        
        if (!output) {
          return {
            answer: "I'm sorry, but I was unable to generate a response for your query. This might be due to a safety filter or an issue with the provided context. Please try rephrasing your question or simplifying the provided document."
          };
        }

        return output;
    } catch (e) {
        console.error("An unexpected error occurred while processing your request.", e);
        return {
            answer: "An unexpected error occurred while processing your request. The AI model may have had an issue with the input. Please try again."
        }
    }
  }
);
