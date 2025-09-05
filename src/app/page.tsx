import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { subjects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Book, FileText, FlaskConical, Atom } from 'lucide-react';

const difficultyVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  Easy: 'secondary',
  Medium: 'default',
  Hard: 'destructive',
};

const subjectIcons: { [key: string]: React.ElementType } = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: Book,
};

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to EduMentor AI. Select a subject to start learning.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {subjects.map((subject) => {
          const Icon = subjectIcons[subject.name] || FileText;
          return (
            <Card key={subject.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="font-headline text-2xl">{subject.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {subject.chapters.map((chapter) => (
                    <AccordionItem value={`chapter-${chapter.id}`} key={chapter.id}>
                      <AccordionTrigger className="font-headline text-lg hover:no-underline">
                        {chapter.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pl-4 border-l-2 border-primary/20">
                          {chapter.questions.map((question, index) => (
                            <div key={question.id} className="p-4 rounded-lg bg-background hover:bg-secondary/50 transition-colors">
                              <p className="font-semibold mb-2">
                                Q{index + 1}: {question.text}
                              </p>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Page: {question.pageReference}</span>
                                <Badge
                                  variant={difficultyVariantMap[question.difficulty]}
                                  className={cn('text-xs', {
                                    'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800': question.difficulty === 'Easy',
                                    'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800': question.difficulty === 'Medium',
                                    'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800': question.difficulty === 'Hard',
                                  })}
                                >
                                  {question.difficulty}
                                </Badge>
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
          );
        })}
      </div>
    </div>
  );
}
