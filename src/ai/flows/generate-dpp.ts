
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
import { subjects, Question } from '@/lib/data';


const DppInputSchema = z.object({
  dppType: z.enum(['chapterwise', 'custom']),
  chapters: z.array(z.object({
    id: z.number(),
    questionCount: z.number(),
  })),
  dppName: z.string().optional(),
});
export type DppInput = z.infer<typeof DppInputSchema>;


const DppOutputSchema = z.object({
  name: z.string(),
  questions: z.array(z.object({
    id: z.number(),
    text: z.string(),
    options: z.array(z.string()),
    answer: z.string(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    pageReference: z.number(),
    concepts: z.array(z.string()),
    isPastPaper: z.boolean(),
    explanation: z.string().optional(),
  })),
});

export type DppOutput = z.infer<typeof DppOutputSchema>;

const getQuestionsFromChapters = ai.defineTool(
    {
        name: 'getQuestionsFromChapters',
        description: 'Retrieves a specified number of questions from a list of chapter IDs.',
        inputSchema: z.object({
            chapters: z.array(z.object({
                id: z.number().describe('The ID of the chapter.'),
                count: z.number().describe('The number of questions to fetch from this chapter.'),
            })),
        }),
        outputSchema: z.array(z.any()), // Using z.any() because Question schema is complex for direct tool output
    },
    async ({ chapters }) => {
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
                // Shuffle questions to get a random selection
                const shuffled = [...chapter.questions].sort(() => 0.5 - Math.random());
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

const generateDppFlow = ai.defineFlow(
  {
    name: 'generateDppFlow',
    inputSchema: DppInputSchema,
    outputSchema: DppOutputSchema,
  },
  async (input) => {
    
    const questions = await getQuestionsFromChapters({ chapters: input.chapters });

    return {
        name: input.dppName || 'Your Daily Practice Problems',
        questions,
    };
  }
);
