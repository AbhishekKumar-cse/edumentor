
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { theory } from '@/lib/data/theory';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TheoryPage() {
  const [activeSubject, setActiveSubject] = useState(theory[0]);

  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Theory & Derivations</h1>
          <p className="text-muted-foreground">
            Explore detailed concepts, formulas, and derivations for each chapter.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Theory by Subject</span>
            </CardTitle>
            <CardDescription>
              Select a subject to browse through its chapters and concepts.
            </CardDescription>
            <div className='flex gap-2 pt-4'>
                {theory.map(subject => (
                    <Button 
                        key={subject.subject} 
                        variant={activeSubject.subject === subject.subject ? 'default' : 'outline'}
                        onClick={() => setActiveSubject(subject)}
                    >
                        {subject.subject}
                    </Button>
                ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Accordion type="multiple" className="w-full space-y-4">
              {activeSubject.chapters.map((chapter) => (
                <AccordionItem value={chapter.name} key={chapter.name} className="border rounded-lg shadow-sm">
                  <AccordionTrigger className="font-headline text-xl px-6">
                    {chapter.name}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 space-y-6">
                    {chapter.concepts.map((concept) => (
                      <div key={concept.title} className="py-4 border-t">
                         <h4 className="font-semibold text-lg text-primary mb-2">{concept.title}</h4>
                         <p className="text-base text-muted-foreground mb-4">{concept.explanation}</p>
                         
                         {concept.formula && (
                            <div className='my-4'>
                                <h5 className='font-semibold text-sm mb-2'>Formula(s):</h5>
                                <code className="block whitespace-pre-wrap my-2 p-4 rounded bg-muted font-code text-base text-foreground">
                                    {concept.formula}
                                </code>
                            </div>
                         )}

                         {concept.derivation && (
                            <div className='my-4'>
                                 <h5 className='font-semibold text-sm mb-2'>Derivation / Key Points:</h5>
                                <p className="text-sm text-muted-foreground prose dark:prose-invert">
                                    {concept.derivation}
                                </p>
                           </div>
                         )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
