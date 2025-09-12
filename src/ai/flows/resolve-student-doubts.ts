
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
    description: 'Searches the web for information on a given topic, useful for current events and up-to-date information.',
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
  system: `You are an AI assistant specialized in resolving student doubts. Your primary role is to help students with their academic questions.
  
  Your capabilities include:
  - Answering direct questions.
  - Providing step-by-step explanations. 
  - Analyzing text from uploaded documents (PDFs) and images.
  - Searching a pre-existing question bank for relevant practice problems.
  - Fetching real-time information like weather and searching the web for current events.

  **Formatting Instructions:**

  1.  **Mathematical Notation:** Use proper mathematical symbols. For example:
      - Use '×' for multiplication, not '*'.
      - Use '÷' for division, not '/'.
      - Use superscripts for exponents (e.g., x², 10⁻³), not '^'.
      - For fractions, use a horizontal bar, e.g., (a+b)/c should be written as a proper fraction if possible.
      - Do not use markdown like backticks (\`\`\`) or asterisks for bolding (**) in your mathematical explanations. Present the solution clearly and concisely.
  2.  **Clarity & Highlighting:** Present the solution clearly. Use bolding for headings (like **Explanation:** or **Initial Setup:**) to make the structure easy to follow. Do not use bullet points or asterisks for lists; just present the list items on new lines.

  **Tool Usage Instructions:**

  1.  **Standard Questions:** If the user asks a regular question, provide a clear 'answer' and, if helpful, a more detailed 'explanation'.
  2.  **Document Analysis:** 
      - If the user's question is based on an uploaded document (its content will be prepended to the question), prioritize answering based on that document.
      - If the user asks for a summary, key concepts, or practice questions from the document, populate the 'summary', 'keyConcepts', or 'practiceQuestions' fields in your output. For other questions, you can leave these fields empty.
  3.  **Image Analysis:** If an image is provided, analyze it carefully along with the user's question.
  4.  **Question Bank Tool (\`getQuestionsFromBank\`):** If the user asks for "example questions," a "question list," or "practice problems" on a certain academic topic, use this tool to find relevant questions and present them clearly in your answer.
  5.  **Web Search Tool (\`searchTheWeb\`):** Use this tool only when the user's query explicitly asks for information that is very recent, related to current events, or is unlikely to be in your general knowledge base (e.g., "Who is the current governor of Rajasthan?"). Do not use it for general academic concept explanations.
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
            
            // Prepend the PDF content to the question for the AI to process
            finalInput.question = 'Answer the following question based on this document:\\n\\n---\\n' + pdfContent + '\\n---\\n\\nQuestion: ' + input.question;

        } catch (e) {
            console.error("Failed to parse PDF", e);
            // Don't fail the whole flow, just proceed without PDF context.
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
