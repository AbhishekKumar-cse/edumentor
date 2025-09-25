
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

async function getQuestionsFromChapters({ chapters, difficulty }: {
    chapters: { id: number; count: number }[];
    difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
}): Promise<Question[]> {
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
    
    const questions = await getQuestionsFromChapters({
        chapters: input.chapters.map(c => ({ id: c.id, count: c.questionCount })),
        difficulty: input.difficulty
    });
    
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
);
