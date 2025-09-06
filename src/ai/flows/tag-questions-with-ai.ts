
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
  relatedTopics: z.array(z.string()).describe("A list of related topics for further study or to understand the question's context better.")
});
export type TagQuestionsWithAIOutput = z.infer<typeof TagQuestionsWithAIOutputSchema>;

// Helper function to find related questions
const findRelatedQuestions = (conceptName: string): Question[] => {
    const related: Question[] = [];
    const lowerCaseConcept = conceptName.toLowerCase();
    for (const subject of subjects) {
        for (const chapter of subject.chapters) {
            for (const question of chapter.questions) {
                if (question.concepts.some(c => c.toLowerCase().includes(lowerCaseConcept))) {
                    related.push(question);
                    if (related.length >= 3) return related; // Limit to 3 example questions
                }
            }
        }
    }
    return related;
};

// Helper function to find related formulas
const findRelatedFormulas = (conceptName: string) => {
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
    // Remove duplicates
    return related.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i);
}


export async function tagQuestionsWithAI(input: TagQuestionsWithAIInput): Promise<TagQuestionsWithAIOutput> {
  const result = await tagQuestionsWithAIFlow(input);

  // Post-process to add related questions and formulas
  if (result.concepts) {
    result.concepts = result.concepts.map(concept => {
        return {
            ...concept,
            relatedQuestions: findRelatedQuestions(concept.name),
            formulas: findRelatedFormulas(concept.name)
        }
    });
  }

  return result;
}


const tagQuestionsWithAIPrompt = ai.definePrompt({
  name: 'tagQuestionsWithAIPrompt',
  input: {schema: TagQuestionsWithAIInputSchema},
  output: {schema: TagQuestionsWithAIOutputSchema},
  prompt: `You are an expert AI assistant for educators, specializing in analyzing and tagging academic questions for competitive exams like the JEE.

  Analyze the provided question text based on the following criteria:

  1.  **Difficulty**: Classify the question's difficulty level as 'easy', 'medium', or 'hard'.
  2.  **Concepts**: Identify the primary concepts or topics required to answer the question. For each concept, provide a detailed explanation suitable for a student preparing for competitive exams. You do not need to populate the formulas or relatedQuestions fields, they will be handled by the system.
  3.  **Past Paper Analysis**: Determine if the question is from a past paper. If it is, specify the year and the exam name (e.g., "JEE Main", "JEE Advanced"). If it is not a past paper question or if the details are unknown, indicate that.
  4.  **Related Topics**: Suggest a few related topics that a student should study to have a comprehensive understanding of the question's subject matter.

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
