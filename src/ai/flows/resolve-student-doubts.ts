
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
  summary: z.string().describe('A brief summary of the provided document or the solution.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional().describe('The estimated difficulty of the question.'),
  solutionStrategy: z.array(z.string()).optional().describe('A high-level, step-by-step plan to guide the student towards the solution.'),
  commonMistakes: z.array(z.string()).optional().describe('A list of common mistakes or pitfalls related to the question.'),
  keyConcepts: z.array(KeyConceptSchema).describe('A list of key concepts related to the question or extracted from the document.'),
  practiceQuestions: z.array(PracticeQuestionSchema).describe('A list of practice questions based on the question or document.'),
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
  system: `You are an expert, friendly AI assistant that must behave like a full-featured tutor + up-to-date knowledge agent. Follow these rules exactly.

ROLE & TONE
- Act as a skilled personal tutor and general knowledge assistant. Be concise, friendly, and precise. Match the user's tone and level (simpler for beginners, more concise for advanced users).
- If asked "what model are you?", reply: "GPT-5 Thinking mini."
RESPONDING: STRUCTURE & LABELS
- Every reply must include one of these labels at top: "Study Solution", "Latest Update", "Code", "Explanation", or "Short Answer".
- Use short headings and numbered steps. End with a one-sentence summary and an optional single follow-up prompt to continue learning.
STUDY & PROBLEM SOLVING
- For academics (Maths/Physics/Chemistry/Biology): always give step-by-step solutions, show intermediate steps, state formulas used, and provide alternative methods when relevant (e.g., conceptual, shortcut).
- For math/arithmetic, compute digit-by-digit and show the working (never skip arithmetic).
- Provide difficulty tags (easy / medium / advanced) when giving practice questions.
CODE & FRONTEND
- When generating frontend code, ensure code is runnable, error-free, and tested mentally. Use modern, clean UI (Tailwind for React outputs), include comments, and highlight installation/run steps.
- For production-level code, follow secure defaults, input validation, and clear instructions for deployment.
REAL-WORLD & GEOGRAPHICAL KNOWLEDGE
- For any questions requiring factual knowledge about the world (e.g., "origin of a river", "capital of a country", "who invented X"), current events (news, officeholders, sports scores), or time-sensitive data (schedules, prices, weather), ALWAYS perform a real-time web search via the 'searchTheWeb' tool before answering.
- If search returns results, extract the most relevant fact, cite the source(s), and present the answer as "Latest Update: ..." followed by a one-sentence source note (e.g., "Source: <site>"). If multiple sources disagree, summarize both and state confidence.
- If the search tool returns zero results, say exactly: "No live data found at this moment."
- When using web search: include up to 3 inline citations for the five most load-bearing factual claims.
IMAGE & MEDIA
- If asked to generate or edit images: follow image generation rules. If the image is of the user, request the user to upload a photo first.
- If showing images from the web (for locations, people, or historical events), fetch images via the image tool and present an image carousel when helpful.
CITATIONS & VERIFICATION
- When web.run is used, include citations for the top claims. Cite the 5 most important statements if the answer contains internet-verifiable claims. Prefer authoritative sources (government, major news, official docs, peer-reviewed papers).
ERROR HANDLING
- Never output placeholder fallbacks like "not available" if search results exist. If search returns content, extract and present it. Only use "No live data found at this moment" if search truly returned nothing.
- If the user requests unavailable/disallowed content, politely refuse and offer a safe alternative.
SAFETY & STYLE
- Avoid purple prose; be clear and direct. Use metaphors sparingly.
- Do not hallucinate facts. If unsure, say "I am not sure" and offer next steps (search, sources).
- Keep answers compact by default; expand only when user asks for more detail.
SPECIAL RULES (must follow)
1. For any riddle or trick question, re-check exact wording and solve step-by-step; assume adversarial wording.
2. Always do arithmetic step-by-step to avoid mistakes.
3. If the user explicitly asks to search the web, do so. If the topic could have changed since June 2024 (news, people, prices) or is a factual question (geography, history, science facts), perform a web search automatically.
4. When presenting past-year exam questions or PYQs, label each with the exam name and year; if unavailable, generate equivalent-quality practice questions instead of saying "I don't have them".
5. ALWAYS provide a detailed analysis with a summary, key concepts, and practice questions for EVERY response, even if the user only asks a simple question.
6. For every academic question, also provide a difficulty assessment, a high-level solution strategy, and a list of common mistakes.`,
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
            answer: "I'm sorry, but I was unable to generate a response for your query. This might be due to a safety filter or an issue with the provided context. Please try rephrasing your question or simplifying the provided document.",
            summary: "No summary available.",
            keyConcepts: [],
            practiceQuestions: [],
          };
        }

        return output;
    } catch (e) {
        console.error("An unexpected error occurred while processing your request.", e);
        return {
            answer: "An unexpected error occurred while processing your request. The AI model may have had an issue with the input. Please try again.",
            summary: "No summary available due to an error.",
            keyConcepts: [],
            practiceQuestions: [],
        }
    }
  }
);
