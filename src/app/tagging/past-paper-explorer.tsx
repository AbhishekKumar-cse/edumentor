
'use client';

import { useState, useMemo } from 'react';
import type { Subject } from '@/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ExplorerProps {
  subjects: Subject[];
}

type Concept = {
  name: string;
  pastPaperCount: number;
};

type ChapterConceptData = {
    chapterName: string;
    concepts: Concept[];
};

export default function PastPaperExplorer({ subjects }: ExplorerProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0].name);

  const hotTopics = useMemo(() => {
    const subject = subjects.find(s => s.name === selectedSubject);
    if (!subject) return [];

    const chapterData: ChapterConceptData[] = subject.chapters.map(chapter => {
        const conceptsMap = new Map<string, { name: string, pastPaperCount: number }>();
        
        chapter.questions.forEach(question => {
          if (question.isPastPaper) {
            question.concepts.forEach(conceptName => {
              const normalizedConcept = conceptName.toLowerCase().trim();
              if (!conceptsMap.has(normalizedConcept)) {
                conceptsMap.set(normalizedConcept, {
                  name: conceptName,
                  pastPaperCount: 0,
                });
              }
              const concept = conceptsMap.get(normalizedConcept)!;
              concept.pastPaperCount++;
            });
          }
        });
        
        const concepts = Array.from(conceptsMap.values())
          .sort((a, b) => b.pastPaperCount - a.pastPaperCount);

        return { chapterName: chapter.name, concepts };
      });

    return chapterData.filter(c => c.concepts.length > 0);

  }, [selectedSubject, subjects]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label htmlFor="subject-select" className="font-semibold">Select Subject:</label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[280px]" id="subject-select">
                <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
                {subjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.name}>
                        {subject.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>

        {hotTopics.length > 0 ? (
            <Card>
                <CardContent className="p-4">
                    <Accordion type="multiple" className="w-full space-y-2">
                        {hotTopics.map(chapter => (
                            <AccordionItem value={chapter.chapterName} key={chapter.chapterName} className="border rounded-lg px-4">
                                <AccordionTrigger className="font-semibold hover:no-underline text-lg">
                                    {chapter.chapterName}
                                </AccordionTrigger>
                                <AccordionContent className="pt-2">
                                    <div className="flex flex-wrap gap-2">
                                        {chapter.concepts.map(concept => (
                                            <Badge
                                                key={concept.name}
                                                variant="secondary"
                                                className="py-1.5 px-3 text-sm"
                                            >
                                                <Flame className="mr-2 h-4 w-4 text-amber-500" />
                                                {concept.name} ({concept.pastPaperCount})
                                            </Badge>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        ) : (
            <div className="text-center text-muted-foreground py-12">
                <p>No past paper data available for this subject.</p>
            </div>
        )}

    </div>
  );
}
