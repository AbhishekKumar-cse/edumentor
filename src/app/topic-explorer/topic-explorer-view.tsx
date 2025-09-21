
'use client';

import { useState, useMemo } from 'react';
import type { Subject, Question } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Flame, Atom, FlaskConical, Calculator, BookOpen, BarChart3, ChevronRight, Filter, SortAsc, FileQuestion, X, Telescope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Pie, PieChart, Cell } from "recharts"

type Concept = {
  name: string;
  questionCount: number;
  pastPaperCount: number;
  difficulty: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
  questions: Question[];
  chapterName: string;
  subjectName: string;
};

const subjectIcons: { [key: string]: React.ElementType } = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: Calculator,
};

const difficultyColors = {
  Easy: "hsl(var(--chart-2))",
  Medium: "hsl(var(--chart-3))",
  Hard: "hsl(var(--chart-5))",
}

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
    <div className="p-4 rounded-lg bg-secondary/50 transition-colors border">
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


export default function TopicExplorerView({ subjects }: { subjects: Subject[] }) {
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('pastPaperCount');

  const allConcepts: Concept[] = useMemo(() => {
    const conceptsMap = new Map<string, Concept>();
    subjects.forEach(subject => {
        subject.chapters.forEach(chapter => {
            chapter.questions.forEach(question => {
                question.concepts.forEach(conceptName => {
                    const normalizedConcept = conceptName.toLowerCase().trim();
                    if (!conceptsMap.has(normalizedConcept)) {
                        conceptsMap.set(normalizedConcept, {
                            name: conceptName,
                            questionCount: 0,
                            pastPaperCount: 0,
                            difficulty: { Easy: 0, Medium: 0, Hard: 0 },
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
                    concept.difficulty[question.difficulty]++;
                    concept.questions.push(question);
                });
            });
        });
    });
    return Array.from(conceptsMap.values());
  }, [subjects]);

  const filteredAndSortedConcepts = useMemo(() => {
    let concepts = allConcepts;
    if (filterSubject !== 'all') {
        concepts = concepts.filter(c => c.subjectName === filterSubject);
    }
    return concepts.sort((a, b) => {
        if (sortOrder === 'questionCount') return b.questionCount - a.questionCount;
        if (sortOrder === 'name') return a.name.localeCompare(b.name);
        // default to pastPaperCount
        return b.pastPaperCount - a.pastPaperCount;
    });
  }, [allConcepts, filterSubject, sortOrder]);


  const chartConfig = {
      questions: { label: "Questions" },
      Easy: { label: "Easy", color: difficultyColors.Easy },
      Medium: { label: "Medium", color: difficultyColors.Medium },
      Hard: { label: "Hard", color: difficultyColors.Hard },
  }

  return (
    <Card>
        <CardHeader>
             <CardTitle className="flex items-center gap-3">
              <Telescope className="w-6 h-6 text-primary" />
              <span className="font-headline text-2xl">Hot Topics Analysis</span>
            </CardTitle>
            <CardDescription>
              Discover which concepts appear most frequently, analyze their difficulty, and practice relevant questions.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-secondary/50 rounded-lg border">
                <div className="flex items-center gap-2 flex-1">
                    <Filter className="w-5 h-5" />
                    <Label htmlFor="subject-filter" className="font-semibold">Filter by Subject:</Label>
                    <Select value={filterSubject} onValueChange={setFilterSubject}>
                        <SelectTrigger id="subject-filter" className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Subjects</SelectItem>
                            {subjects.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex items-center gap-2 flex-1">
                    <SortAsc className="w-5 h-5" />
                    <Label htmlFor="sort-order" className="font-semibold">Sort by:</Label>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger id="sort-order" className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Sort order" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pastPaperCount">Most Past Paper Questions</SelectItem>
                            <SelectItem value="questionCount">Most Questions</SelectItem>
                            <SelectItem value="name">Alphabetical</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Drawer>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedConcepts.map(concept => {
                        const chartData = [
                            { name: 'Easy', value: concept.difficulty.Easy, fill: difficultyColors.Easy },
                            { name: 'Medium', value: concept.difficulty.Medium, fill: difficultyColors.Medium },
                            { name: 'Hard', value: concept.difficulty.Hard, fill: difficultyColors.Hard },
                        ].filter(d => d.value > 0);

                        return (
                            <DrawerTrigger asChild key={concept.name}>
                                <Card className="flex flex-col bg-secondary/30 hover:bg-secondary/50 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setActiveConcept(concept)}>
                                    <CardHeader className="pb-4">
                                        <CardTitle className="font-headline text-xl">{concept.name}</CardTitle>
                                        <CardDescription>{concept.subjectName} - {concept.chapterName}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 grid grid-cols-2 gap-4 items-center">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <FileQuestion className="w-5 h-5 text-primary" />
                                                <div>
                                                    <p className="font-bold text-lg">{concept.questionCount}</p>
                                                    <p className="text-xs text-muted-foreground">Total Questions</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Flame className="w-5 h-5 text-amber-500" />
                                                 <div>
                                                    <p className="font-bold text-lg">{concept.pastPaperCount}</p>
                                                    <p className="text-xs text-muted-foreground">Past Papers</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            {chartData.length > 0 ? (
                                                <ChartContainer config={chartConfig} className="w-full h-[80px]">
                                                    <PieChart>
                                                         <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                                        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={20} outerRadius={35} strokeWidth={2}>
                                                             {chartData.map((entry) => (
                                                                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                                            ))}
                                                        </Pie>
                                                    </PieChart>
                                                </ChartContainer>
                                            ) : <p className="text-xs text-muted-foreground">No data</p>}
                                        </div>
                                    </CardContent>
                                    <div className="p-4 pt-0">
                                        <Button className="w-full">
                                            View Questions <ChevronRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </Card>
                            </DrawerTrigger>
                        )
                    })}
                </div>

                {activeConcept && (
                    <DrawerContent className="h-[90vh]">
                        <div className="p-4 h-full flex flex-col">
                            <DrawerHeader className="text-left">
                                <DrawerTitle className="font-headline text-3xl">{activeConcept.name}</DrawerTitle>
                                <DrawerDescription>
                                    {activeConcept.questionCount} questions found for this topic.
                                </DrawerDescription>
                                <DrawerClose asChild className="absolute top-4 right-4">
                                  <Button variant="ghost" size="icon"><X className="h-5 w-5"/></Button>
                                </DrawerClose>
                            </DrawerHeader>
                            <ScrollArea className="flex-1 mt-4">
                                <div className="space-y-4 px-4 pb-4">
                                    {activeConcept.questions
                                        .sort((a, b) => (a.isPastPaper === b.isPastPaper ? 0 : a.isPastPaper ? -1 : 1))
                                        .map((q, i) => <QuestionCard key={q.id} question={q} index={i} />)}
                                </div>
                            </ScrollArea>
                        </div>
                    </DrawerContent>
                )}
            </Drawer>
        </CardContent>
    </Card>
  )
}
