
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Subject, Chapter, Question } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Flame, Atom, FlaskConical, Book, Telescope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TopicExplorerProps {
  subjects: Subject[];
}

type Concept = {
  name: string;
  questionCount: number;
  pastPaperCount: number;
  questions: Question[];
  chapterName: string;
  subjectName: string;
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
    if (!isSubmitted) return 'hover:bg-accent/50';
    if (option === question.answer) return 'bg-green-100 dark:bg-green-900/30 border-green-500';
    if (option === selectedOption) return 'bg-red-100 dark:bg-red-900/30 border-red-500';
    return '';
  };

  return (
    <div className="p-4 rounded-lg bg-secondary/30 transition-colors border">
       <div className="flex justify-between items-start mb-2">
            <p className="font-semibold flex-1 pr-4">
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
            <Label htmlFor={`${question.id}-option-${i}`} className={cn("cursor-pointer flex-1 p-3 rounded-md border transition-all", getOptionClass(option))}>
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
  const [activeAccordionItems, setActiveAccordionItems] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  const allConcepts = useMemo(() => {
    const conceptList: Concept[] = [];
    subjects.forEach(subject => {
        subject.chapters.forEach(chapter => {
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
                            chapterName: chapter.name,
                            subjectName: subject.name,
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
            conceptList.push(...Array.from(conceptsMap.values()));
        });
    });
    return conceptList;
  }, [subjects]);


  useEffect(() => {
    if (searchQuery) {
        const foundConcept = allConcepts.find(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
        if (foundConcept) {
            setActiveConcept(foundConcept);
            setActiveAccordionItems([foundConcept.subjectName, foundConcept.chapterName]);
        }
    }
  }, [searchQuery, allConcepts]);

  const structuredConcepts = useMemo(() => {
    const subjectDataMap = new Map<string, Map<string, Concept[]>>();

    allConcepts.forEach(concept => {
        if (!subjectDataMap.has(concept.subjectName)) {
            subjectDataMap.set(concept.subjectName, new Map<string, Concept[]>());
        }
        const chapterMap = subjectDataMap.get(concept.subjectName)!;

        if (!chapterMap.has(concept.chapterName)) {
            chapterMap.set(concept.chapterName, []);
        }
        chapterMap.get(concept.chapterName)!.push(concept);
    });

    const subjectData: SubjectConceptData[] = Array.from(subjectDataMap.entries()).map(([subjectName, chapterMap]) => ({
        subjectName,
        chapters: Array.from(chapterMap.entries()).map(([chapterName, concepts]) => ({
            chapterName,
            concepts: concepts
              .filter(c => c.pastPaperCount > 0)
              .sort((a, b) => b.pastPaperCount - a.pastPaperCount),
        })).filter(c => c.concepts.length > 0),
    }));

    return subjectData.filter(s => s.chapters.length > 0);

  }, [allConcepts]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        <div className="md:col-span-4 lg:col-span-3">
          <p className="text-muted-foreground mb-4 text-sm">
            Explore important topics chapter-by-chapter. Topics are sorted by the number of questions that have appeared in past papers. Click on a topic to view related questions.
          </p>
          <Accordion type="multiple" className="w-full space-y-2" value={activeAccordionItems} onValueChange={setActiveAccordionItems}>
            {structuredConcepts.map((subject) => {
              const Icon = subjectIcons[subject.subjectName] || Book;
              return (
                <AccordionItem value={subject.subjectName} key={subject.subjectName} className="border rounded-lg bg-secondary/30">
                  <AccordionTrigger className="px-4 py-3 font-headline text-lg hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <span>{subject.subjectName}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-background/50">
                    <div className="pl-6 pr-2 py-2">
                      <Accordion type="multiple" className="w-full space-y-1" value={activeAccordionItems} onValueChange={setActiveAccordionItems}>
                        {subject.chapters.map(chapter => (
                          <AccordionItem value={chapter.chapterName} key={chapter.chapterName} className="border-l-2 pl-4 border-dashed">
                             <AccordionTrigger className="font-semibold hover:no-underline text-base py-2">
                                  {chapter.chapterName}
                             </AccordionTrigger>
                             <AccordionContent className="pt-2 pl-2">
                                  <div className="flex flex-col items-start gap-1">
                                      {chapter.concepts.map(concept => (
                                          <Button
                                              key={concept.name}
                                              variant={activeConcept?.name === concept.name ? "secondary" : "ghost"}
                                              className={cn("w-full justify-start text-left h-auto py-1.5 px-2", { "bg-primary/20 text-primary": activeConcept?.name === concept.name })}
                                              onClick={() => setActiveConcept(concept)}
                                          >
                                              <Flame className="mr-2 h-4 w-4 flex-shrink-0 text-amber-500" />
                                              <span className="flex-1">{concept.name}</span>
                                              <Badge variant="outline" className="ml-2">{concept.pastPaperCount}</Badge>
                                          </Button>
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
        <div className="md:col-span-6 lg:col-span-7">
            {activeConcept ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl flex items-center justify-between">
                            <span>{activeConcept.name}</span>
                            <Badge variant="secondary">{activeConcept.questionCount} Questions</Badge>
                        </CardTitle>
                        <CardDescription>
                            Found in chapter "{activeConcept.chapterName}" of {activeConcept.subjectName}.
                            <br/>
                            {activeConcept.pastPaperCount} of these questions are from past papers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[70vh] pr-4">
                        <div className="space-y-4">
                            {activeConcept.questions.map((q, i) => (
                            <QuestionCard key={q.id} question={q} index={i} />
                            ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                </Card>
            ) : (
              <div className="flex flex-col items-center justify-center h-full rounded-lg border-2 border-dashed p-8 text-center bg-secondary/20">
                  <Telescope className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="font-headline text-2xl font-semibold">Select a Topic to Begin</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                      Choose a subject and chapter from the list on the left to discover its hot topics and practice relevant questions.
                  </p>
              </div>
            )}
        </div>
    </div>
  );
}

