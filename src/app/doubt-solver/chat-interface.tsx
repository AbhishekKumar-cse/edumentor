
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from 'next/link';
import { resolveStudentDoubts, ResolveStudentDoubtsOutput } from "@/ai/flows/resolve-student-doubts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, User, Bot, Loader2, Paperclip, X, FileText, PlusCircle, Trash2, MessageSquare, History, Lightbulb, HelpCircle, BookOpen, Mic, ArrowLeft, GraduationCap, ListChecks, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/icons";

type Message = {
  id: string;
  role: "user" | "assistant" | "system" | "model";
  content: string;
  image?: string;
  pdf?: { name: string };
  analysis?: Omit<ResolveStudentDoubtsOutput, 'answer' | 'explanation'>;
};

type Chat = {
    id: string;
    title: string;
    messages: Message[];
}

const difficultyVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  Easy: 'secondary',
  Medium: 'default',
  Hard: 'destructive',
};


export default function ChatInterface() {
  const [chats, setChats] = useState<Record<string, Chat>>({});
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [pdf, setPdf] = useState<{name: string, data: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const activeChat = activeChatId ? chats[activeChatId] : null;

  // Load chats from localStorage on initial render
  useEffect(() => {
    try {
      const savedChats = localStorage.getItem("doubtSolverChats");
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        setChats(parsedChats);
        const lastActiveId = localStorage.getItem("doubtSolverLastActiveId");
        if (lastActiveId && parsedChats[lastActiveId]) {
            setActiveChatId(lastActiveId);
        } else if (Object.keys(parsedChats).length > 0) {
            setActiveChatId(Object.keys(parsedChats)[0]);
        } else {
            handleNewChat();
        }
      } else {
        handleNewChat();
      }
    } catch (error) {
      console.error("Failed to load chats from localStorage", error);
      handleNewChat();
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(chats).length > 0) {
      localStorage.setItem("doubtSolverChats", JSON.stringify(chats));
    }
    if (activeChatId) {
      localStorage.setItem("doubtSolverLastActiveId", activeChatId);
    }
  }, [chats, activeChatId]);


  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [activeChat?.messages, isLoading]);

  const handleNewChat = useCallback(() => {
    const newChatId = Date.now().toString();
    const newChat: Chat = {
      id: newChatId,
      title: "New Conversation",
      messages: [{
        id: 'system-intro',
        role: 'system',
        content: "I am your AI study assistant. Ask me anything about your subjects, or give me a problem to solve!",
      }],
    };
    setChats(prev => ({ ...prev, [newChatId]: newChat }));
    setActiveChatId(newChatId);
    setInput("");
    setImage(null);
    setPdf(null);
  }, []);

  const handleClearHistory = () => {
    setChats({});
    setActiveChatId(null);
    localStorage.removeItem("doubtSolverChats");
    localStorage.removeItem("doubtSolverLastActiveId");
    handleNewChat();
    toast({
        title: "History Cleared",
        description: "All your chats have been deleted.",
    })
  }

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => {
        const newChats = {...prev};
        delete newChats[chatId];
        return newChats;
    });
    if (activeChatId === chatId) {
        const remainingChatIds = Object.keys(chats).filter(id => id !== chatId);
        if (remainingChatIds.length > 0) {
            setActiveChatId(remainingChatIds[0]);
        } else {
            handleNewChat();
        }
    }
    toast({
        title: "Chat Deleted",
        description: "The selected chat has been removed.",
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImage(loadEvent.target?.result as string);
        setPdf(null);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
          setPdf({ name: file.name, data: loadEvent.target?.result as string});
          setImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChatId || (!input.trim() && !image && !pdf) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      ...(image && { image }),
      ...(pdf && { pdf: { name: pdf.name } }),
    };
    
    const newMessages = [...(activeChat?.messages || []), userMessage];
    
    // Auto-generate title from first message
    const isFirstUserMessage = (activeChat?.messages.filter(m => m.role === 'user').length || 0) === 0;
    const newTitle = isFirstUserMessage && input.trim() ? input.trim().substring(0, 30) : activeChat?.title;

    setChats(prev => ({
        ...prev,
        [activeChatId]: {
            ...prev[activeChatId],
            title: newTitle || prev[activeChatId].title,
            messages: newMessages,
        }
    }));

    setInput("");
    setImage(null);
    setPdf(null);
    setIsLoading(true);

    try {
      const history = newMessages.slice(0, -1).filter(m => m.role !== 'system').map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          content: msg.content,
      }));

      const result = await resolveStudentDoubts({ 
        question: input,
        history,
        imageDataUri: image || undefined,
        pdfDataUri: pdf?.data || undefined,
       });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.answer + (result.explanation ? `\n\n**Explanation:**\n${result.explanation}` : ''),
        analysis: {
            summary: result.summary,
            difficulty: result.difficulty,
            solutionStrategy: result.solutionStrategy,
            commonMistakes: result.commonMistakes,
            keyConcepts: result.keyConcepts,
            practiceQuestions: result.practiceQuestions,
        }
      };
       setChats(prev => ({
        ...prev,
        [activeChatId]: {
            ...prev[activeChatId],
            messages: [...newMessages, assistantMessage],
        }
    }));
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
       setChats(prev => ({
        ...prev,
        [activeChatId]: {
            ...prev[activeChatId],
            messages: [...newMessages, errorMessage],
        }
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const chatHistory = Object.values(chats).sort((a,b) => parseInt(b.id) - parseInt(a.id));

  return (
    <div className="flex h-full w-full rounded-2xl bg-background/80 backdrop-blur-sm border border-white/20 shadow-2xl shadow-black/20 overflow-hidden">
        <div className="w-1/4 max-w-xs border-r border-white/10 flex flex-col">
            <header className="p-4 border-b border-white/10 flex items-center justify-between gap-2">
                <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-105 hover:glow-sm">
                    <Link href="/">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="sr-only">Back to Dashboard</span>
                    </Link>
                </Button>
                <h1 className="text-xl font-bold font-headline text-center flex-1">History</h1>
                <Button variant="ghost" size="icon" onClick={handleNewChat} className="h-8 w-8 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-105 hover:glow-sm">
                    <PlusCircle className="h-5 w-5" />
                </Button>
            </header>
            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {chatHistory.map(chat => (
                        <div key={chat.id} className="flex items-center group">
                            <Button
                                variant={activeChatId === chat.id ? "secondary" : "ghost"}
                                className="w-full justify-start gap-2 truncate transition-all duration-300 hover:scale-105"
                                onClick={() => setActiveChatId(chat.id)}
                            >
                                <MessageSquare className="h-4 w-4" />
                                <span className="truncate">{chat.title}</span>
                            </Button>
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-destructive/20 hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Delete this chat?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete "{chat.title}". This action cannot be undone.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteChat(chat.id)} className="bg-destructive hover:bg-destructive/80">Confirm Delete</AlertDialogAction>
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
                            This will permanently delete all your chat history. This action cannot be undone.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearHistory} className="bg-destructive hover:bg-destructive/80">Confirm Delete All</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-background/50">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6 max-w-4xl mx-auto">
              {activeChat?.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-4 group",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-10 w-10 border-2 border-primary shadow-lg shadow-primary/20">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot size={22}/>
                      </AvatarFallback>
                    </Avatar>
                  )}
                   {message.role === "system" && (
                    <div className="w-full flex justify-center">
                      <div className="italic text-sm text-muted-foreground bg-secondary/50 px-4 py-2 rounded-2xl">
                          {message.content}
                      </div>
                    </div>
                  )}
                  { (message.role === "user" || message.role === "assistant") &&
                    <div
                        className={cn(
                        "max-w-2xl w-fit rounded-2xl p-4 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-primary/10",
                        message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-secondary text-secondary-foreground rounded-bl-none",
                        )}
                    >
                        {message.image && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-md border mb-2">
                                <Image src={message.image} alt="User upload" fill className="object-contain"/>
                            </div>
                        )}
                        {message.pdf && (
                            <div className="flex items-center gap-2 p-2 rounded-md bg-black/10 mb-2">
                                <FileText className="h-5 w-5" />
                                <span className="text-sm font-medium truncate">{message.pdf.name}</span>
                            </div>
                        )}
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>

                        {message.analysis && (
                            <Card className="mt-4 bg-background/30 border-white/20">
                                <CardHeader>
                                    <CardTitle className="text-lg font-headline">Detailed Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     {message.analysis.summary && (
                                        <div>
                                            <h4 className="font-semibold text-base mb-2 flex items-center"><BookOpen className="w-4 h-4 mr-2" />Summary</h4>
                                            <p className="text-sm text-muted-foreground prose prose-sm dark:prose-invert">{message.analysis.summary}</p>
                                        </div>
                                    )}
                                     {message.analysis.difficulty && (
                                        <div>
                                            <h4 className="font-semibold text-base mb-2 flex items-center"><GraduationCap className="w-4 h-4 mr-2" />Difficulty</h4>
                                            <Badge variant={difficultyVariantMap[message.analysis.difficulty]} className="capitalize">{message.analysis.difficulty}</Badge>
                                        </div>
                                    )}
                                     {message.analysis.solutionStrategy && message.analysis.solutionStrategy.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-base mb-2 flex items-center"><ListChecks className="w-4 h-4 mr-2" />Solution Strategy</h4>
                                            <ul className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                                                {message.analysis.solutionStrategy.map((step, index) => (
                                                    <li key={index}>{step}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                     {message.analysis.commonMistakes && message.analysis.commonMistakes.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-base mb-2 flex items-center"><AlertTriangle className="w-4 h-4 mr-2" />Common Mistakes</h4>
                                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                                {message.analysis.commonMistakes.map((mistake, index) => (
                                                    <li key={index}>{mistake}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {message.analysis.keyConcepts && message.analysis.keyConcepts.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-base mb-2 flex items-center"><Lightbulb className="w-4 h-4 mr-2" />Key Concepts</h4>
                                            <Accordion type="single" collapsible className="w-full">
                                                {message.analysis.keyConcepts.map((item, index) => (
                                                    <AccordionItem value={`concept-${index}`} key={index} className="border-b-white/10">
                                                        <AccordionTrigger>{item.concept}</AccordionTrigger>
                                                        <AccordionContent className="text-muted-foreground">
                                                            {item.explanation}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </div>
                                    )}
                                    {message.analysis.practiceQuestions && message.analysis.practiceQuestions.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-base mb-2 flex items-center"><HelpCircle className="w-4 h-4 mr-2" />Practice Questions</h4>
                                            <div className="space-y-2">
                                                {message.analysis.practiceQuestions.map((item, index) => (
                                                    <div key={index} className="p-3 bg-black/10 rounded-md">
                                                        <p className="font-medium">Q: {item.question}</p>
                                                        <p className="text-sm text-green-500 dark:text-green-400 mt-1">A: {item.answer}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                  }
                   {message.role === "user" && (
                    <Avatar className="h-10 w-10 border-2 border-accent shadow-lg shadow-accent/20">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        <User size={22}/>
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-4 justify-start">
                    <Avatar className="h-10 w-10 border-2 border-primary shadow-lg shadow-primary/20">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot size={22}/>
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-md rounded-2xl px-4 py-3 shadow-lg bg-secondary flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                 </div>
              )}
            </div>
          </ScrollArea>
          <div className="border-t border-white/10 p-4 bg-background/50">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSendMessage} className="space-y-4">
                    <div className="flex items-start gap-4">
                    {image && (
                        <div className="relative w-32 h-32 group">
                        <Image src={image} alt="Selected image" layout="fill" className="rounded-lg object-cover border-2 border-primary shadow-lg" />
                        <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setImage(null)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        </div>
                    )}
                    {pdf && (
                        <div className="relative w-48 group bg-secondary p-3 rounded-xl flex items-center gap-2 border border-primary/50 shadow-md">
                        <FileText className="h-6 w-6 text-primary" />
                        <p className="text-sm truncate flex-1">{pdf.name}</p>
                        <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setPdf(null)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        </div>
                    )}
                    </div>
                <div className="flex items-center gap-2 bg-secondary rounded-2xl p-2 border border-transparent focus-within:border-primary focus-within:glow-sm transition-all duration-300">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => imageInputRef.current?.click()}
                        disabled={isLoading || !!pdf}
                        className="hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
                    >
                        <Paperclip className="h-5 w-5" />
                        <span className="sr-only">Upload Image</span>
                    </Button>
                    <Input type="file" ref={imageInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => pdfInputRef.current?.click()}
                        disabled={isLoading || !!image}
                        className="hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
                    >
                        <FileText className="h-5 w-5" />
                        <span className="sr-only">Upload PDF</span>
                    </Button>
                     <Input type="file" ref={pdfInputRef} onChange={handlePdfChange} className="hidden" accept="application/pdf" />

                    <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent border-none focus:ring-0 focus-visible:ring-offset-0 text-base"
                    disabled={isLoading}
                    />
                     <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={isLoading}
                        className="hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
                    >
                        <Mic className="h-5 w-5" />
                        <span className="sr-only">Use Microphone</span>
                    </Button>
                    <Button type="submit" size="icon" disabled={isLoading || (!input.trim() && !image && !pdf)} className="bg-primary rounded-xl w-10 h-10 transition-all duration-300 hover:scale-110 hover:glow-md disabled:bg-muted">
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    <span className="sr-only">Send</span>
                    </Button>
                </div>
                </form>
            </div>
          </div>
        </div>
    </div>
  );
}
