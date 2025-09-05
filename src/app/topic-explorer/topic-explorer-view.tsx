"use client";

import { useState, useMemo } from 'react';
import type { Subject, Chapter, Question } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Flame, Atom, FlaskConical, Book } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface TopicExplorerProps {
  subjects: Subject[];
}

type Concept = {
  name: string;
  questionCount: number;
  pastPaperCount: number;
  questions: Question[];
};

const subjectIcons: { [key: string]: React.ElementType } = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: Book,
};

const QuestionCard = ({ question, index }: { question: Question; index: number }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const getOptionClass = (option: string) => {
    if (!isSubmitted) return '';
    if (option === question.answer) return 'text-green-600 dark:text-green-400 font-bold';
    if (option === selectedOption) return 'text-red-600 dark:text-red-400 line-through';
    return '';
  };

  return (
    <div className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border">
       <div className="flex justify-between items-start mb-2">
            <p className="font-semibold flex-1">
                Q{index + 1}: {question.text}
            </p>
            {question.isPastPaper && (
                <Badge variant="outline" className="ml-4 border-amber-500 text-amber-500 flex-shrink-0">
                    <Flame className="mr-1.5 h-3.5 w-3.5" />
                    Past Paper
                </Badge>
            )}
       </div>
      <RadioGroup
        value={selectedOption || undefined}
        onValueChange={setSelectedOption}
        className="space-y-2 my-4"
        disabled={isSubmitted}
      >
        {question.options.map((option, i) => (
          <div key={i} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${question.id}-option-${i}`} />
            <Label htmlFor={`${question.id}-option-${i}`} className={cn("cursor-pointer", getOptionClass(option))}>
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      {!isSubmitted && (
          <Button onClick={handleSubmit} size="sm" variant="outline" disabled={!selectedOption}>
            Check Answer
          </Button>
      )}

      {isSubmitted && (
        <div className={cn(
            "mt-4 p-3 rounded-md text-sm",
            selectedOption === question.answer ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
        )}>
           {selectedOption === question.answer ? "Correct!" : "Incorrect."} The correct answer is: <strong>{question.answer}</strong>
        </div>
      )}
    </div>
  );
};


type ChapterConceptData = {
    chapterName: string;
    concepts: Concept[];
};

type SubjectConceptData = {
    subjectName: string;
    chapters: ChapterConceptData[];
};

export default function TopicExplorerView({ subjects }: TopicExplorerProps) {
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);

  const structuredConcepts = useMemo(() => {
    const subjectData: SubjectConceptData[] = subjects.map(subject => {
      const chapterData: ChapterConceptData[] = subject.chapters.map(chapter => {
        const conceptsMap = new Map<string, Concept>();
        
        chapter.questions.forEach(question => {
          question.concepts.forEach(conceptName => {
            const normalizedConcept = conceptName.toLowerCase().trim();
            if (!conceptsMap.has(normalizedConcept)) {
              conceptsMap.set(normalizedConcept, {
                name: conceptName,
                questionCount: 0,
                pastPaperCount: 0,
                questions: [],
              });
            }
            const concept = conceptsMap.get(normalizedConcept)!;
            concept.questionCount++;
            if (question.isPastPaper) {
              concept.pastPaperCount++;
            }
            concept.questions.push(question);
          });
        });
        
        const concepts = Array.from(conceptsMap.values())
          .filter(c => c.pastPaperCount > 0)
          .sort((a, b) => b.pastPaperCount - a.pastPaperCount);

        return { chapterName: chapter.name, concepts };
      });

      return { subjectName: subject.name, chapters: chapterData.filter(c => c.concepts.length > 0) };
    });

    return subjectData.filter(s => s.chapters.length > 0);
  }, [subjects]);


  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Explore important topics chapter-by-chapter. Topics are sorted by the number of questions that have appeared in past papers. Click on a topic to view related questions.
        </p>
        <Accordion type="multiple" className="w-full space-y-4">
          {structuredConcepts.map((subject) => {
            const Icon = subjectIcons[subject.subjectName] || Book;
            return (
              <AccordionItem value={subject.subjectName} key={subject.subjectName} className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 font-headline text-xl hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <span>{subject.subjectName}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8 pr-4">
                    <Accordion type="multiple" className="w-full space-y-2">
                      {subject.chapters.map(chapter => (
                        <AccordionItem value={chapter.chapterName} key={chapter.chapterName} className="border-l-2 pl-4">
                           <AccordionTrigger className="font-semibold hover:no-underline">
                                {chapter.chapterName}
                           </AccordionTrigger>
                           <AccordionContent className="pt-2">
                                <div className="flex flex-wrap gap-2">
                                    {chapter.concepts.map(concept => (
                                        <Badge
                                            key={concept.name}
                                            variant={activeConcept?.name === concept.name ? "default" : "secondary"}
                                            className="cursor-pointer py-2 px-3 text-sm"
                                            onClick={() => setActiveConcept(concept)}
                                        >
                                            <Flame className={cn("mr-2 h-4 w-4", activeConcept?.name === concept.name ? "text-amber-300" : "text-amber-500")} />
                                            {concept.name} ({concept.pastPaperCount})
                                        </Badge>
                                    ))}
                                </div>
                           </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      {activeConcept && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center justify-between">
                <span>Questions for: {activeConcept.name}</span>
                <Badge variant="outline">{activeConcept.questionCount} Questions</Badge>
              </CardTitle>
              <CardDescription>
                {activeConcept.pastPaperCount} of these questions are from past papers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeConcept.questions.map((q, i) => (
                  <QuestionCard key={q.id} question={q} index={i} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
