import { config } from 'dotenv';
config();

import '@/ai/flows/generate-personalized-revision-schedule.ts';
import '@/ai/flows/tag-questions-with-ai.ts';
import '@/ai/flows/resolve-student-doubts.ts';
import '@/ai/flows/generate-dpp.ts';
