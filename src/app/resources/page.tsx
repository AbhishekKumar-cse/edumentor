
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
import Image from 'next/image';
import { conceptMaps } from '@/lib/data';
import { GitMerge } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Resources</h1>
          <p className="text-muted-foreground">
            Find concept maps to aid your study.
          </p>
        </header>
        <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-3">
                  <GitMerge className="w-6 h-6 text-primary" />
                  <span className="font-headline text-2xl">Concept Maps</span>
              </CardTitle>
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
                              <div key={map.name} className="space-y-2 group">
                                  <h4 className="font-semibold">{map.name}</h4>
                                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
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
      </div>
    </div>
  );
}
