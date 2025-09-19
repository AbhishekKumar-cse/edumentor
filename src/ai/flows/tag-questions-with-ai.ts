
'use server';
/**
 * @fileOverview This file implements an AI-powered question tagging flow.
 *
 * It allows educators to automatically classify question difficulty (easy, medium, hard) and tag questions with relevant concepts, including past paper identification.
 *
 * - tagQuestionsWithAI - The main function to tag questions with AI.
 * - TagQuestionsWithAIInput - The input type for the tagQuestionsWithAI function.
 * - TagQuestionsWithAIOutput - The output type for the tagQuestionsWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { subjects, formulas, Question } from '@/lib/data';

const TagQuestionsWithAIInputSchema = z.object({
  questionText: z.string().describe('The text of the question to be tagged.'),
});
export type TagQuestionsWithAIInput = z.infer<typeof TagQuestionsWithAIInputSchema>;

const PastPaperDetailsSchema = z.object({
  isPastPaper: z
    .boolean()
    .describe('Whether the question is from a past paper or not.'),
  year: z.string().optional().describe('The year the question appeared, if known.'),
  exam: z.string().optional().describe('The name of the exam (e.g., JEE Main, NEET), if known.'),
});

const FormulaSchema = z.object({
    name: z.string(),
    formula: z.string(),
    derivation: z.string(),
});

const QuestionSchema = z.object({
    id: z.number(),
    text: z.string(),
    options: z.array(z.string()),
    answer: z.string(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    pageReference: z.number(),
    concepts: z.array(z.string()),
    isPastPaper: z.boolean(),
});

const ConceptSchema = z.object({
    name: z.string(),
    explanation: z.string().describe("A detailed explanation of the concept."),
    formulas: z.array(FormulaSchema).describe("A list of important formulas related to this concept."),
    relatedQuestions: z.array(QuestionSchema).describe("A few example questions related to this concept from the question bank.")
});


const TagQuestionsWithAIOutputSchema = z.object({
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The difficulty level of the question.'),
  concepts: z.array(ConceptSchema).describe('A list of relevant concepts covered in the question, including explanations, formulas, and related questions.'),
  pastPaperDetails: PastPaperDetailsSchema,
  relatedTopics: z.array(z.string()).describe("A list of related topics for further study or to understand the question's context better."),
  prerequisiteConcepts: z.array(z.string()).describe("A list of foundational topics a student should master before attempting this question."),
  solutionSteps: z.array(z.string()).describe("A high-level, step-by-step plan to guide the student in solving the problem without giving away the final answer."),
  commonPitfalls: z.array(z.string()).describe("A list of common mistakes or misunderstandings students might encounter with this type of question."),
});
export type TagQuestionsWithAIOutput = z.infer<typeof TagQuestionsWithAIOutputSchema>;

// Helper Tools
const findRelatedQuestions = ai.defineTool(
  {
    name: 'findRelatedQuestions',
    description: 'Finds up to 3 related questions from the question bank for a given concept.',
    inputSchema: z.object({ conceptName: z.string() }),
    outputSchema: z.array(QuestionSchema),
  },
  async ({ conceptName }) => {
    const related: Question[] = [];
    const lowerCaseConcept = conceptName.toLowerCase();
    for (const subject of subjects) {
        for (const chapter of subject.chapters) {
            for (const question of chapter.questions) {
                if (question.concepts.some(c => c.toLowerCase().includes(lowerCaseConcept))) {
                    related.push(question);
                    if (related.length >= 3) return related;
                }
            }
        }
    }
    return related;
  }
);

const findRelatedFormulas = ai.defineTool(
  {
    name: 'findRelatedFormulas',
    description: 'Finds relevant formulas from the formula bank for a given concept.',
    inputSchema: z.object({ conceptName: z.string() }),
    outputSchema: z.array(FormulaSchema),
  },
  async ({ conceptName }) => {
    const related: z.infer<typeof FormulaSchema>[] = [];
    const lowerCaseConcept = conceptName.toLowerCase();
    for (const subject of formulas) {
        for (const topic of subject.topics) {
             if (topic.name.toLowerCase().includes(lowerCaseConcept)) {
                related.push(...topic.formulae);
             }
             for (const formula of topic.formulae) {
                if (formula.name.toLowerCase().includes(lowerCaseConcept)) {
                    related.push(formula);
                }
             }
        }
    }
    return related.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i);
  }
);

export async function tagQuestionsWithAI(input: TagQuestionsWithAIInput): Promise<TagQuestionsWithAIOutput> {
  return tagQuestionsWithAIFlow(input);
}


const tagQuestionsWithAIPrompt = ai.definePrompt({
  name: 'tagQuestionsWithAIPrompt',
  tools: [findRelatedQuestions, findRelatedFormulas],
  input: {schema: TagQuestionsWithAIInputSchema},
  output: {schema: TagQuestionsWithAIOutputSchema},
  prompt: `You are an expert AI assistant for educators, specializing in analyzing and tagging academic questions for competitive exams like the JEE.

  Analyze the provided question text based on the following criteria:

  1.  **Difficulty**: Classify the question's difficulty level as 'easy', 'medium', or 'hard'.
  2.  **Concepts**: Identify the primary concepts or topics required to answer the question. For each concept identified:
        - Provide a detailed explanation suitable for a student preparing for competitive exams.
        - Use the findRelatedFormulas tool to find relevant formulas.
        - Use the findRelatedQuestions tool to find example questions from the question bank.
  3.  **Past Paper Analysis**: Determine if the question is from a past paper. If it is, specify the year and the exam name (e.g., "JEE Main", "JEE Advanced"). If it is not a past paper question or if the details are unknown, indicate that.
  4.  **Related Topics**: Suggest a few related topics that a student should study to have a comprehensive understanding of the question's subject matter.
  5.  **Prerequisite Concepts**: List the foundational concepts a student must understand before they can solve this question.
  6.  **Solution Steps**: Provide a high-level, step-by-step plan to solve the problem. Do NOT solve the problem or give the final answer. Just outline the approach (e.g., "1. Apply conservation of momentum. 2. Use the work-energy theorem...").
  7.  **Common Pitfalls**: Identify common mistakes or misunderstandings students might have when tackling this type of problem.

  Question: {{{questionText}}}
  `,
});

const tagQuestionsWithAIFlow = ai.defineFlow(
  {
    name: 'tagQuestionsWithAIFlow',
    inputSchema: TagQuestionsWithAIInputSchema,
    outputSchema: TagQuestionsWithAIOutputSchema,
  },
  async input => {
    const {output} = await tagQuestionsWithAIPrompt(input);
    return output!;
  }
);
