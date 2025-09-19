'use client';

import { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { tagQuestionsWithAI, type TagQuestionsWithAIOutput } from '@/ai/flows/tag-questions-with-ai';
import type { Question } from '@/lib/data';
import { useSearchParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Cpu, CheckCircle, XCircle, BookOpen, BrainCircuit, Sigma, MessageCircleQuestion, ArrowLeft, Tag, PlusCircle, Trash2, History, ListChecks, AlertTriangle, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';


const formSchema = z.object({
  questionText: z.string().min(10, {
    message: 'Question text must be at least 10 characters.',
  }),
});

type SearchHistoryItem = {
    id: string;
    questionText: string;
    result: TagQuestionsWithAIOutput | null;
}

const difficultyVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  easy: 'secondary',
  medium: 'default',
  hard: 'destructive',
};

const QuestionCard = ({ question, index }: { question: Question; index: number; }) => {
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
        <div className="p-4 rounded-lg bg-black/10 hover:bg-black/20 transition-colors border border-white/10">
           <p className="font-semibold mb-2">Q{index + 1}: {question.text}</p>
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
    )
}

function TaggingFormComponent() {
  const [history, setHistory] = useState<Record<string, SearchHistoryItem>>({});
  const [activeSearchId, setActiveSearchId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const activeSearch = activeSearchId ? history[activeSearchId] : null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: '',
    },
  });
  
  const handleTopicClick = useCallback(async (topic: string) => {
    form.setValue('questionText', topic);
    await handleFormSubmit({ questionText: topic });
  }, [form]);

  const handleFormSubmit = useCallback(async (values: z.infer<typeof formSchema>, searchIdToUpdate?: string) => {
    setIsLoading(true);
    let currentSearchId = searchIdToUpdate || Date.now().toString();

    if (!searchIdToUpdate) {
        const newHistory = { 
            ...history, 
            [currentSearchId]: {
                id: currentSearchId,
                questionText: values.questionText,
                result: null
            } 
        };
        setHistory(newHistory);
    } else {
        const newHistory = {
            ...history,
            [currentSearchId]: {
                ...history[currentSearchId],
                questionText: values.questionText,
                result: null,
            }
        };
        setHistory(newHistory);
    }
    setActiveSearchId(currentSearchId);

    try {
      const result = await tagQuestionsWithAI(values);
      setHistory(prev => ({ 
        ...prev, 
        [currentSearchId]: { ...prev[currentSearchId], result } 
      }));
    } catch (error) {
      console.error('Failed to tag question', error);
      toast({
        title: 'Error',
        description: 'Failed to tag the question. Please try again.',
        variant: 'destructive',
      });
       setHistory(prev => ({ 
        ...prev, 
        [currentSearchId]: { ...prev[currentSearchId], result: null } 
      }));
    } finally {
      setIsLoading(false);
      if (searchParams.get('q')) {
        router.replace('/tagging', { scroll: false });
      }
    }
  }, [toast, searchParams, router, history]);


  const handleNewSearch = useCallback((initialQuery?: string) => {
    if (initialQuery) {
        const newSearchId = Date.now().toString();
        setHistory(prev => ({
          ...prev,
          [newSearchId]: {
            id: newSearchId,
            questionText: initialQuery,
            result: null
          }
        }));
        setActiveSearchId(newSearchId);
        form.setValue('questionText', initialQuery);
        handleFormSubmit({ questionText: initialQuery }, newSearchId);
    } else {
        setActiveSearchId(null);
        form.reset({ questionText: '' });
    }
  }, [form, handleFormSubmit]);

  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("taggerHistory");
      const query = searchParams.get('q');
      
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
        
        if (query && !Object.values(parsedHistory).some((item: any) => item.questionText === query)) {
          handleNewSearch(query);
        } else {
          const lastActiveId = localStorage.getItem("taggerLastActiveId");
          if (lastActiveId && parsedHistory[lastActiveId]) {
              setActiveSearchId(lastActiveId);
          } else if (Object.keys(parsedHistory).length > 0) {
              setActiveSearchId(Object.keys(parsedHistory)[0]);
          }
        }
      } else if (query) {
        handleNewSearch(query);
      }
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
    }
  }, []); // Only run on initial mount

  // Save history to localStorage
  useEffect(() => {
    if (Object.keys(history).length > 0) {
      localStorage.setItem("taggerHistory", JSON.stringify(history));
    }
    if (activeSearchId) {
      localStorage.setItem("taggerLastActiveId", activeSearchId);
    }
  }, [history, activeSearchId]);

  useEffect(() => {
    if (activeSearch) {
      form.setValue('questionText', activeSearch.questionText);
    } else {
      form.reset({ questionText: '' });
    }
  }, [activeSearch, form]);
  
  const handleClearHistory = () => {
    setHistory({});
    setActiveSearchId(null);
    localStorage.removeItem("taggerHistory");
    localStorage.removeItem("taggerLastActiveId");
    form.reset({ questionText: '' });
    toast({
        title: "History Cleared",
        description: "All your tagging history has been deleted.",
    })
  }

   const handleDeleteItem = (searchId: string) => {
    setHistory(prev => {
        const newHistory = {...prev};
        delete newHistory[searchId];
        return newHistory;
    });

    if (activeSearchId === searchId) {
       const remainingIds = Object.keys(history).filter(id => id !== searchId).sort((a,b) => parseInt(b) - parseInt(a));
       if (remainingIds.length > 0) {
        setActiveSearchId(remainingIds[0]);
       } else {
        setActiveSearchId(null);
        form.reset({ questionText: '' });
       }
    }
  };
  
  const searchHistoryList = Object.values(history).sort((a,b) => parseInt(b.id) - parseInt(a.id));

  const HistoryPanelContent = () => (
    <>
      <header className="p-4 border-b border-white/10 flex items-center justify-between gap-2">
           <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-105 hover:glow-sm md:hidden">
              <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back to Dashboard</span>
              </Link>
          </Button>
          <h2 className="text-xl font-bold font-headline text-center flex-1">History</h2>
          <Button variant="ghost" size="icon" onClick={() => handleNewSearch()} className="h-8 w-8 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-105 hover:glow-sm">
              <PlusCircle className="h-5 w-5" />
          </Button>
      </header>
      <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
              {searchHistoryList.map(item => (
                  <div key={item.id} className="flex items-center group">
                      <Button
                          variant={activeSearchId === item.id ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2 truncate"
                          onClick={() => setActiveSearchId(item.id)}
                      >
                          <Tag className="h-4 w-4" />
                          <span className="truncate">{item.questionText || "New Search"}</span>
                      </Button>
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                               <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-destructive/20 hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                              </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                              <AlertDialogHeader>
                              <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                              <AlertDialogDescription>
                                  This will permanently delete this analysis. This action cannot be undone.
                              </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteItem(item.id)} className="bg-destructive hover:bg-destructive/80">Confirm Delete</AlertDialogAction>
                              </AlertDialogFooter>
                          </AlertDialogContent>
                      </AlertDialog>
                  </div>
              ))}
          </div>
      </ScrollArea>
       <div className="p-4 border-t border-white/10">
           <AlertDialog>
              <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full transition-all duration-300 hover:scale-105 hover:glow-sm-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Clear All History
                  </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                  <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                      This will permanently delete all your tagging history. This action cannot be undone.
                  </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearHistory} className="bg-destructive hover:bg-destructive/80">Confirm Delete All</AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>
      </div>
    </>
  );


  return (
    <div className="flex flex-col md:flex-row h-full">
        {/* History Panel - Desktop */}
        <div className="w-1/4 max-w-xs border-r border-white/10 flex-col hidden md:flex">
            <HistoryPanelContent />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Input Form */}
            <div className="w-full md:w-1/2 lg:w-1/3 border-r border-white/10 p-4 md:p-6 flex flex-col gap-4 md:gap-8">
                <header className="space-y-2">
                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="md:hidden">
                                    <History className="h-5 w-5"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 flex flex-col w-full max-w-sm">
                                <HistoryPanelContent/>
                            </SheetContent>
                        </Sheet>
                        <h1 className="text-2xl md:text-3xl font-headline font-bold">AI Question Tagger</h1>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Automatically classify questions by difficulty, concepts, and more. Paste a question to get started.
                    </p>
                </header>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(values => handleFormSubmit(values))} className="space-y-6 flex flex-col flex-1">
                    <FormField
                        control={form.control}
                        name="questionText"
                        render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col">
                            <FormLabel className="text-lg font-semibold">Question Text</FormLabel>
                            <FormControl className="flex-1">
                            <Textarea placeholder="e.g., 'A block of mass m is placed on a smooth inclined plane of inclination θ...'" {...field} className="bg-secondary/30 text-base flex-1 resize-none min-h-[200px] md:min-h-0" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading || !form.getValues('questionText')} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Tag className="mr-2 h-5 w-5" />}
                        {isLoading ? "Analyzing..." : "Tag with AI"}
                    </Button>
                    </form>
                </Form>
            </div>

            {/* Results Panel */}
            <div className="flex-1">
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                     <div className="p-4 md:p-6">
                        {(isLoading || activeSearch?.result) ? (
                             <Card className="bg-transparent border-0 shadow-none">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                    <Cpu className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    <span className="font-headline text-2xl md:text-3xl">AI Analysis</span>
                                    </CardTitle>
                                    <CardDescription className="text-sm md:text-base">Results from the AI-powered tagging process.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {isLoading ? (
                                    <div className="flex items-center justify-center p-16 flex-col gap-4">
                                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                        <p className="text-muted-foreground">Analyzing question...</p>
                                    </div>
                                    ) : activeSearch?.result && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Card className="bg-secondary/50">
                                                <CardHeader>
                                                    <CardTitle className="text-base md:text-lg font-semibold">Difficulty</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <Badge variant={difficultyVariantMap[activeSearch.result.difficulty]} className={cn('capitalize text-base md:text-lg', {
                                                        'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800': activeSearch.result.difficulty === 'easy',
                                                        'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800': activeSearch.result.difficulty === 'medium',
                                                        'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800': activeSearch.result.difficulty === 'hard',
                                                    })}>
                                                    {activeSearch.result.difficulty}
                                                    </Badge>
                                                </CardContent>
                                            </Card>
                                            <Card className="bg-secondary/50">
                                                 <CardHeader>
                                                    <CardTitle className="text-base md:text-lg font-semibold">Past Paper Details</CardTitle>
                                                </CardHeader>
                                                <CardContent className="flex items-center gap-2 text-sm md:text-base">
                                                    {activeSearch.result.pastPaperDetails.isPastPaper ? (
                                                        <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
                                                    )}
                                                    <span>
                                                        {activeSearch.result.pastPaperDetails.isPastPaper 
                                                            ? `${activeSearch.result.pastPaperDetails.exam || 'Past Paper'}, ${activeSearch.result.pastPaperDetails.year || 'Unknown Year'}`
                                                            : 'Not from a known past paper'}
                                                    </span>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <Card className="bg-secondary/50"><CardHeader><CardTitle className="flex items-center gap-2 text-base md:text-lg font-semibold"><GraduationCap className="h-5 w-5 text-primary"/>Prerequisite Concepts</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{activeSearch.result.prerequisiteConcepts.map((topic, index) => (<Button key={index} variant="outline" size="sm" onClick={() => handleTopicClick(topic)}>{topic}</Button>))}</div></CardContent></Card>
                                        <Card className="bg-secondary/50"><CardHeader><CardTitle className="flex items-center gap-2 text-base md:text-lg font-semibold"><ListChecks className="h-5 w-5 text-primary"/>Solution Steps</CardTitle></CardHeader><CardContent><ul className="space-y-2 list-decimal list-inside text-sm md:text-base">{activeSearch.result.solutionSteps.map((step, index) => (<li key={index}>{step}</li>))}</ul></CardContent></Card>
                                        <Card className="bg-secondary/50"><CardHeader><CardTitle className="flex items-center gap-2 text-base md:text-lg font-semibold"><AlertTriangle className="h-5 w-5 text-primary"/>Common Pitfalls</CardTitle></CardHeader><CardContent><ul className="space-y-2 list-disc list-inside text-sm md:text-base">{activeSearch.result.commonPitfalls.map((pitfall, index) => (<li key={index}>{pitfall}</li>))}</ul></CardContent></Card>
                                        
                                        <div>
                                        <h4 className="font-headline text-lg md:text-xl mb-4 flex items-center gap-2">
                                            <BrainCircuit className="h-6 w-6 text-primary" />
                                            Key Concepts & Study material
                                        </h4>
                                        <Accordion type="single" collapsible className="w-full space-y-3">
                                            {activeSearch.result.concepts.map((concept, index) => (
                                            <AccordionItem value={`concept-${index}`} key={index} className="border rounded-lg px-4 bg-secondary/30">
                                                <AccordionTrigger className="font-semibold text-base hover:no-underline">{concept.name}</AccordionTrigger>
                                                <AccordionContent className="space-y-6 pt-4">
                                                <p className="text-base text-muted-foreground">{concept.explanation}</p>
                                                
                                                {concept.formulas && concept.formulas.length > 0 && (
                                                    <div>
                                                        <h5 className="font-semibold mb-3 flex items-center gap-2 text-base">
                                                            <Sigma className="h-5 w-5" />
                                                            Important Formulas
                                                        </h5>
                                                        <div className="space-y-3">
                                                        {concept.formulas.map((formula, fIndex) => (
                                                            <div key={fIndex} className="p-3 bg-background/50 rounded-md text-sm">
                                                                <p className="font-semibold">{formula.name}</p>
                                                                <code className="block my-1 p-2 rounded bg-muted font-code text-primary">{formula.formula}</code>
                                                            </div>
                                                        ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {concept.relatedQuestions && concept.relatedQuestions.length > 0 && (
                                                    <div>
                                                        <h5 className="font-semibold mb-3 flex items-center gap-2 text-base">
                                                            <MessageCircleQuestion className="h-5 w-5" />
                                                            Related Questions
                                                        </h5>
                                                        <div className="space-y-4">
                                                            {concept.relatedQuestions.map((q, i) => (
                                                                <QuestionCard key={q.id} question={q} index={i}/>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                </AccordionContent>
                                            </AccordionItem>
                                            ))}
                                        </Accordion>
                                        </div>


                                        <div>
                                            <h4 className="font-headline text-lg md:text-xl mb-3 flex items-center gap-2">
                                                <BookOpen className="h-6 w-6 text-primary" />
                                                Suggested Related Topics
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {activeSearch.result.relatedTopics.map((topic, index) => (
                                                <Button 
                                                    key={index}
                                                    variant="secondary"
                                                    className="text-base py-1 px-3 h-auto"
                                                    onClick={() => handleTopicClick(topic)}
                                                >
                                                    {topic}
                                                </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                </CardContent>
                            </Card>
                        ) : (
                             <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center text-muted-foreground min-h-[60vh] md:min-h-[80vh]">
                                <Cpu className="h-12 w-12 md:h-16 md:w-16 mb-4" />
                                <h3 className="font-headline text-xl md:text-2xl font-semibold">AI Analysis Will Appear Here</h3>
                                <p className="mt-2 text-sm md:text-base max-w-md">
                                    Enter a question on the left and click "Tag with AI" to see a detailed breakdown, including prerequisite concepts, solution steps, and common mistakes.
                                </p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </main>
    </div>
  );
}


export default function TaggingInterface() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaggingFormComponent />
    </Suspense>
  )
}
