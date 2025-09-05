import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { formulas, conceptMaps } from '@/lib/data';
import { Sigma, GitMerge } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">Resources</h1>
        <p className="text-muted-foreground">
          Find formula sheets and concept maps to aid your study.
        </p>
      </header>
      <Tabs defaultValue="formula-sheets">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="formula-sheets">
            <Sigma className="mr-2 h-4 w-4" />
            Formula Sheets
          </TabsTrigger>
          <TabsTrigger value="concept-maps">
            <GitMerge className="mr-2 h-4 w-4" />
            Concept Maps
          </TabsTrigger>
        </TabsList>
        <TabsContent value="formula-sheets">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Formula Sheets</CardTitle>
              <CardDescription>
                Quick access to important formulas and their derivations.
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
        </TabsContent>
        <TabsContent value="concept-maps">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Concept Maps</CardTitle>
              <CardDescription>
                Visualize connections between different concepts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="multiple" className="w-full">
                {conceptMaps.map((subjectData) => (
                  <AccordionItem value={subjectData.subject} key={subjectData.subject}>
                    <AccordionTrigger className="font-headline text-xl">
                      {subjectData.subject}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                            {subjectData.maps.map((map) => (
                                <div key={map.name} className="space-y-2">
                                    <h4 className="font-semibold">{map.name}</h4>
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                        <Image
                                        src={map.imageUrl}
                                        alt={map.name}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={map['data-ai-hint']}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
