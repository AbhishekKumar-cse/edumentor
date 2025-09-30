
'use server';

/**
 * @fileOverview Generates a Daily Practice Problem (DPP) sheet or a full mock test based on user selections.
 * 
 * - generateDpp - A function that generates a DPP or mock test.
 * - DppInput - The input type for the generateDpp function.
 * - DppOutput - The return type for the generateDpp function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { subjects, Question, Chapter } from '@/lib/data';


const DppInputSchema = z.object({
  dppType: z.enum(['subjectwise', 'custom', 'full-syllabus']),
  chapters: z.array(z.object({
    id: z.number(),
    questionCount: z.number(),
  })).optional(),
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
  sections: z.array(z.object({
    name: z.string(),
    duration: z.number(),
    questions: z.array(QuestionOutputSchema),
  })).optional(),
});

export type DppOutput = z.infer<typeof DppOutputSchema>;

async function getQuestionsFromBank({ chapters, difficulty, count, subjectsToInclude }: {
    chapters?: { id: number; questionCount: number }[];
    difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
    count?: number;
    subjectsToInclude?: string[];
}): Promise<Question[]> {
    let allQuestions: Question[] = [];
    const chapterMap = new Map<number, Chapter>();

    const relevantSubjects = subjectsToInclude 
        ? subjects.filter(s => subjectsToInclude.includes(s.name))
        : subjects;

    relevantSubjects.forEach(subject => {
        subject.chapters.forEach(chapter => {
            chapterMap.set(chapter.id, chapter);
        });
    });

    if (chapters) {
        for (const chapterInfo of chapters) {
            const chapter = chapterMap.get(chapterInfo.id);
            if (chapter) {
                let potentialQuestions = chapter.questions;
                if (difficulty && difficulty !== 'Mixed') {
                    potentialQuestions = potentialQuestions.filter(q => q.difficulty === difficulty);
                }
                const shuffled = [...potentialQuestions].sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, chapterInfo.questionCount);
                allQuestions.push(...selected);
            }
        }
    } else if (count) {
        let potentialQuestions: Question[] = [];
         relevantSubjects.forEach(subject => {
            subject.chapters.forEach(chapter => {
                if (difficulty && difficulty !== 'Mixed') {
                    potentialQuestions.push(...chapter.questions.filter(q => q.difficulty === difficulty));
                } else {
                    potentialQuestions.push(...chapter.questions);
                }
            });
        });
        const shuffled = [...potentialQuestions].sort(() => 0.5 - Math.random());
        allQuestions = shuffled.slice(0, count);
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
    
    if (input.dppType === 'full-syllabus') {
        const easyQuestions = await getQuestionsFromBank({ count: 30, difficulty: 'Easy' });
        const mediumQuestions = await getQuestionsFromBank({ count: 30, difficulty: 'Medium' });
        const hardQuestions = await getQuestionsFromBank({ count: 30, difficulty: 'Hard' });

        const allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
        const shuffledAll = allQuestions.sort(() => 0.5 - Math.random());
        const shuffledEasy = easyQuestions.sort(() => 0.5 - Math.random());
        const shuffledMedium = mediumQuestions.sort(() => 0.5 - Math.random());
        const shuffledHard = hardQuestions.sort(() => 0.5 - Math.random());
        
        return {
            name: 'Full Syllabus Mock Test',
            questions: shuffledAll, // For results page flat list
            sections: [
                { name: 'Easy', duration: 20 * 60, questions: shuffledEasy },
                { name: 'Medium', duration: 30 * 60, questions: shuffledMedium },
                { name: 'Hard', duration: 35 * 60, questions: shuffledHard },
            ],
        };
    }


    const questions = await getQuestionsFromBank({
        chapters: input.chapters!,
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
