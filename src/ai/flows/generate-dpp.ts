
'use server';

/**
 * @fileOverview Generates a Daily Practice Problem (DPP) sheet based on user selections.
 * 
 * - generateDpp - A function that generates a DPP.
 * - DppInput - The input type for the generateDpp function.
 * - DppOutput - The return type for the generateDpp function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { subjects, Question, Chapter } from '@/lib/data';


const DppInputSchema = z.object({
  dppType: z.enum(['subjectwise', 'custom']),
  chapters: z.array(z.object({
    id: z.number(),
    questionCount: z.number(),
  })),
  dppName: z.string().optional(),
  examType: z.enum(['jee', 'neet']).optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Mixed']).optional(),
});
export type DppInput = z.infer<typeof DppInputSchema>;


const QuestionOutputSchema = z.object({
    id: z.number(),
    text: z.string(),
    options: z.array(z.string()),
    answer: z.string(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    pageReference: z.number(),
    concepts: z.array(z.string()),
    isPastPaper: z.boolean(),
    explanation: z.string().optional(),
});


const DppOutputSchema = z.object({
  name: z.string(),
  questions: z.array(QuestionOutputSchema),
});

export type DppOutput = z.infer<typeof DppOutputSchema>;

const getQuestionsFromChapters = ai.defineTool(
    {
        name: 'getQuestionsFromChapters',
        description: 'Retrieves a specified number of questions from a list of chapter IDs, with an optional difficulty filter.',
        inputSchema: z.object({
            chapters: z.array(z.object({
                id: z.number().describe('The ID of the chapter.'),
                count: z.number().describe('The number of questions to fetch from this chapter.'),
            })),
            difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Mixed']).optional().describe('The desired difficulty of the questions.'),
        }),
        outputSchema: z.array(QuestionOutputSchema),
    },
    async ({ chapters, difficulty }) => {
        const allQuestions: Question[] = [];
        const chapterMap = new Map<number, Chapter>();
        subjects.forEach(subject => {
            subject.chapters.forEach(chapter => {
                chapterMap.set(chapter.id, chapter);
            });
        });

        for (const chapterInfo of chapters) {
            const chapter = chapterMap.get(chapterInfo.id);
            if (chapter) {
                let potentialQuestions = chapter.questions;
                if (difficulty && difficulty !== 'Mixed') {
                    potentialQuestions = potentialQuestions.filter(q => q.difficulty === difficulty);
                }
                
                // Shuffle questions to get a random selection
                const shuffled = [...potentialQuestions].sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, chapterInfo.count);
                allQuestions.push(...selected);
            }
        }
        return allQuestions;
    }
);


export async function generateDpp(input: DppInput): Promise<DppOutput> {
  return generateDppFlow(input);
}

const generateDppPrompt = ai.definePrompt({
    name: 'generateDppPrompt',
    tools: [getQuestionsFromChapters],
    input: { schema: DppInputSchema },
    output: { schema: DppOutputSchema },
    prompt: `Generate a Daily Practice Problem (DPP) sheet.
    
    DPP Name: {{dppName}}
    Exam Type: {{examType}}
    Difficulty: {{difficulty}}

    Use the getQuestionsFromChapters tool to fetch the questions based on the provided chapter selections.
    The final output should be a well-formed DPP with the specified name and the fetched questions.
    Do not make up questions. Only use the questions returned by the tool.
    `,
});

const generateDppFlow = ai.defineFlow(
  {
    name: 'generateDppFlow',
    inputSchema: DppInputSchema,
    outputSchema: DppOutputSchema,
  },
  async (input) => {
    
    const llmResponse = await generateDppPrompt({
        ...input,
        chapters: input.chapters.map(c => ({id: c.id, questionCount: c.questionCount}))
    });

    const toolRequest = llmResponse.toolRequests.find(
        (req) => req.tool.name === 'getQuestionsFromChapters'
    );

    if (toolRequest) {
        const questions = await toolRequest.tool.fn(toolRequest.input);
        return {
            name: input.dppName || 'Your Daily Practice Problems',
            questions: questions.map(q => ({
                id: q.id,
                text: q.text,
                options: q.options,
                answer: q.answer,
                difficulty: q.difficulty,
                pageReference: q.pageReference,
                concepts: q.concepts,
                isPastPaper: q.isPastPaper,
                explanation: q.explanation
            })),
        };
    }

    // Fallback or error handling if the tool wasn't called
    return {
        name: input.dppName || 'Generated DPP',
        questions: [],
    };
  }
);
