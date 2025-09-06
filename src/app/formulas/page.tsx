
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
import { formulas } from '@/lib/data';
import { Sigma } from 'lucide-react';

export default function FormulasPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">Formula Sheets</h1>
        <p className="text-muted-foreground">
          Quick access to important formulas and their derivations.
        </p>
      </header>
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <Sigma className="w-6 h-6 text-primary" />
                <span className="font-headline text-2xl">Formulas by Subject</span>
            </CardTitle>
          <CardDescription>
            Browse important formulas organized by subject and topic.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="multiple" className="w-full">
            {formulas.map((subjectData) => (
              <AccordionItem value={subjectData.subject} key={subjectData.subject}>
                <AccordionTrigger className="font-headline text-xl">
                  {subjectData.subject}
                </AccordionTrigger>
                <AccordionContent>
                  {subjectData.topics.map((topic) => (
                    <div key={topic.name} className="ml-4 mt-2 space-y-2 border-l-2 pl-4">
                       <h4 className="font-semibold text-lg">{topic.name}</h4>
                       {topic.formulae.map((formula) => (
                         <div key={formula.name} className="p-3 bg-secondary/50 rounded-md">
                           <p className="font-semibold">{formula.name}</p>
                           <code className="block my-2 p-2 rounded bg-muted font-code text-primary text-base">
                             {formula.formula}
                           </code>
                           <p className="text-sm text-muted-foreground">
                             <span className="font-semibold">Derivation:</span> {formula.derivation}
                           </p>
                         </div>
                       ))}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
